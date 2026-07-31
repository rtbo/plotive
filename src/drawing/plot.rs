use std::cell::RefCell;
use std::collections::HashMap;
use std::f32;
use std::rc::Rc;
use std::sync::Arc;

use crate::des::{PlotIdx, annot};
use crate::drawing::annot::Annot;
use crate::drawing::axis::{
    AsBoundRef, Axis, AxisCacheKey, AxisCacheMap, AxisScale, Bounds, Orientation, Side,
};
use crate::drawing::cmap::ColorMap;
use crate::drawing::colorbar::{self, ColorBar, ColorBarBuilder};
use crate::drawing::legend::{self, Legend, LegendBuilder};
use crate::drawing::scale::CoordMapXy;
use crate::drawing::series::{self, Series, SeriesExt};
use crate::drawing::{ColumnExt, Ctx, Error, get_column};
use crate::style::{AsPaint, AsStroke, defaults, theme};
use crate::{Style, data, des, geom, missing_params, render};

#[derive(Debug, Clone)]
pub(super) struct Plots {
    size: (u32, u32),
    plots: Vec<Option<Plot>>,
}

impl Plots {
    pub(super) fn rows(&self) -> u32 {
        self.size.0
    }
    pub(super) fn cols(&self) -> u32 {
        self.size.1
    }

    pub(super) fn len(&self) -> usize {
        self.plots.len()
    }

    pub(super) fn iter_indices(&self) -> impl Iterator<Item = PlotIdx> + '_ {
        des::PlotIdxIter::new(self.rows(), self.cols())
    }

    pub(super) fn plots(&self) -> &[Option<Plot>] {
        &self.plots
    }
    pub(super) fn plot(&self, idx: PlotIdx) -> Option<&Plot> {
        self.plots
            .get(idx.index(self.cols()))
            .and_then(|p| p.as_ref())
    }
    pub(super) fn plot_mut(&mut self, idx: PlotIdx) -> Option<&mut Plot> {
        let cols = self.cols();
        self.plots.get_mut(idx.index(cols)).and_then(|p| p.as_mut())
    }
}

#[derive(Clone)]
pub(super) struct Plot {
    idx: PlotIdx,
    rect: geom::Rect,
    // None when there is no series (empty plot)
    axes: Option<Axes>,

    fill: Option<theme::Fill>,
    border: Option<des::plot::Border>,
    series: Vec<Series>,
    legend: Option<(geom::Point, Legend)>,
    colorbars: Vec<(Arc<dyn ColorMap>, Option<ColorBar>)>,
    annots: Vec<Annot>,
}

impl std::fmt::Debug for Plot {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Plot")
            .field("idx", &self.idx)
            .field("rect", &self.rect)
            .field("axes", &self.axes)
            .field("fill", &self.fill)
            .field("border", &self.border)
            .field("series", &self.series)
            .field("legend", &self.legend)
            .field(
                "colorbars",
                &self.colorbars.iter().map(|(_, cb)| cb).collect::<Vec<_>>(),
            )
            .field("annots", &self.annots)
            .finish()
    }
}

impl Plot {
    pub(super) fn idx(&self) -> PlotIdx {
        self.idx
    }

    pub(super) fn rect(&self) -> &geom::Rect {
        &self.rect
    }

    pub(super) fn axes(&self) -> Option<&Axes> {
        self.axes.as_ref()
    }

    pub(super) fn axes_mut(&mut self) -> Option<&mut Axes> {
        self.axes.as_mut()
    }
}

#[derive(Debug, Clone)]
pub(super) struct Axes {
    x: Vec<Axis>,
    y: Vec<Axis>,
}

impl Axes {
    pub(super) fn x_mut(&mut self) -> &mut [Axis] {
        &mut self.x
    }
    pub(super) fn y_mut(&mut self) -> &mut [Axis] {
        &mut self.y
    }

    pub(super) fn orientation_find_idx(
        &self,
        or: Orientation,
        ax_ref: &des::axis::Ref,
    ) -> Result<Option<usize>, Error> {
        let axes = match or {
            Orientation::X => &self.x,
            Orientation::Y => &self.y,
        };

        for (ax_idx, a) in axes.iter().enumerate() {
            match ax_ref {
                des::axis::Ref::Idx(idx) => {
                    if ax_idx == *idx {
                        return Ok(Some(ax_idx));
                    }
                }
                des::axis::Ref::Id(id) => {
                    if a.id() == Some(id.as_str()) || a.title_text() == Some(id.as_str()) {
                        return Ok(Some(ax_idx));
                    }
                }
            }
        }
        Ok(None)
    }

    pub(super) fn orientation_find(
        &self,
        or: Orientation,
        ax_ref: &des::axis::Ref,
    ) -> Result<Option<&Axis>, Error> {
        let axes = match or {
            Orientation::X => &self.x,
            Orientation::Y => &self.y,
        };

        let ax = self.orientation_find_idx(or, ax_ref)?.map(|idx| &axes[idx]);
        Ok(ax)
    }

    pub(super) fn x(&self) -> &[Axis] {
        &self.x
    }

    pub(super) fn y(&self) -> &[Axis] {
        &self.y
    }
}

/// Plot intermediate data during setup phase
#[derive(Debug, Clone)]
struct PlotData {
    series: Vec<Series>,
    legend: Option<Legend>,
    colorbars: Vec<(Arc<dyn ColorMap>, Option<ColorBar>)>,
    insets: geom::Padding,
}

pub type AxisTextCacheMap = HashMap<AxisCacheKey, Option<String>>;

