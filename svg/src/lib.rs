use std::path::Path;
use std::{fmt, io};

use plotive::geom::{self, Transform};
use plotive::render::{self, Surface};
use plotive::{Prepare, Rgba8, Style, des, drawing};
use svg::Node;
use svg::node::element;

#[derive(Debug)]
pub enum Error {
    Io(io::Error),
    Drawing(drawing::Error),
}

impl From<io::Error> for Error {
    fn from(err: io::Error) -> Self {
        Error::Io(err)
    }
}

impl From<drawing::Error> for Error {
    fn from(err: drawing::Error) -> Self {
        Error::Drawing(err)
    }
}

impl fmt::Display for Error {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Error::Io(err) => write!(f, "IO error: {}", err),
            Error::Drawing(err) => write!(f, "Drawing error: {}", err),
        }
    }
}

impl std::error::Error for Error {}

/// Parameters needed for saving a figure as SVG
#[derive(Debug, Clone)]
pub struct Params<'a> {
    pub style: Style,
    pub scale: f32,
    /// Optional font database to use for text rendering
    /// This parameter is ignored when saving a prepared figure,
    /// as the fonts have already been resolved.
    /// In such case, this parameter can be left to `None` (which is the default).
    pub fontdb: Option<&'a plotive::fontdb::Database>,
    /// Optional prefix for generated IDs (e.g., for clip paths, gradients).
    /// Use this when embedding multiple SVGs in the same document to avoid ID conflicts.
    pub id_prefix: Option<String>,
}

impl Default for Params<'_> {
    fn default() -> Self {
        Self {
            style: Style::default(),
            scale: 1.0,
            fontdb: None,
            id_prefix: None,
        }
    }
}

/// Trait for saving a figure as SVG file
pub trait SaveSvg {
    /// Save the figure as a SVG file at the given path.
    ///
    /// The data source parameter is ignored when saving a prepared figure,
    /// as the data has already been resolved.
    /// Therefore, this parameter can be left to `&()` when saving a prepared figure.
    ///
    /// # Example
    ///
    /// ```rust
    /// use plotive::des;
    /// use plotive::Prepare;
    /// use plotive_svg::{SaveSvg, Params};
    ///
    /// // Create your figure design (this one has inline data for simplicity)
    /// let fig = des::series::Line::new(
    ///     des::data_inline(vec![0.0, 1.0, 2.0]),
    ///     des::data_inline(vec![0.0, 1.0, 0.0]),
    /// ).into_plot()
    /// .into_figure();
    ///
    /// // data source is not needed for inline data
    /// fig.save_svg("figure.svg", &(), Default::default()).unwrap();
    /// # std::fs::remove_file("figure.svg").unwrap();
    /// ```
    fn save_svg<P, D>(&self, path: P, data_src: &D, params: Params) -> Result<(), Error>
    where
        P: AsRef<Path>,
        D: plotive::data::Source + ?Sized;
}

impl SaveSvg for des::Figure {
    fn save_svg<P, D>(&self, path: P, data_src: &D, params: Params) -> Result<(), Error>
    where
        P: AsRef<Path>,
        D: plotive::data::Source + ?Sized,
    {
        let prepared = self.prepare(data_src, params.fontdb)?;
        prepared.save_svg(path, data_src, params)
    }
}

impl SaveSvg for drawing::PreparedFigure {
    fn save_svg<P, D>(&self, path: P, _data_src: &D, params: Params) -> Result<(), Error>
    where
        P: AsRef<Path>,
        D: plotive::data::Source + ?Sized,
    {
        let size = self.size();
        let witdth = (size.width() * params.scale) as u32;
        let height = (size.height() * params.scale) as u32;

        let mut surface = SvgSurface::new(witdth, height);
        if let Some(id_prefix) = params.id_prefix.as_ref() {
            surface = surface.with_id_prefix(id_prefix);
        }

        self.draw(&mut surface, &params.style);
        surface.save_svg(path)?;
        Ok(())
    }
}

pub struct SvgSurface {
    doc: svg::Document,
    defs: Option<element::Definitions>,
    doc_children: Vec<Box<dyn Node>>,
    id_num: u32,
    id_prefix: Option<String>,
    group_stack: Vec<element::Group>,
}

