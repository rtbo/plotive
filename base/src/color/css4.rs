use super::Rgba8;

// standard CSS colors
pub const COLORS: &[(&str, Rgba8)] = &[
    ("transparent", Rgba8::new(0, 0, 0, 0)),
    ("black", Rgba8::from_hex(b"#000000")),
    ("silver", Rgba8::from_hex(b"#c0c0c0")),
    ("gray", Rgba8::from_hex(b"#808080")),
    ("white", Rgba8::from_hex(b"#ffffff")),
    ("maroon", Rgba8::from_hex(b"#800000")),
    ("red", Rgba8::from_hex(b"#ff0000")),
    ("purple", Rgba8::from_hex(b"#800080")),
    ("fuchsia", Rgba8::from_hex(b"#ff00ff")),
    ("green", Rgba8::from_hex(b"#008000")),
    ("lime", Rgba8::from_hex(b"#00ff00")),
    ("olive", Rgba8::from_hex(b"#808000")),
    ("yellow", Rgba8::from_hex(b"#ffff00")),
    ("navy", Rgba8::from_hex(b"#000080")),
    ("blue", Rgba8::from_hex(b"#0000ff")),
    ("teal", Rgba8::from_hex(b"#008080")),
    ("aqua", Rgba8::from_hex(b"#00ffff")),
    // other named colors
    ("aliceblue", Rgba8::from_hex(b"#f0f8ff")),
    ("antiquewhite", Rgba8::from_hex(b"#faebd7")),
    ("aquamarine", Rgba8::from_hex(b"#7fffd4")),
    ("azure", Rgba8::from_hex(b"#f0ffff")),
    ("beige", Rgba8::from_hex(b"#f5f5dc")),
    ("bisque", Rgba8::from_hex(b"#ffe4c4")),
    ("blanchedalmond", Rgba8::from_hex(b"#ffebcd")),
    ("blueviolet", Rgba8::from_hex(b"#8a2be2")),
    ("brown", Rgba8::from_hex(b"#a52a2a")),
    ("burlywood", Rgba8::from_hex(b"#deb887")),
    ("cadetblue", Rgba8::from_hex(b"#5f9ea0")),
    ("chartreuse", Rgba8::from_hex(b"#7fff00")),
    ("chocolate", Rgba8::from_hex(b"#d2691e")),
    ("coral", Rgba8::from_hex(b"#ff7f50")),
    ("cornflowerblue", Rgba8::from_hex(b"#6495ed")),
    ("cornsilk", Rgba8::from_hex(b"#fff8dc")),
    ("crimson", Rgba8::from_hex(b"#dc143c")),
    ("cyan", Rgba8::from_hex(b"#00ffff")),
    ("darkblue", Rgba8::from_hex(b"#00008b")),
    ("darkcyan", Rgba8::from_hex(b"#008b8b")),
    ("darkgoldenrod", Rgba8::from_hex(b"#b8860b")),
    ("darkgray", Rgba8::from_hex(b"#a9a9a9")),
    ("darkgreen", Rgba8::from_hex(b"#006400")),
    ("darkgrey", Rgba8::from_hex(b"#a9a9a9")),
    ("darkkhaki", Rgba8::from_hex(b"#bdb76b")),
    ("darkmagenta", Rgba8::from_hex(b"#8b008b")),
    ("darkolivegreen", Rgba8::from_hex(b"#556b2f")),
    ("darkorange", Rgba8::from_hex(b"#ff8c00")),
    ("darkorchid", Rgba8::from_hex(b"#9932cc")),
    ("darkred", Rgba8::from_hex(b"#8b0000")),
    ("darksalmon", Rgba8::from_hex(b"#e9967a")),
    ("darkseagreen", Rgba8::from_hex(b"#8fbc8f")),
    ("darkslateblue", Rgba8::from_hex(b"#483d8b")),
    ("darkslategray", Rgba8::from_hex(b"#2f4f4f")),
    ("darkslategrey", Rgba8::from_hex(b"#2f4f4f")),
    ("darkturquoise", Rgba8::from_hex(b"#00ced1")),
    ("darkviolet", Rgba8::from_hex(b"#9400d3")),
    ("deeppink", Rgba8::from_hex(b"#ff1493")),
    ("deepskyblue", Rgba8::from_hex(b"#00bfff")),
    ("dimgray", Rgba8::from_hex(b"#696969")),
    ("dimgrey", Rgba8::from_hex(b"#696969")),
    ("dodgerblue", Rgba8::from_hex(b"#1e90ff")),
    ("firebrick", Rgba8::from_hex(b"#b22222")),
    ("floralwhite", Rgba8::from_hex(b"#fffaf0")),
    ("forestgreen", Rgba8::from_hex(b"#228b22")),
    ("gainsboro", Rgba8::from_hex(b"#dcdcdc")),
    ("ghostwhite", Rgba8::from_hex(b"#f8f8ff")),
    ("gold", Rgba8::from_hex(b"#ffd700")),
    ("goldenrod", Rgba8::from_hex(b"#daa520")),
    ("greenyellow", Rgba8::from_hex(b"#adff2f")),
    ("grey", Rgba8::from_hex(b"#808080")),
    ("honeydew", Rgba8::from_hex(b"#f0fff0")),
    ("hotpink", Rgba8::from_hex(b"#ff69b4")),
    ("indianred", Rgba8::from_hex(b"#cd5c5c")),
    ("indigo", Rgba8::from_hex(b"#4b0082")),
    ("ivory", Rgba8::from_hex(b"#fffff0")),
    ("khaki", Rgba8::from_hex(b"#f0e68c")),
    ("lavender", Rgba8::from_hex(b"#e6e6fa")),
    ("lavenderblush", Rgba8::from_hex(b"#fff0f5")),
    ("lawngreen", Rgba8::from_hex(b"#7cfc00")),
    ("lemonchiffon", Rgba8::from_hex(b"#fffacd")),
    ("lightblue", Rgba8::from_hex(b"#add8e6")),
    ("lightcoral", Rgba8::from_hex(b"#f08080")),
    ("lightcyan", Rgba8::from_hex(b"#e0ffff")),
    ("lightgoldenrodyellow", Rgba8::from_hex(b"#fafad2")),
    ("lightgray", Rgba8::from_hex(b"#d3d3d3")),
    ("lightgreen", Rgba8::from_hex(b"#90ee90")),
    ("lightgrey", Rgba8::from_hex(b"#d3d3d3")),
    ("lightpink", Rgba8::from_hex(b"#ffb6c1")),
    ("lightsalmon", Rgba8::from_hex(b"#ffa07a")),
    ("lightseagreen", Rgba8::from_hex(b"#20b2aa")),
    ("lightskyblue", Rgba8::from_hex(b"#87cefa")),
    ("lightslategray", Rgba8::from_hex(b"#778899")),
    ("lightslategrey", Rgba8::from_hex(b"#778899")),
    ("lightsteelblue", Rgba8::from_hex(b"#b0c4de")),
    ("lightyellow", Rgba8::from_hex(b"#ffffe0")),
    ("limegreen", Rgba8::from_hex(b"#32cd32")),
    ("linen", Rgba8::from_hex(b"#faf0e6")),
    ("magenta", Rgba8::from_hex(b"#ff00ff")),
    ("mediumaquamarine", Rgba8::from_hex(b"#66cdaa")),
    ("mediumblue", Rgba8::from_hex(b"#0000cd")),
    ("mediumorchid", Rgba8::from_hex(b"#ba55d3")),
    ("mediumpurple", Rgba8::from_hex(b"#9370db")),
    ("mediumseagreen", Rgba8::from_hex(b"#3cb371")),
    ("mediumslateblue", Rgba8::from_hex(b"#7b68ee")),
    ("mediumspringgreen", Rgba8::from_hex(b"#00fa9a")),
    ("mediumturquoise", Rgba8::from_hex(b"#48d1cc")),
    ("mediumvioletred", Rgba8::from_hex(b"#c71585")),
    ("midnightblue", Rgba8::from_hex(b"#191970")),
    ("mintcream", Rgba8::from_hex(b"#f5fffa")),
    ("mistyrose", Rgba8::from_hex(b"#ffe4e1")),
    ("moccasin", Rgba8::from_hex(b"#ffe4b5")),
    ("navajowhite", Rgba8::from_hex(b"#ffdead")),
    ("oldlace", Rgba8::from_hex(b"#fdf5e6")),
    ("olivedrab", Rgba8::from_hex(b"#6b8e23")),
    ("orange", Rgba8::from_hex(b"#ffa500")),
    ("orangered", Rgba8::from_hex(b"#ff4500")),
    ("orchid", Rgba8::from_hex(b"#da70d6")),
    ("palegoldenrod", Rgba8::from_hex(b"#eee8aa")),
    ("palegreen", Rgba8::from_hex(b"#98fb98")),
    ("paleturquoise", Rgba8::from_hex(b"#afeeee")),
    ("palevioletred", Rgba8::from_hex(b"#db7093")),
    ("papayawhip", Rgba8::from_hex(b"#ffefd5")),
    ("peachpuff", Rgba8::from_hex(b"#ffdab9")),
    ("peru", Rgba8::from_hex(b"#cd853f")),
    ("pink", Rgba8::from_hex(b"#ffc0cb")),
    ("plum", Rgba8::from_hex(b"#dda0dd")),
    ("powderblue", Rgba8::from_hex(b"#b0e0e6")),
    ("rebeccapurple", Rgba8::from_hex(b"#663399")),
    ("rosybrown", Rgba8::from_hex(b"#bc8f8f")),
    ("royalblue", Rgba8::from_hex(b"#4169e1")),
    ("saddlebrown", Rgba8::from_hex(b"#8b4513")),
    ("salmon", Rgba8::from_hex(b"#fa8072")),
    ("sandybrown", Rgba8::from_hex(b"#f4a460")),
    ("seagreen", Rgba8::from_hex(b"#2e8b57")),
    ("seashell", Rgba8::from_hex(b"#fff5ee")),
    ("sienna", Rgba8::from_hex(b"#a0522d")),
    ("skyblue", Rgba8::from_hex(b"#87ceeb")),
    ("slateblue", Rgba8::from_hex(b"#6a5acd")),
    ("slategray", Rgba8::from_hex(b"#708090")),
    ("slategrey", Rgba8::from_hex(b"#708090")),
    ("snow", Rgba8::from_hex(b"#fffafa")),
    ("springgreen", Rgba8::from_hex(b"#00ff7f")),
    ("steelblue", Rgba8::from_hex(b"#4682b4")),
    ("tan", Rgba8::from_hex(b"#d2b48c")),
    ("thistle", Rgba8::from_hex(b"#d8bfd8")),
    ("tomato", Rgba8::from_hex(b"#ff6347")),
    ("turquoise", Rgba8::from_hex(b"#40e0d0")),
    ("violet", Rgba8::from_hex(b"#ee82ee")),
    ("wheat", Rgba8::from_hex(b"#f5deb3")),
    ("whitesmoke", Rgba8::from_hex(b"#f5f5f5")),
    ("yellowgreen", Rgba8::from_hex(b"#9acd32")),
];