trait IrPlotExt {
    fn x_axes(&self) -> &[des::Axis];
    fn y_axes(&self) -> &[des::Axis];
    fn orientation_axes(&self, or: Orientation) -> &[des::Axis] {
        match or {
            Orientation::X => self.x_axes(),
            Orientation::Y => self.y_axes(),
        }
    }
}

impl IrPlotExt for des::Plot {
    fn x_axes(&self) -> &[des::Axis] {
        self.x_axes()
    }
    fn y_axes(&self) -> &[des::Axis] {
        self.y_axes()
    }
}

trait IrPlotsExt {
    fn cols(&self) -> u32;
    fn plot(&self, idx: PlotIdx) -> Option<&des::Plot>;
    fn plots(&self) -> impl Iterator<Item = Option<&des::Plot>> + '_;

    /// get the plot and its index at once
    fn idx_plt(&self, idx: impl Into<PlotIdx>) -> Option<(usize, &des::Plot)> {
        let idx = idx.into();
        self.plot(idx).map(|p| (idx.index(self.cols()) as usize, p))
    }

    fn orientation_axes_len(&self, or: Orientation) -> usize {
        self.plots()
            .filter_map(|p| p)
            .map(|p| p.orientation_axes(or).len())
            .sum()
    }

    fn orientation_find_axis(
        &self,
        or: Orientation,
        ax_ref: &des::axis::Ref,
        plt_idx: usize,
        axes_text_cache: &AxisTextCacheMap,
    ) -> Option<(usize, &des::Axis)> {
        let mut fig_ax_idx = 0;
        for (pi, plot) in self.plots().enumerate() {
            let Some(plot) = plot else { continue };

            for (ai, axis) in plot.orientation_axes(or).iter().enumerate() {
                match ax_ref {
                    des::axis::Ref::Idx(idx) => {
                        if *idx == ai && plt_idx == pi {
                            return Some((fig_ax_idx, axis));
                        }
                    }
                    des::axis::Ref::Id(id) => {
                        if axis.id() == Some(id) {
                            return Some((fig_ax_idx, axis));
                        }
                        let key = AxisCacheKey {
                            plt_idx: pi,
                            ax_idx: ai,
                            orientation: or,
                        };
                        let cache = axes_text_cache.get(&key)?;
                        if let Some(title) = cache.as_ref() {
                            if title == id {
                                return Some((fig_ax_idx, axis));
                            }
                        }
                    }
                }
                fig_ax_idx += 1;
            }
        }
        None
    }
}

impl IrPlotsExt for des::figure::Plots {
    fn cols(&self) -> u32 {
        self.cols()
    }
    fn plot(&self, idx: PlotIdx) -> Option<&des::Plot> {
        self.plot(idx)
    }
    fn plots(&self) -> impl Iterator<Item = Option<&des::Plot>> + '_ {
        self.iter()
    }
}

/// Temporary struct to hold axes of a plot during setup.
/// Either X or Y axes are held, but not both.
/// None is held when there is no series matching the axis
#[derive(Debug, Clone)]
struct PlotAxes(Vec<Option<Axis>>);

impl PlotAxes {
    fn size_across(&self, side: des::axis::Side) -> f32 {
        let mut sz = 0.0;
        let mut cnt = 0;
        for a in &self.0 {
            if let Some(a) = a {
                if a.side().to_des_side() != side {
                    continue;
                }
                sz += a.size_across();
                cnt += 1;
            }
        }
        if cnt > 1 {
            sz += (cnt as f32 - 1.0)
                * (missing_params::AXIS_MARGIN + missing_params::AXIS_SPINE_WIDTH);
        }
        sz
    }
}