impl SvgSurface {
    pub fn new(width: u32, height: u32) -> Self {
        let doc = svg::Document::new()
            .set("width", width)
            .set("height", height);
        SvgSurface {
            doc,
            defs: None,
            doc_children: Vec::new(),
            id_prefix: None,
            id_num: 0,
            group_stack: vec![],
        }
    }

    /// Set a prefix for generated IDs (e.g., for clip paths).
    /// Use this when embedding multiple SVGs in the same document to avoid ID conflicts.
    pub fn with_id_prefix<S: Into<String>>(mut self, prefix: S) -> Self {
        self.id_prefix = Some(prefix.into());
        self
    }

    pub fn save_svg<P: AsRef<std::path::Path>>(&self, path: P) -> io::Result<()> {
        if !self.group_stack.is_empty() {
            panic!("Unbalanced clip stack");
        }
        svg::save(path, &self.doc)
    }

    pub fn write<W>(&self, dest: &mut W) -> io::Result<()>
    where
        W: io::Write,
    {
        if !self.group_stack.is_empty() {
            panic!("Unbalanced clip stack");
        }
        svg::write(dest, &self.doc)
    }
}

impl Surface for SvgSurface {
    fn caps(&self) -> render::SurfaceCaps {
        render::SurfaceCaps {
            max_gradient_stops: usize::MAX,
        }
    }

    /// Prepare the surface for drawing, with the given width and height in plot units
    fn prepare(&mut self, size: geom::Size, fill: Option<render::Paint>) {
        self.doc
            .assign("viewBox", (0, 0, size.width(), size.height()));
        if let Some(fill) = fill {
            let mut node = element::Rectangle::new()
                .set("width", "100%")
                .set("height", "100%");
            match fill {
                render::Paint::Solid(color) => node.assign("fill", color.html()),
                render::Paint::LinearGradient {
                    start_pos,
                    end_pos,
                    stops,
                } => {
                    let grad_id = self.add_linear_gradient(start_pos, end_pos, stops);
                    node.assign("fill", format!("url(#{})", grad_id));
                }
            }
            self.append_node(node);
        }
    }

    /// Draw a rectangle
    fn draw_rect(&mut self, rect: &render::Rect) {
        let mut node = rectangle_node(&rect.rect);
        self.assign_fill(&mut node, rect.fill.as_ref());
        self.assign_stroke(&mut node, rect.stroke.as_ref());
        self.assign_transform(&mut node, rect.transform);
        self.append_node(node);
    }

    fn draw_path(&mut self, path: &render::Path) {
        let mut node = element::Path::new();
        self.assign_fill(&mut node, path.fill.as_ref());
        self.assign_stroke(&mut node, path.stroke.as_ref());
        self.assign_transform(&mut node, path.transform);
        node.assign("d", path_data(path.path));
        self.append_node(node);
    }

    fn push_clip(&mut self, clip: &render::Clip) {
        let clip_id = self.bump_id();
        let clip_id_url = format!("url(#{})", clip_id);
        let mut rect_node = rectangle_node(&clip.rect);
        self.assign_transform(&mut rect_node, clip.transform);
        let node = element::ClipPath::new()
            .set("id", clip_id.clone())
            .add(rect_node);
        let defs = self.defs.get_or_insert_with(element::Definitions::new);
        defs.append(node);
        self.group_stack
            .push(element::Group::new().set("clip-path", clip_id_url));
    }

    fn pop_clip(&mut self) {
        let g = self.group_stack.pop();
        if g.is_none() {
            panic!("Unbalanced clip stack");
        }
        self.append_node(g.unwrap());
    }

    fn finalize(&mut self) {
        if !self.group_stack.is_empty() {
            panic!("Unbalanced clip stack");
        }

        if let Some(defs) = self.defs.take() {
            self.doc.append(defs);
        }
        for child in self.doc_children.drain(..) {
            self.doc.append(child);
        }
    }
}

impl SvgSurface {
    fn append_node<T>(&mut self, node: T)
    where
        T: Node,
    {
        if self.group_stack.is_empty() {
            self.doc_children.push(Box::new(node));
        } else {
            self.group_stack.last_mut().unwrap().append(node);
        }
    }

    fn bump_id(&mut self) -> String {
        self.id_num += 1;
        let prefix = self.id_prefix.as_deref().unwrap_or("plotive");
        format!("{}{}", prefix, self.id_num)
    }

