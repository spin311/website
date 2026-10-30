import { ImageType } from "../types/ComponentTypes";

export const IMAGES_URL = `${import.meta.env.PUBLIC_URL ?? ""}/assets/images`;

/**
 * An image exported by scripts/optimize-image.sh: `<name>.webp` at the size it is
 * displayed and `<name>@2x.webp` for high-DPI screens.
 */
export function retinaImage(
  name: string,
  width: number,
  height: number,
): ImageType {
  return {
    src: `${IMAGES_URL}/${name}.webp`,
    srcSet: `${IMAGES_URL}/${name}.webp 1x, ${IMAGES_URL}/${name}@2x.webp 2x`,
    width,
    height,
  };
}