impl<D> Ctx<'_, D>
where
    D: data::Source + ?Sized,
{
    /// Setup a collection of plots, given an design representation of the plots
    /// and a bounding rectangle.
    pub fn setup_plots(
        &self,
        des_plots: &des::figure::Plots,
        rect: &geom::Rect,
    ) -> Result<Plots, Error> {
        // We build all needed characteristics by the plots one after another.
        // Each characteristic (axes, interspace etc.) is in vector, indexed in the
        // same order than the plots

        // PlotData contains all data that is not impacted by the size of axes
        let plot_data = self.setup_plot_data(des_plots, rect)?;

        let mut axes_cache = self.setup_axes_cache(des_plots)?;
        let mut axes_text_cache: HashMap<AxisCacheKey, Option<String>> = HashMap::new();
        for (key, cache) in axes_cache.iter() {
            axes_text_cache.insert(key.clone(), cache.title.as_ref().map(|t| t.text.clone()));
        }

        // Estimate the space taken by all horizontal axes
        // Can be slightly wrong if font metrics height isn't exactly font size.
        // This will be fixed at end of the setup phase.
        let bottom_heights = self.calc_estimated_x_heights(
            des_plots,
            &axes_cache,
            &plot_data,
            des::axis::Side::Main,
        );
        let top_heights = self.calc_estimated_x_heights(
            des_plots,
            &axes_cache,
            &plot_data,
            des::axis::Side::Opposite,
        );
        let hor_space_height = bottom_heights.iter().sum::<f32>()
            + top_heights.iter().sum::<f32>()
            + des_plots.space() * (des_plots.rows() - 1) as f32;

        // Now we can determine length of vertical axes and set them all up
        let subplot_rect_height = (rect.height() - hor_space_height) / des_plots.rows() as f32;
        let y_axes = self.setup_orientation_axes(
            Orientation::Y,
            des_plots,
            &plot_data,
            &mut axes_cache,
            &axes_text_cache,
            subplot_rect_height,
        )?;

        // Now we calculate the interspace between vertical axes
        let left_widths = self.calc_y_widths(des_plots, &plot_data, &y_axes, des::axis::Side::Main);
        let right_widths =
            self.calc_y_widths(des_plots, &plot_data, &y_axes, des::axis::Side::Opposite);
        let vert_space_width = left_widths.iter().sum::<f32>()
            + right_widths.iter().sum::<f32>()
            + des_plots.space() * (des_plots.cols() - 1) as f32;

        // Now we can determine width of horizontal axes and set them all up
        let subplot_rect_width = (rect.width() - vert_space_width) / des_plots.cols() as f32;
        if subplot_rect_width <= 0.0 || subplot_rect_height <= 0.0 {
            return Err(Error::NotEnoughSpace);
        }
        let x_axes = self.setup_orientation_axes(
            Orientation::X,
            des_plots,
            &plot_data,
            &mut axes_cache,
            &axes_text_cache,
            subplot_rect_width,
        )?;

        // bottom heights were estimated, we can now calculate them accurately and rebuild the y-axes
        // let's take back the axes cache as those didn't change
        for (plt_idx, y_ax) in y_axes.into_iter().enumerate() {
            if let Some(y_ax) = y_ax {
                for (ax_idx, ax) in y_ax.0.into_iter().enumerate() {
                    if let Some(ax) = ax {
                        let key = AxisCacheKey {
                            plt_idx,
                            ax_idx,
                            orientation: Orientation::Y,
                        };
                        axes_cache.insert(key, ax.into_cache());
                    }
                }
            }
        }
        let bottom_heights =
            self.calc_x_heights(des_plots, &plot_data, &x_axes, des::axis::Side::Main);
        let top_heights =
            self.calc_x_heights(des_plots, &plot_data, &x_axes, des::axis::Side::Opposite);
        let hor_space_height = bottom_heights.iter().sum::<f32>()
            + top_heights.iter().sum::<f32>()
            + des_plots.space() * (des_plots.rows() - 1) as f32;
        let subplot_rect_height = (rect.height() - hor_space_height) / des_plots.rows() as f32;
        let y_axes = self.setup_orientation_axes(
            Orientation::Y,
            des_plots,
            &plot_data,
            &mut axes_cache,
            &axes_text_cache,
            subplot_rect_height,
        )?;

        // Everything is now ready to setup all plots
        let mut plots: Vec<Option<Plot>> = vec![None; des_plots.len()];
        let mut plot_data = plot_data.into_iter();
        let mut x_axes = x_axes.into_iter();
        let mut y_axes = y_axes.into_iter();

        let mut y = rect.y();
        for row in 0..des_plots.rows() {
            let height =
                subplot_rect_height + top_heights[row as usize] + bottom_heights[row as usize];
            let mut x = rect.x();

            for col in 0..des_plots.cols() {
                let width =
                    subplot_rect_width + left_widths[col as usize] + right_widths[col as usize];

                let data = plot_data.next().unwrap();
                let x_axes = x_axes.next().unwrap();
                let y_axes = y_axes.next().unwrap();

                if let Some(des_plot) = des_plots.plot((row, col)) {
                    let outer_rect = geom::Rect::from_xywh(x, y, width, height);
                    let plot_rect = geom::Rect::from_xywh(
                        x + left_widths[col as usize],
                        y + top_heights[row as usize],
                        subplot_rect_width,
                        subplot_rect_height,
                    );

                    let PlotData {
                        series,
                        legend,
                        colorbars,
                        ..
                    } = data.unwrap();

                    let legend = legend.map(|leg| {
                        let top_left = legend_top_left(
                            des_plot.legend().unwrap(),
                            leg.size(),
                            &plot_rect,
                            &outer_rect,
                        );
                        (top_left, leg)
                    });

                    let axes = {
                        let x_ax = x_axes.unwrap();
                        let y_ax = y_axes.unwrap();
                        let x: Vec<Axis> = x_ax.0.into_iter().filter_map(|a| a).collect();
                        let y: Vec<Axis> = y_ax.0.into_iter().filter_map(|a| a).collect();

                        if x.is_empty() && y.is_empty() {
                            None
                        } else if x.is_empty() || y.is_empty() {
                            unreachable!(
                                "axes are None when there are no series, so should be both None or both Some"
                            )
                        } else {
                            Some(Axes { x, y })
                        }
                    };

                    let annots = if let Some(axes) = axes.as_ref() {
                        des_plot
                            .annotations()
                            .iter()
                            .map(|a| self.setup_annot(a, axes))
                            .collect::<Result<_, Error>>()?
                    } else {
                        Vec::new()
                    };

                    let plt_idx = row * des_plots.cols() + col;
                    let plot = Plot {
                        idx: (row, col).into(),
                        rect: plot_rect,
                        fill: des_plot.fill().cloned(),
                        border: des_plot.border().cloned(),
                        axes,
                        series,
                        legend,
                        colorbars,
                        annots,
                    };
                    plots[plt_idx as usize] = Some(plot);
                }
                x += width + des_plots.space();
            }

            y += height + des_plots.space();
        }

        let mut plots = Plots {
            plots,
            size: (des_plots.rows(), des_plots.cols()),
        };

        plots.update_series_data(self.data_source())?;

        Ok(plots)
    }

    fn setup_plot_data(
        &self,
        des_plots: &des::figure::Plots,
        rect: &geom::Rect,
    ) -> Result<Vec<Option<PlotData>>, Error> {
        let mut plot_data = vec![None; des_plots.len()];
        for (idx, des_plot) in des_plots.iter().enumerate() {
            let Some(des_plot) = des_plot else { continue };
            let series = self.setup_plot_series(des_plot)?;
            let cols = des_plots.cols() as f32;
            let avail_width = (rect.width() - des_plots.space() * (cols - 1.0)) / cols;
            let legend = self.setup_plot_legend(des_plot, avail_width)?;
            let colorbars = self.setup_plot_colorbars(des_plot)?;
            let insets = plot_insets(des_plot);

            plot_data[idx] = Some(PlotData {
                series,
                legend,
                colorbars,
                insets,
            });
        }
        Ok(plot_data)
    }

    fn setup_axes_cache(&self, des_plots: &des::figure::Plots) -> Result<AxisCacheMap, Error> {
        let mut axis_cache = HashMap::new();
        for (plt_idx, des_plot) in des_plots.iter().enumerate() {
            let Some(des_plot) = des_plot else { continue };

            for (ax_idx, des_ax) in des_plot.x_axes().iter().enumerate() {
                let key = AxisCacheKey {
                    plt_idx,
                    ax_idx,
                    orientation: Orientation::X,
                };
                let cache = self.setup_axis_cache(
                    Side::from_or_des_side(Orientation::X, des_ax.side()),
                    des_ax,
                )?;
                axis_cache.insert(key, cache);
            }

            for (ax_idx, des_ax) in des_plot.y_axes().iter().enumerate() {
                let key = AxisCacheKey {
                    plt_idx,
                    ax_idx,
                    orientation: Orientation::Y,
                };
                let cache = self.setup_axis_cache(
                    Side::from_or_des_side(Orientation::Y, des_ax.side()),
                    des_ax,
                )?;
                axis_cache.insert(key, cache);
            }
        }
        Ok(axis_cache)
    }

    fn setup_plot_series(&self, plot: &des::Plot) -> Result<Vec<Series>, Error> {
        plot.series()
            .iter()
            .enumerate()
            .map(|(index, s)| Series::prepare(index, s, self.data_source()))
            .collect()
    }

    fn setup_plot_legend(
        &self,
        des_plot: &des::Plot,
        avail_width: f32,
    ) -> Result<Option<Legend>, Error> {
        let Some(des_leg) = des_plot.legend() else {
            return Ok(None);
        };

        let mut builder = LegendBuilder::from_des(
            des_leg,
            des_leg.pos().prefers_vertical(),
            avail_width,
            self.fontdb(),
        );

        let data_source = self.data_source();
        let mut idx = 0;
        for_each_legend_entries(des_plot, data_source, |entries| {
            match entries {
                legend::Entries::Single(entry) => {
                    builder.add_entry(idx, entry)?;
                    idx += 1;
                }
                legend::Entries::Multi(entries) => {
                    for entry in entries {
                        builder.add_entry(idx, entry)?;
                        idx += 1;
                    }
                }
                legend::Entries::None => {}
            }
            Ok(())
        })?;

        Ok(builder.layout())
    }

    fn setup_plot_colorbars(
        &self,
        des_plot: &des::Plot,
    ) -> Result<Vec<(Arc<dyn ColorMap>, Option<ColorBar>)>, Error> {
        let des_colorbar = des_plot.colorbar();

        let mut builders: Vec<ColorBarBuilder> = Vec::new();

        for_each_colorbar_entry(des_plot, |entry| {
            let col = get_column(entry.data_col, self.data_source())?;
            let bounds = col
                .bounds()
                .expect("Should get bounds for colormap data column");

            let locator = des_colorbar
                .map(|cb| cb.ticks_locator())
                .cloned()
                .unwrap_or_default();

            let hash = entry.cmap_build.hash(bounds.as_bound_ref());

            if let Some(cbb) = builders.iter_mut().find(|b| b.hash() == hash) {
                cbb.unite_bounds(bounds.as_bound_ref())?;
            } else {
                builders.push(ColorBarBuilder::new(
                    entry.cmap_build,
                    hash,
                    bounds,
                    locator,
                )?);
            }
            Ok(())
        })?;

        Ok(builders
            .into_iter()
            .map(|b| b.build(des_colorbar.cloned(), self))
            .collect::<Result<Vec<_>, _>>()?)
    }

    fn calc_estimated_x_heights(
        &self,
        des_plots: &des::figure::Plots,
        axis_cache: &AxisCacheMap,
        datas: &[Option<PlotData>],
        side: des::axis::Side,
    ) -> Vec<f32> {
        let mut heights = Vec::with_capacity(des_plots.rows() as usize);
        for row in 0..des_plots.rows() {
            let mut max_height: f32 = 0.0;
            for col in 0..des_plots.cols() {
                if let Some((plt_idx, des_plot)) = des_plots.idx_plt((row, col)) {
                    let data = datas[plt_idx].as_ref().unwrap();

                    let mut height = x_plot_padding(side);
                    height +=
                        self.estimate_x_axes_height(des_plot.x_axes(), plt_idx, axis_cache, side);
                    if let (Some(des_leg), Some(leg)) = (des_plot.legend(), data.legend.as_ref()) {
                        if x_side_matches_out_legend_pos(side, des_leg.pos()) {
                            height += leg.size().height() + des_leg.margin();
                        }
                    }

                    for cbar in data.colorbars.iter().filter_map(|(_, cbar)| cbar.as_ref()) {
                        if x_side_matches_colorbar_pos(side, cbar.pos()) {
                            height += cbar.calc_size_across() + cbar.margin();
                        }
                    }

                    max_height = max_height.max(height);
                }
            }
            heights.push(max_height);
        }
        heights
    }

    fn calc_x_heights(
        &self,
        des_plots: &des::figure::Plots,
        datas: &[Option<PlotData>],
        x_axes: &[Option<PlotAxes>],
        side: des::axis::Side,
    ) -> Vec<f32> {
        let mut heights = Vec::with_capacity(des_plots.rows() as usize);

        for row in 0..des_plots.rows() {
            let mut max_height = f32::NAN;
            for col in 0..des_plots.cols() {
                let Some((index, des_plot)) = des_plots.idx_plt((row, col)) else {
                    continue;
                };

                let data = datas[index].as_ref().unwrap();
                let x_axes = x_axes[index].as_ref().unwrap();

                let mut height = x_plot_padding(side);
                height += x_axes.size_across(side);

                if let (Some(des_leg), Some(leg)) = (des_plot.legend(), data.legend.as_ref()) {
                    if x_side_matches_out_legend_pos(side, des_leg.pos()) {
                        height += leg.size().height() + des_leg.margin();
                    }
                }

                for cbar in data.colorbars.iter().filter_map(|(_, cbar)| cbar.as_ref()) {
                    if x_side_matches_colorbar_pos(side, cbar.pos()) {
                        height += cbar.calc_size_across() + cbar.margin();
                    }
                }

                max_height = max_height.max(height);
            }
            debug_assert!(max_height.is_finite());
            heights.push(max_height);
        }
        heights
    }

    fn calc_y_widths(
        &self,
        des_plots: &des::figure::Plots,
        datas: &[Option<PlotData>],
        y_axes: &[Option<PlotAxes>],
        side: des::axis::Side,
    ) -> Vec<f32> {
        let mut widths = Vec::with_capacity(des_plots.cols() as usize);

        for col in 0..des_plots.cols() {
            let mut max_width = f32::NAN;
            for row in 0..des_plots.rows() {
                if let Some((index, des_plot)) = des_plots.idx_plt((row, col)) {
                    let data = datas[index].as_ref().unwrap();
                    let y_axis = y_axes[index].as_ref().unwrap();

                    let mut width = y_plot_padding(side);
                    width += y_axis.size_across(side);

                    if let (Some(des_leg), Some(leg)) = (des_plot.legend(), data.legend.as_ref()) {
                        if y_side_matches_out_legend_pos(side, des_leg.pos()) {
                            width += leg.size().width() + des_leg.margin();
                        }
                    }

                    for cbar in data.colorbars.iter().filter_map(|(_, cbar)| cbar.as_ref()) {
                        if y_side_matches_colorbar_pos(side, cbar.pos()) {
                            width += cbar.calc_size_across() + cbar.margin();
                        }
                    }

                    max_width = max_width.max(width);
                }
            }
            debug_assert!(max_width.is_finite());
            widths.push(max_width);
        }
        widths
    }

    fn setup_orientation_axes(
        &self,
        or: Orientation,
        des_plots: &des::figure::Plots,
        datas: &[Option<PlotData>],
        axes_cache: &mut AxisCacheMap,
        axes_text_cache: &AxisTextCacheMap,
        size_along: f32,
    ) -> Result<Vec<Option<PlotAxes>>, Error> {
        let mut plot_axes = vec![None; des_plots.len()];

        // collecting all axes that own their scale.

        // ax_infos is Some only for the axis owning their scale
        let mut ax_infos: Vec<Option<(Bounds, Rc<RefCell<AxisScale>>)>> =
            vec![None; des_plots.orientation_axes_len(or)];

        // index of the first axis of a plot, at figure level
        let mut fig_ax_idx0 = 0;

        for (plt_idx, des_plot) in des_plots.iter().enumerate() {
            let Some(des_plot) = des_plot else { continue };

            let des_axes = des_plot.orientation_axes(or);

            let mut axes = vec![None; des_axes.len()];

            // track whether the main and opposite axes are directly attached to the plot area
            let mut main_off_plot = false;
            let mut opposite_off_plot = false;

            for (ax_idx, des_ax) in des_axes.iter().enumerate() {
                if des_ax.scale().is_shared() {
                    continue;
                }

                // `des_ax` owns its scale.
                // We have to collect data bounds of all the series that refer to it.
                // `matcher` will match the series that refer to `des_ax` with Series::x/y_axis.
                // If Series::x/y_axis returns None, it refers implicitly to ax_idx == 0.

                // We also have to collect data bounds of series that refer to a shared axis
                // referring explicitly to `des_ax`. This is done in the inner loop with `des_ax2`.

                let key = AxisCacheKey {
                    plt_idx,
                    ax_idx,
                    orientation: or,
                };

                let title = axes_text_cache.get(&key).and_then(|t| t.as_deref());
                let matcher = series::AxisMatcher {
                    plt_idx,
                    ax_idx,
                    id: des_ax.id(),
                    title,
                };

                let mut bounds = None;

                for (plt_idx2, des_plot2) in des_plots.iter().enumerate() {
                    let Some(des_plot2) = des_plot2 else { continue };
                    let data = datas[plt_idx2].as_ref().unwrap();
                    let series = &data.series;
                    bounds = Series::unite_bounds(or, series, bounds, &matcher, plt_idx2)?;

                    for (ax_idx2, des_ax2) in des_plot2.orientation_axes(or).iter().enumerate() {
                        if let des::axis::Scale::Shared(ax_ref2) = des_ax2.scale() {
                            if matcher.matches_ref(ax_ref2, plt_idx2)? {
                                let key = AxisCacheKey {
                                    plt_idx: plt_idx2,
                                    ax_idx: ax_idx2,
                                    orientation: or,
                                };
                                let title = axes_text_cache.get(&key).and_then(|t| t.as_deref());
                                let matcher = series::AxisMatcher {
                                    plt_idx: plt_idx2,
                                    ax_idx: ax_idx2,
                                    id: des_ax2.id(),
                                    title,
                                };
                                bounds =
                                    Series::unite_bounds(or, series, bounds, &matcher, plt_idx2)?;
                            }
                        }
                    }
                }

                let Some(bounds) = bounds else { continue };

                let off_plot = match des_ax.side() {
                    des::axis::Side::Main => &mut main_off_plot,
                    des::axis::Side::Opposite => &mut opposite_off_plot,
                };
                let off_plot_area = *off_plot;
                *off_plot = true;

                // spine is drawn by axis:
                //  - when it is off plot area
                //  - when it is in plot area, but not a boxed plot
                let spine = match (off_plot_area, des_plot.border()) {
                    (true, _) => des_plot.border().cloned(),
                    (false, Some(des::plot::Border::Box(_))) => None,
                    (false, Some(border)) => Some(border.clone()),
                    (false, None) => None,
                };

                let ax = self.setup_axis(
                    des_ax,
                    axes_cache
                        .remove(&key)
                        .expect("AxisCache should have been built for axis owning its scale"),
                    &bounds,
                    size_along,
                    &datas[plt_idx].as_ref().unwrap().insets,
                    None,
                    spine,
                )?;
                ax_infos[fig_ax_idx0 + ax_idx] = Some((bounds, ax.scale().clone()));
                axes[ax_idx] = Some(ax);
            }

            fig_ax_idx0 += des_axes.len();
            plot_axes[plt_idx] = Some(PlotAxes(axes));
        }

        // build the others with shared scale

        for (plt_idx, des_plot) in des_plots.iter().enumerate() {
            let Some(des_plot) = des_plot else {
                continue;
            };

            let des_axes = des_plot.orientation_axes(or);
            let axes = plot_axes[plt_idx].as_mut().unwrap();

            // track whether the main and opposite axes are directly attached to the plot area
            let mut main_off_plot = false;
            let mut opposite_off_plot = false;

            for (ax_idx, des_ax) in des_axes.iter().enumerate() {
                let des::axis::Scale::Shared(ax_ref) = des_ax.scale() else {
                    continue;
                };
                let (fig_ax_idx, _) = des_plots
                    .orientation_find_axis(or, ax_ref, plt_idx, axes_text_cache)
                    .ok_or_else(|| Error::UnknownAxisRef(ax_ref.clone()))?;

                let info = ax_infos[fig_ax_idx]
                    .as_ref()
                    .ok_or_else(|| Error::IllegalAxisRef(ax_ref.clone()))?;

                let off_plot = match des_ax.side() {
                    des::axis::Side::Main => &mut main_off_plot,
                    des::axis::Side::Opposite => &mut opposite_off_plot,
                };
                let off_plot_area = *off_plot;
                *off_plot = true;

                // spine is drawn by axis:
                //  - when it is off plot area
                //  - when it is in plot area, but not a boxed plot
                let spine = match (off_plot_area, des_plot.border()) {
                    (true, _) => des_plot.border().cloned(),
                    (false, Some(des::plot::Border::Box(_))) => None,
                    (false, Some(border)) => Some(border.clone()),
                    (false, None) => None,
                };

                let key = AxisCacheKey {
                    plt_idx,
                    ax_idx,
                    orientation: or,
                };
                let cache = axes_cache
                    .remove(&key)
                    .expect("AxisCache should have been built for all axes");

                let axis = self.setup_axis(
                    des_ax,
                    cache,
                    &info.0,
                    size_along,
                    &datas[plt_idx].as_ref().unwrap().insets,
                    Some(info.1.clone()),
                    spine,
                )?;
                axes.0[ax_idx] = Some(axis);
            }
        }
        Ok(plot_axes)
    }
}

