#! /bin/bash


cargo run --example text_line --package plotive-text --features noto-sans
cargo run --example text_rich --package plotive-text --features noto-sans,noto-serif

cargo run --example area -- $@
cargo run --example bars -- $@
cargo run --example gauss -- $@
cargo run --example sine -- $@

cargo run --example bouncing_ball --features time -- $@

cargo run --example bode_rlc --features noto-serif-italic,utils -- $@

cargo run --example multiple_axes --features utils -- $@
cargo run --example subplots --features utils -- $@

cargo run --example bitcoin --features data-csv,time -- $@
cargo run --example iris --features data-csv -- $@
cargo run --example stars --features data-csv -- $@

cargo run --example bode_rlc_dsl --features dsl,noto-serif-italic,utils -- $@

cargo run --example iris_dsl --features data-csv,dsl -- $@

cargo run --example multiple_axes_dsl --features dsl,utils -- $@
cargo run --example subplots_dsl --features dsl,utils -- $@
