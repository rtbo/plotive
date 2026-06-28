#! /bin/bash

if [ $# -eq 0 ]; then
    echo "No output format specified, defaulting to png"
    set -- png
fi

cargo run --example text_line --package plotive-text --features noto-sans
cargo run --example text_rich --package plotive-text --features noto-sans,noto-serif

# passing all needed feature to each example to avoid unnecessary recompilation
features="data-csv,dsl,noto-sans,noto-serif-italic,serde,time,utils"

cargo run --example area --features $features -- $@
cargo run --example bars --features $features -- $@
cargo run --example bitcoin --features $features -- $@
cargo run --example bode_rlc --features $features -- $@
cargo run --example bode_rlc_dsl --features $features -- $@
cargo run --example bouncing_ball --features $features -- $@
cargo run --example gauss --features $features -- $@
cargo run --example iris --features $features -- $@
cargo run --example iris_dsl --features $features -- $@
cargo run --example minimal --features $features -- $@
cargo run --example multiple_axes --features $features -- $@
cargo run --example multiple_axes_dsl --features $features -- $@
cargo run --example sine --features $features -- $@
cargo run --example stars --features $features -- $@
cargo run --example subplots --features $features -- $@
cargo run --example subplots_dsl --features $features -- $@