pub fn for_each_legend_entries<D, F>(
    plot: &des::Plot,
    data_source: &D,
    mut f: F,
) -> Result<(), Error>
where
    D: data::Source + ?Sized,
    F: FnMut(legend::Entries) -> Result<(), Error>,
{
    for s in plot.series() {
        match &s {
            des::Series::Line(line) => f(line.legend_entries(data_source)?)?,
            des::Series::Scatter(scatter) => f(scatter.legend_entries(data_source)?)?,
            des::Series::Area(area) => f(area.legend_entries(data_source)?)?,
            des::Series::Histogram(hist) => f(hist.legend_entries(data_source)?)?,
            des::Series::Bars(bars) => f(bars.legend_entries(data_source)?)?,
            des::Series::BarsGroup(bars_group) => {
                for bs in bars_group.series() {
                    f(bs.legend_entries(data_source)?)?
                }
            }
        }
    }
    Ok(())
}

pub fn for_each_colorbar_entry<F>(plot: &des::Plot, mut f: F) -> Result<(), Error>
where
    F: FnMut(colorbar::Entry<'_>) -> Result<(), Error>,
{
    for s in plot.series() {
        match &s {
            des::Series::Line(line) => {
                if let Some(entry) = line.colorbar_entry() {
                    f(entry)?;
                }
            }
            des::Series::Scatter(scatter) => {
                if let Some(entry) = scatter.colorbar_entry() {
                    f(entry)?;
                }
            }
            des::Series::Area(area) => {
                if let Some(entry) = area.colorbar_entry() {
                    f(entry)?;
                }
            }
            des::Series::Histogram(hist) => {
                if let Some(entry) = hist.colorbar_entry() {
                    f(entry)?;
                }
            }
            des::Series::Bars(bars) => {
                if let Some(entry) = bars.colorbar_entry() {
                    f(entry)?;
                }
            }
            des::Series::BarsGroup(bars_group) => {
                for bs in bars_group.series() {
                    if let Some(entry) = bs.colorbar_entry() {
                        f(entry)?;
                    }
                }
            }
        }
    }
    Ok(())
}

fn plot_insets(plot: &des::Plot) -> geom::Padding {
    match plot.insets() {
        Some(&des::plot::Insets::Fixed(x, y)) => geom::Padding::Center { ver: y, hor: x },
        Some(des::plot::Insets::Auto) => auto_insets(plot),
        None => geom::Padding::Even(0.0),
    }
}

fn auto_insets(plot: &des::Plot) -> geom::Padding {
    for s in plot.series() {
        match s {
            des::Series::Histogram(..) => return defaults::PLOT_VER_BARS_AUTO_INSETS,
            des::Series::Bars(..) => return defaults::PLOT_VER_BARS_AUTO_INSETS,
            des::Series::BarsGroup(bg) if bg.orientation().is_vertical() => {
                return defaults::PLOT_VER_BARS_AUTO_INSETS;
            }
            des::Series::BarsGroup(bg) if bg.orientation().is_horizontal() => {
                return defaults::PLOT_HOR_BARS_AUTO_INSETS;
            }
            _ => (),
        }
    }
    defaults::PLOT_XY_AUTO_INSETS
}

fn x_plot_padding(side: des::axis::Side) -> f32 {
    match side {
        des::axis::Side::Main => missing_params::PLOT_PADDING.bottom(),
        des::axis::Side::Opposite => missing_params::PLOT_PADDING.top(),
    }
}

fn y_plot_padding(side: des::axis::Side) -> f32 {
    match side {
        des::axis::Side::Main => missing_params::PLOT_PADDING.left(),
        des::axis::Side::Opposite => missing_params::PLOT_PADDING.right(),
    }
}

fn x_side_matches_out_legend_pos(side: des::axis::Side, legend_pos: des::plot::LegendPos) -> bool {
    match (side, legend_pos) {
        (des::axis::Side::Main, des::plot::LegendPos::OutBottom) => true,
        (des::axis::Side::Opposite, des::plot::LegendPos::OutTop) => true,
        _ => false,
    }
}

fn y_side_matches_out_legend_pos(side: des::axis::Side, legend_pos: des::plot::LegendPos) -> bool {
    match (side, legend_pos) {
        (des::axis::Side::Main, des::plot::LegendPos::OutLeft) => true,
        (des::axis::Side::Opposite, des::plot::LegendPos::OutRight) => true,
        _ => false,
    }
}

fn x_side_matches_colorbar_pos(side: des::axis::Side, pos: des::colorbar::Pos) -> bool {
    match (side, pos) {
        (des::axis::Side::Main, des::colorbar::Pos::Bottom) => true,
        (des::axis::Side::Opposite, des::colorbar::Pos::Top) => true,
        _ => false,
    }
}

fn y_side_matches_colorbar_pos(side: des::axis::Side, pos: des::colorbar::Pos) -> bool {
    match (side, pos) {
        (des::axis::Side::Main, des::colorbar::Pos::Left) => true,
        (des::axis::Side::Opposite, des::colorbar::Pos::Right) => true,
        _ => false,
    }
}

impl Plots {
    pub fn update_series_data<D>(&mut self, data_source: &D) -> Result<(), Error>
    where
        D: data::Source + ?Sized,
    {
        for plot in self.plots.iter_mut() {
            if let Some(plot) = plot.as_mut() {
                plot.update_series_data(data_source)?;
            }
        }
        Ok(())
    }

    pub fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        self.plots
            .iter()
            .filter_map(Option::as_ref)
            .for_each(|p| p.draw(surface, style));
    }
}