    fn add_linear_gradient(
        &mut self,
        start_pos: geom::Point,
        end_pos: geom::Point,
        stops: &[(f32, Rgba8)],
    ) -> String {
        let id = self.bump_id();
        let mut grad = element::LinearGradient::new()
            .set("id", id.clone())
            .set("gradientUnits", "userSpaceOnUse")
            .set("x1", start_pos.x)
            .set("y1", start_pos.y)
            .set("x2", end_pos.x)
            .set("y2", end_pos.y);
        for (offset, color) in stops {
            grad.append(
                element::Stop::new()
                    .set("offset", format!("{}%", offset * 100.0))
                    .set("stop-color", color.html()),
            );
        }
        let defs = self.defs.get_or_insert_with(element::Definitions::new);
        defs.append(grad);
        id
    }

    fn assign_transform<N>(&self, node: &mut N, transform: Option<&geom::Transform>)
    where
        N: Node,
    {
        if let Some(Transform {
            sx,
            kx,
            ky,
            sy,
            tx,
            ty,
        }) = transform
        {
            node.assign(
                "transform",
                format!("matrix({sx} {ky} {kx} {sy} {tx} {ty})"),
            );
        }
    }

    fn assign_fill<N>(&mut self, node: &mut N, fill: Option<&render::Paint>)
    where
        N: Node,
    {
        match fill {
            Some(render::Paint::Solid(color)) => {
                let (rgb, opacity) = color.split_rgb_opacity();
                node.assign("fill", rgb.html());
                if let Some(opacity) = opacity {
                    node.assign("fill-opacity", opacity);
                }
            }
            Some(render::Paint::LinearGradient {
                start_pos,
                end_pos,
                stops,
            }) => {
                let grad_id = self.add_linear_gradient(*start_pos, *end_pos, stops);
                node.assign("fill", format!("url(#{})", grad_id));
            }
            None => {
                node.assign("fill", "none");
            }
        }
    }
    fn assign_stroke<N>(&self, node: &mut N, stroke: Option<&render::Stroke>)
    where
        N: Node,
    {
        if let Some(stroke) = stroke {
            let (rgb, opacity) = stroke.color.split_rgb_opacity();
            node.assign("stroke", rgb.html());
            if let Some(opacity) = opacity {
                node.assign("stroke-opacity", opacity);
            }
            let w = stroke.width;
            node.assign("stroke-width", w);
            match stroke.pattern {
                render::LinePattern::Solid => (),
                render::LinePattern::Dash(dash) => {
                    let array: Vec<f32> = dash.iter().map(|d| d * w).collect();
                    node.assign("stroke-dasharray", array)
                }
            }
            match stroke.join {
                render::LineJoin::Miter => node.assign("stroke-linejoin", "miter"),
                render::LineJoin::Round => node.assign("stroke-linejoin", "round"),
                render::LineJoin::Bevel => node.assign("stroke-linejoin", "bevel"),
            }
            match stroke.cap {
                render::LineCap::Butt => node.assign("stroke-linecap", "butt"),
                render::LineCap::Round => node.assign("stroke-linecap", "round"),
                render::LineCap::Square => node.assign("stroke-linecap", "square"),
            }
        } else {
            node.assign("stroke", "none");
        }
    }
}

fn path_data(path: &geom::Path) -> element::path::Data {
    let mut data = element::path::Data::new();
    for segment in path.segments() {
        match segment {
            geom::PathSegment::MoveTo(p) => {
                data = data.move_to((p.x, p.y));
            }
            geom::PathSegment::LineTo(p) => {
                data = data.line_to((p.x, p.y));
            }
            geom::PathSegment::QuadTo(p1, p2) => {
                data = data.quadratic_curve_to((p1.x, p1.y, p2.x, p2.y));
            }
            geom::PathSegment::CubicTo(p1, p2, p3) => {
                data = data.cubic_curve_to((p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
            }
            geom::PathSegment::Close => {
                data = data.close();
            }
        }
    }
    data
}

fn rectangle_node(rect: &geom::Rect) -> element::Rectangle {
    element::Rectangle::new()
        .set("x", rect.x())
        .set("y", rect.y())
        .set("width", rect.width())
        .set("height", rect.height())
}