/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: rgba(0,0,0,0);"></div>
pub const TRANSPARENT: Rgba8 = Rgba8::new(0, 0, 0, 0);

/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #000000;"></div>
pub const BLACK: Rgba8 = Rgba8::from_hex(b"#000000");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #c0c0c0;"></div>
pub const SILVER: Rgba8 = Rgba8::from_hex(b"#c0c0c0");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #808080;"></div>
pub const GRAY: Rgba8 = Rgba8::from_hex(b"#808080");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffffff;"></div>
pub const WHITE: Rgba8 = Rgba8::from_hex(b"#ffffff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #800000;"></div>
pub const MAROON: Rgba8 = Rgba8::from_hex(b"#800000");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff0000;"></div>
pub const RED: Rgba8 = Rgba8::from_hex(b"#ff0000");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #800080;"></div>
pub const PURPLE: Rgba8 = Rgba8::from_hex(b"#800080");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff00ff;"></div>
pub const FUCHSIA: Rgba8 = Rgba8::from_hex(b"#ff00ff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #008000;"></div>
pub const GREEN: Rgba8 = Rgba8::from_hex(b"#008000");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #00ff00;"></div>
pub const LIME: Rgba8 = Rgba8::from_hex(b"#00ff00");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #808000;"></div>
pub const OLIVE: Rgba8 = Rgba8::from_hex(b"#808000");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffff00;"></div>
pub const YELLOW: Rgba8 = Rgba8::from_hex(b"#ffff00");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #000080;"></div>
pub const NAVY: Rgba8 = Rgba8::from_hex(b"#000080");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #0000ff;"></div>
pub const BLUE: Rgba8 = Rgba8::from_hex(b"#0000ff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #008080;"></div>
pub const TEAL: Rgba8 = Rgba8::from_hex(b"#008080");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #00ffff;"></div>
pub const AQUA: Rgba8 = Rgba8::from_hex(b"#00ffff");

// other named colors
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f0f8ff;"></div>
pub const ALICEBLUE: Rgba8 = Rgba8::from_hex(b"#f0f8ff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #faebd7;"></div>
pub const ANTIQUEWHITE: Rgba8 = Rgba8::from_hex(b"#faebd7");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #7fffd4;"></div>
pub const AQUAMARINE: Rgba8 = Rgba8::from_hex(b"#7fffd4");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f0ffff;"></div>
pub const AZURE: Rgba8 = Rgba8::from_hex(b"#f0ffff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f5f5dc;"></div>
pub const BEIGE: Rgba8 = Rgba8::from_hex(b"#f5f5dc");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffe4c4;"></div>
pub const BISQUE: Rgba8 = Rgba8::from_hex(b"#ffe4c4");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffebcd;"></div>
pub const BLANCHEDALMOND: Rgba8 = Rgba8::from_hex(b"#ffebcd");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #8a2be2;"></div>
pub const BLUEVIOLET: Rgba8 = Rgba8::from_hex(b"#8a2be2");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #a52a2a;"></div>
pub const BROWN: Rgba8 = Rgba8::from_hex(b"#a52a2a");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #deb887;"></div>
pub const BURLYWOOD: Rgba8 = Rgba8::from_hex(b"#deb887");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #5f9ea0;"></div>
pub const CADETBLUE: Rgba8 = Rgba8::from_hex(b"#5f9ea0");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #7fff00;"></div>
pub const CHARTREUSE: Rgba8 = Rgba8::from_hex(b"#7fff00");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #d2691e;"></div>
pub const CHOCOLATE: Rgba8 = Rgba8::from_hex(b"#d2691e");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff7f50;"></div>
pub const CORAL: Rgba8 = Rgba8::from_hex(b"#ff7f50");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #6495ed;"></div>
pub const CORNFLOWERBLUE: Rgba8 = Rgba8::from_hex(b"#6495ed");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fff8dc;"></div>
pub const CORNSILK: Rgba8 = Rgba8::from_hex(b"#fff8dc");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #dc143c;"></div>
pub const CRIMSON: Rgba8 = Rgba8::from_hex(b"#dc143c");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #00ffff;"></div>
pub const CYAN: Rgba8 = AQUA;
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #00008b;"></div>
pub const DARKBLUE: Rgba8 = Rgba8::from_hex(b"#00008b");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #008b8b;"></div>
pub const DARKCYAN: Rgba8 = Rgba8::from_hex(b"#008b8b");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #b8860b;"></div>
pub const DARKGOLDENROD: Rgba8 = Rgba8::from_hex(b"#b8860b");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #a9a9a9;"></div>
pub const DARKGRAY: Rgba8 = Rgba8::from_hex(b"#a9a9a9");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #006400;"></div>
pub const DARKGREEN: Rgba8 = Rgba8::from_hex(b"#006400");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #a9a9a9;"></div>
pub const DARKGREY: Rgba8 = Rgba8::from_hex(b"#a9a9a9");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #bdb76b;"></div>
pub const DARKKHAKI: Rgba8 = Rgba8::from_hex(b"#bdb76b");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #8b008b;"></div>
pub const DARKMAGENTA: Rgba8 = Rgba8::from_hex(b"#8b008b");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #556b2f;"></div>
pub const DARKOLIVEGREEN: Rgba8 = Rgba8::from_hex(b"#556b2f");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff8c00;"></div>
pub const DARKORANGE: Rgba8 = Rgba8::from_hex(b"#ff8c00");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #9932cc;"></div>
pub const DARKORCHID: Rgba8 = Rgba8::from_hex(b"#9932cc");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #8b0000;"></div>
pub const DARKRED: Rgba8 = Rgba8::from_hex(b"#8b0000");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #e9967a;"></div>
pub const DARKSALMON: Rgba8 = Rgba8::from_hex(b"#e9967a");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #8fbc8f;"></div>
pub const DARKSEAGREEN: Rgba8 = Rgba8::from_hex(b"#8fbc8f");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #483d8b;"></div>
pub const DARKSLATEBLUE: Rgba8 = Rgba8::from_hex(b"#483d8b");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #2f4f4f;"></div>
pub const DARKSLATEGRAY: Rgba8 = Rgba8::from_hex(b"#2f4f4f");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #2f4f4f;"></div>
pub const DARKSLATEGREY: Rgba8 = Rgba8::from_hex(b"#2f4f4f");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #00ced1;"></div>
pub const DARKTURQUOISE: Rgba8 = Rgba8::from_hex(b"#00ced1");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #9400d3;"></div>
pub const DARKVIOLET: Rgba8 = Rgba8::from_hex(b"#9400d3");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff1493;"></div>
pub const DEEPPINK: Rgba8 = Rgba8::from_hex(b"#ff1493");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #00bfff;"></div>
pub const DEEPSKYBLUE: Rgba8 = Rgba8::from_hex(b"#00bfff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #696969;"></div>
pub const DIMGRAY: Rgba8 = Rgba8::from_hex(b"#696969");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #696969;"></div>
pub const DIMGREY: Rgba8 = Rgba8::from_hex(b"#696969");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #1e90ff;"></div>
pub const DODGERBLUE: Rgba8 = Rgba8::from_hex(b"#1e90ff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #b22222;"></div>
pub const FIREBRICK: Rgba8 = Rgba8::from_hex(b"#b22222");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fffaf0;"></div>
pub const FLORALWHITE: Rgba8 = Rgba8::from_hex(b"#fffaf0");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #228b22;"></div>
pub const FORESTGREEN: Rgba8 = Rgba8::from_hex(b"#228b22");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #dcdcdc;"></div>
pub const GAINSBORO: Rgba8 = Rgba8::from_hex(b"#dcdcdc");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f8f8ff;"></div>
pub const GHOSTWHITE: Rgba8 = Rgba8::from_hex(b"#f8f8ff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffd700;"></div>
pub const GOLD: Rgba8 = Rgba8::from_hex(b"#ffd700");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #daa520;"></div>
pub const GOLDENROD: Rgba8 = Rgba8::from_hex(b"#daa520");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #adff2f;"></div>
pub const GREENYELLOW: Rgba8 = Rgba8::from_hex(b"#adff2f");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #808080;"></div>
pub const GREY: Rgba8 = GRAY;
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f0fff0;"></div>
pub const HONEYDEW: Rgba8 = Rgba8::from_hex(b"#f0fff0");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff69b4;"></div>
pub const HOTPINK: Rgba8 = Rgba8::from_hex(b"#ff69b4");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #cd5c5c;"></div>
pub const INDIANRED: Rgba8 = Rgba8::from_hex(b"#cd5c5c");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #4b0082;"></div>
pub const INDIGO: Rgba8 = Rgba8::from_hex(b"#4b0082");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fffff0;"></div>
pub const IVORY: Rgba8 = Rgba8::from_hex(b"#fffff0");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f0e68c;"></div>
pub const KHAKI: Rgba8 = Rgba8::from_hex(b"#f0e68c");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #e6e6fa;"></div>
pub const LAVENDER: Rgba8 = Rgba8::from_hex(b"#e6e6fa");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fff0f5;"></div>
pub const LAVENDERBLUSH: Rgba8 = Rgba8::from_hex(b"#fff0f5");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #7cfc00;"></div>
pub const LAWNGREEN: Rgba8 = Rgba8::from_hex(b"#7cfc00");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fffacd;"></div>
pub const LEMONCHIFFON: Rgba8 = Rgba8::from_hex(b"#fffacd");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #add8e6;"></div>
pub const LIGHTBLUE: Rgba8 = Rgba8::from_hex(b"#add8e6");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f08080;"></div>
pub const LIGHTCORAL: Rgba8 = Rgba8::from_hex(b"#f08080");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #e0ffff;"></div>
pub const LIGHTCYAN: Rgba8 = Rgba8::from_hex(b"#e0ffff");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fafad2;"></div>
pub const LIGHTGOLDENRODYELLOW: Rgba8 = Rgba8::from_hex(b"#fafad2");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #d3d3d3;"></div>
pub const LIGHTGRAY: Rgba8 = Rgba8::from_hex(b"#d3d3d3");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #90ee90;"></div>
pub const LIGHTGREEN: Rgba8 = Rgba8::from_hex(b"#90ee90");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #d3d3d3;"></div>
pub const LIGHTGREY: Rgba8 = Rgba8::from_hex(b"#d3d3d3");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffb6c1;"></div>
pub const LIGHTPINK: Rgba8 = Rgba8::from_hex(b"#ffb6c1");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffa07a;"></div>
pub const LIGHTSALMON: Rgba8 = Rgba8::from_hex(b"#ffa07a");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #20b2aa;"></div>
pub const LIGHTSEAGREEN: Rgba8 = Rgba8::from_hex(b"#20b2aa");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #87cefa;"></div>
pub const LIGHTSKYBLUE: Rgba8 = Rgba8::from_hex(b"#87cefa");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #778899;"></div>
pub const LIGHTSLATEGRAY: Rgba8 = Rgba8::from_hex(b"#778899");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #778899;"></div>
pub const LIGHTSLATEGREY: Rgba8 = Rgba8::from_hex(b"#778899");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #b0c4de;"></div>
pub const LIGHTSTEELBLUE: Rgba8 = Rgba8::from_hex(b"#b0c4de");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffffe0;"></div>
pub const LIGHTYELLOW: Rgba8 = Rgba8::from_hex(b"#ffffe0");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #32cd32;"></div>
pub const LIMEGREEN: Rgba8 = Rgba8::from_hex(b"#32cd32");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #faf0e6;"></div>
pub const LINEN: Rgba8 = Rgba8::from_hex(b"#faf0e6");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff00ff;"></div>
pub const MAGENTA: Rgba8 = FUCHSIA;
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #66cdaa;"></div>
pub const MEDIUMAQUAMARINE: Rgba8 = Rgba8::from_hex(b"#66cdaa");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #0000cd;"></div>
pub const MEDIUMBLUE: Rgba8 = Rgba8::from_hex(b"#0000cd");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ba55d3;"></div>
pub const MEDIUMORCHID: Rgba8 = Rgba8::from_hex(b"#ba55d3");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #9370db;"></div>
pub const MEDIUMPURPLE: Rgba8 = Rgba8::from_hex(b"#9370db");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #3cb371;"></div>
pub const MEDIUMSEAGREEN: Rgba8 = Rgba8::from_hex(b"#3cb371");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #7b68ee;"></div>
pub const MEDIUMSLATEBLUE: Rgba8 = Rgba8::from_hex(b"#7b68ee");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #00fa9a;"></div>
pub const MEDIUMSPRINGGREEN: Rgba8 = Rgba8::from_hex(b"#00fa9a");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #48d1cc;"></div>
pub const MEDIUMTURQUOISE: Rgba8 = Rgba8::from_hex(b"#48d1cc");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #c71585;"></div>
pub const MEDIUMVIOLETRED: Rgba8 = Rgba8::from_hex(b"#c71585");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #191970;"></div>
pub const MIDNIGHTBLUE: Rgba8 = Rgba8::from_hex(b"#191970");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f5fffa;"></div>
pub const MINTCREAM: Rgba8 = Rgba8::from_hex(b"#f5fffa");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffe4e1;"></div>
pub const MISTYROSE: Rgba8 = Rgba8::from_hex(b"#ffe4e1");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffe4b5;"></div>
pub const MOCCASIN: Rgba8 = Rgba8::from_hex(b"#ffe4b5");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffdead;"></div>
pub const NAVAJOWHITE: Rgba8 = Rgba8::from_hex(b"#ffdead");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fdf5e6;"></div>
pub const OLDLACE: Rgba8 = Rgba8::from_hex(b"#fdf5e6");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #6b8e23;"></div>
pub const OLIVEDRAB: Rgba8 = Rgba8::from_hex(b"#6b8e23");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffa500;"></div>
pub const ORANGE: Rgba8 = Rgba8::from_hex(b"#ffa500");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff4500;"></div>
pub const ORANGERED: Rgba8 = Rgba8::from_hex(b"#ff4500");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #da70d6;"></div>
pub const ORCHID: Rgba8 = Rgba8::from_hex(b"#da70d6");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #eee8aa;"></div>
pub const PALEGOLDENROD: Rgba8 = Rgba8::from_hex(b"#eee8aa");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #98fb98;"></div>
pub const PALEGREEN: Rgba8 = Rgba8::from_hex(b"#98fb98");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #afeeee;"></div>
pub const PALETURQUOISE: Rgba8 = Rgba8::from_hex(b"#afeeee");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #db7093;"></div>
pub const PALEVIOLETRED: Rgba8 = Rgba8::from_hex(b"#db7093");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffefd5;"></div>
pub const PAPAYAWHIP: Rgba8 = Rgba8::from_hex(b"#ffefd5");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffdab9;"></div>
pub const PEACHPUFF: Rgba8 = Rgba8::from_hex(b"#ffdab9");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #cd853f;"></div>
pub const PERU: Rgba8 = Rgba8::from_hex(b"#cd853f");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ffc0cb;"></div>
pub const PINK: Rgba8 = Rgba8::from_hex(b"#ffc0cb");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #dda0dd;"></div>
pub const PLUM: Rgba8 = Rgba8::from_hex(b"#dda0dd");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #b0e0e6;"></div>
pub const POWDERBLUE: Rgba8 = Rgba8::from_hex(b"#b0e0e6");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #663399;"></div>
pub const REBECCAPURPLE: Rgba8 = Rgba8::from_hex(b"#663399");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #bc8f8f;"></div>
pub const ROSYBROWN: Rgba8 = Rgba8::from_hex(b"#bc8f8f");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #4169e1;"></div>
pub const ROYALBLUE: Rgba8 = Rgba8::from_hex(b"#4169e1");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #8b4513;"></div>
pub const SADDLEBROWN: Rgba8 = Rgba8::from_hex(b"#8b4513");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fa8072;"></div>
pub const SALMON: Rgba8 = Rgba8::from_hex(b"#fa8072");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f4a460;"></div>
pub const SANDYBROWN: Rgba8 = Rgba8::from_hex(b"#f4a460");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #2e8b57;"></div>
pub const SEAGREEN: Rgba8 = Rgba8::from_hex(b"#2e8b57");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fff5ee;"></div>
pub const SEASHELL: Rgba8 = Rgba8::from_hex(b"#fff5ee");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #a0522d;"></div>
pub const SIENNA: Rgba8 = Rgba8::from_hex(b"#a0522d");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #87ceeb;"></div>
pub const SKYBLUE: Rgba8 = Rgba8::from_hex(b"#87ceeb");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #6a5acd;"></div>
pub const SLATEBLUE: Rgba8 = Rgba8::from_hex(b"#6a5acd");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #708090;"></div>
pub const SLATEGRAY: Rgba8 = Rgba8::from_hex(b"#708090");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #708090;"></div>
pub const SLATEGREY: Rgba8 = Rgba8::from_hex(b"#708090");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #fffafa;"></div>
pub const SNOW: Rgba8 = Rgba8::from_hex(b"#fffafa");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #00ff7f;"></div>
pub const SPRINGGREEN: Rgba8 = Rgba8::from_hex(b"#00ff7f");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #4682b4;"></div>
pub const STEELBLUE: Rgba8 = Rgba8::from_hex(b"#4682b4");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #d2b48c;"></div>
pub const TAN: Rgba8 = Rgba8::from_hex(b"#d2b48c");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #d8bfd8;"></div>
pub const THISTLE: Rgba8 = Rgba8::from_hex(b"#d8bfd8");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ff6347;"></div>
pub const TOMATO: Rgba8 = Rgba8::from_hex(b"#ff6347");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #40e0d0;"></div>
pub const TURQUOISE: Rgba8 = Rgba8::from_hex(b"#40e0d0");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #ee82ee;"></div>
pub const VIOLET: Rgba8 = Rgba8::from_hex(b"#ee82ee");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f5deb3;"></div>
pub const WHEAT: Rgba8 = Rgba8::from_hex(b"#f5deb3");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #f5f5f5;"></div>
pub const WHITESMOKE: Rgba8 = Rgba8::from_hex(b"#f5f5f5");
/// <div style="display: inline-block; width: 3em; height: 1em; border: 1px solid black; background: #9acd32;"></div>
pub const YELLOWGREEN: Rgba8 = Rgba8::from_hex(b"#9acd32");