impl Plot {
    fn update_series_data<D>(&mut self, data_source: &D) -> Result<(), Error>
    where
        D: data::Source + ?Sized,
    {
        let Some(axes) = &self.axes else {
            return Ok(());
        };

        for series in self.series.iter_mut() {
            let (x_ax_ref, y_ax_ref) = series.axes();
            let x = axes.orientation_find(Orientation::X, x_ax_ref)?;
            let y = axes.orientation_find(Orientation::Y, y_ax_ref)?;
            let (Some(x), Some(y)) = (x, y) else {
                unreachable!("Series without axis");
            };
            let x_cm = x.coord_map();
            let y_cm = y.coord_map();
            let cm = CoordMapXy {
                x: &*x_cm,
                y: &*y_cm,
            };
            let cmap_hash = series.cmap_hash();
            let cmap = self.colorbars.iter().find_map(|(cm, _)| {
                if Some(cm.hash()) == cmap_hash {
                    return Some(&**cm);
                }
                None
            });

            series.update_data(data_source, &self.rect, &cm, cmap)?;
        }
        Ok(())
    }

    fn draw<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        self.draw_background(surface, style);
        let Some(axes) = &self.axes else {
            self.draw_border_box(surface, style);
            return;
        };

        axes.draw_grids(surface, style, &self.rect);

