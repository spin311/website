import React from "react";

import { IMAGES_URL } from "../../../helpers/images";

type ScreenshotProps = {
  /** `<name>.webp` and `<name>@2x.webp` in public/assets/images. */
  name: string;
  /** Pixel size of `<name>.webp`; the @2x file is twice as large. */
  width: number;
  height: number;
  alt: string;
  caption?: string;
  className?: string;
  /** Rendered width, for picking the 1x or 2x file. Defaults to the full column. */
  sizes?: string;
  isEager?: boolean;
};

// The page column is 80% of the viewport on phones and 40% from 768px up.
const COLUMN_SIZES = "(max-width: 767px) 80vw, 40vw";

function Screenshot({
  name,
  width,
  height,
  alt,
  caption,
  className = "",
  sizes = COLUMN_SIZES,
  isEager = false,
}: ScreenshotProps) {
  return (
    <figure className={`ext-shot ${className}`}>
      <img
        src={`${IMAGES_URL}/${name}.webp`}
        srcSet={`${IMAGES_URL}/${name}.webp ${width}w, ${IMAGES_URL}/${name}@2x.webp ${width * 2}w`}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={isEager ? "eager" : "lazy"}
        decoding="async"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default Screenshot;
