#!/usr/bin/env bash
# Exports an image to public/assets/images as <name>.webp at the size it is displayed
# and <name>@2x.webp at twice that, for use with retinaImage() in src/helpers/images.ts.
# Needs cwebp (brew install webp). If the source is smaller than 2x, the 2x copy is
# upscaled: export it by hand at the source size instead.
#
# Usage: scripts/optimize-image.sh <source-image> <name> <display-width> <display-height>
set -euo pipefail

if [ $# -ne 4 ]; then
  echo "Usage: $0 <source-image> <name> <display-width> <display-height>" >&2
  exit 1
fi

input=$1 name=$2 width=$3 height=$4
out_dir="$(dirname "$0")/../public/assets/images"
options=(-quiet -q 82 -m 6 -sharp_yuv)

cwebp "${options[@]}" -resize "$width" "$height" "$input" -o "$out_dir/$name.webp"
cwebp "${options[@]}" -resize $((width * 2)) $((height * 2)) "$input" -o "$out_dir/$name@2x.webp"
echo "Wrote $out_dir/$name.webp and $out_dir/$name@2x.webp"