        self.draw_annotations(surface, style, axes, annot::ZPos::BelowSeries);
        self.draw_series(surface, style);
        self.draw_annotations(surface, style, axes, annot::ZPos::AboveSeries);

        let plot_box = axes.draw(surface, style, &self.rect);
        self.draw_border_box(surface, style);

        for (_, cbar) in &self.colorbars {
            if let Some(cbar) = cbar {
                cbar.draw(surface, style, &self.rect, &plot_box);
            }
        }

        if let Some((top_left, leg)) = self.legend.as_ref() {
            leg.draw(surface, style, top_left);
        }
    }

    fn draw_background<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        if let Some(fill) = &self.fill {
            surface.draw_rect(&render::Rect {
                rect: self.rect,
                fill: Some(fill.as_paint(style)),
                stroke: None,
                transform: None,
            });
        }
    }

    fn draw_border_box<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        // border is drawn by plot only when it is a box
        // otherwise, axes draw the border as spines
        let rect = self.rect;
        match self.border.as_ref() {
            Some(des::plot::Border::Box(border)) => {
                surface.draw_rect(&render::Rect {
                    rect,
                    fill: None,
                    stroke: Some(border.0.as_stroke(style)),
                    transform: None,
                });
            }
            _ => (),
        }
    }

    fn draw_series<S>(&self, surface: &mut S, style: &Style)
    where
        S: render::Surface,
    {
        let rect = self.rect;
        let series = &self.series;

        let clip = render::Clip {
            rect: &rect,
            transform: None,
        };
        surface.push_clip(&clip);

        for series in series.iter() {
            series.draw(surface, style);
        }
        surface.pop_clip();
    }

    fn draw_annotations<S>(&self, surface: &mut S, style: &Style, axes: &Axes, zpos: annot::ZPos)
    where
        S: render::Surface,
    {
        for annot in self.annots.iter() {
            if annot.zpos() == zpos {
                annot.draw(surface, style, axes, &self.rect);
            }
        }
    }
}

impl Axes {
    fn draw_grids<S>(&self, surface: &mut S, style: &Style, rect: &geom::Rect)
    where
        S: render::Surface,
    {
        for axis in self.x.iter() {
            axis.draw_minor_grids(surface, style, rect);
        }
        for axis in self.y.iter() {
            axis.draw_minor_grids(surface, style, rect);
        }
        for axis in self.x.iter() {
            axis.draw_major_grids(surface, style, rect);
        }
        for axis in self.y.iter() {
            axis.draw_major_grids(surface, style, rect);
        }
    }

    fn draw<S>(&self, surface: &mut S, style: &Style, plot_rect: &geom::Rect) -> geom::Rect
    where
        S: render::Surface,
    {
        let t = self.draw_side(surface, style, &self.x, Side::Top, plot_rect);
        let r = self.draw_side(surface, style, &self.y, Side::Right, plot_rect);
        let b = self.draw_side(surface, style, &self.x, Side::Bottom, plot_rect);
        let l = self.draw_side(surface, style, &self.y, Side::Left, plot_rect);

        plot_rect
            .shifted_top_side(-t)
            .shifted_right_side(r)
            .shifted_bottom_side(b)
            .shifted_left_side(-l)
    }

    fn draw_side<S>(
        &self,
        surface: &mut S,
        style: &Style,
        axes: &[Axis],
        side: Side,
        plot_rect: &geom::Rect,
    ) -> f32
    where
        S: render::Surface,
    {
        let mut tot_shift = 0.0;
        let mut rect = *plot_rect;
        for axis in axes.iter() {
            if axis.side() == side {
                let mut shift = axis.draw(surface, style, &rect);
                if shift > 0.0 {
                    shift += missing_params::AXIS_MARGIN + missing_params::AXIS_SPINE_WIDTH;
                    rect = match side {
                        Side::Top => rect.shifted_top_side(-shift),
                        Side::Right => rect.shifted_right_side(shift),
                        Side::Bottom => rect.shifted_bottom_side(shift),
                        Side::Left => rect.shifted_left_side(-shift),
                    };
                    tot_shift += shift;
                }
            }
        }
        tot_shift
    }
}

fn legend_top_left(
    legend: &des::PlotLegend,
    sz: geom::Size,
    plot_rect: &geom::Rect,
    outer_rect: &geom::Rect,
) -> geom::Point {
    match legend.pos() {
        des::plot::LegendPos::OutTop => geom::Point {
            x: outer_rect.center_x() - sz.width() / 2.0,
            y: outer_rect.top(),
        },
        des::plot::LegendPos::OutRight => geom::Point {
            x: outer_rect.right() - sz.width(),
            y: outer_rect.center_y() - sz.height() / 2.0,
        },
        des::plot::LegendPos::OutBottom => geom::Point {
            x: outer_rect.center_x() - sz.width() / 2.0,
            y: outer_rect.bottom() - sz.height(),
        },
        des::plot::LegendPos::OutLeft => geom::Point {
            x: outer_rect.left(),
            y: outer_rect.center_y() - sz.height() / 2.0,
        },
        des::plot::LegendPos::InTop => geom::Point {
            x: plot_rect.center_x() - sz.width() / 2.0,
            y: plot_rect.top() + legend.margin(),
        },
        des::plot::LegendPos::InTopRight => geom::Point {
            x: plot_rect.right() - sz.width() - legend.margin(),
            y: plot_rect.top() + legend.margin(),
        },
        des::plot::LegendPos::InRight => geom::Point {
            x: plot_rect.right() - sz.width() - legend.margin(),
            y: plot_rect.center_y() - sz.height() / 2.0,
        },
        des::plot::LegendPos::InBottomRight => geom::Point {
            x: plot_rect.right() - sz.width() - legend.margin(),
            y: plot_rect.bottom() - sz.height() - legend.margin(),
        },
        des::plot::LegendPos::InBottom => geom::Point {
            x: plot_rect.center_x() - sz.width() / 2.0,
            y: plot_rect.bottom() - sz.height() - legend.margin(),
        },
        des::plot::LegendPos::InBottomLeft => geom::Point {
            x: plot_rect.left() + legend.margin(),
            y: plot_rect.bottom() - sz.height() - legend.margin(),
        },
        des::plot::LegendPos::InLeft => geom::Point {
            x: plot_rect.left() + legend.margin(),
            y: plot_rect.center_y() - sz.height() / 2.0,
        },
        des::plot::LegendPos::InTopLeft => geom::Point {
            x: plot_rect.left() + legend.margin(),
            y: plot_rect.top() + legend.margin(),
        },
    }
}
