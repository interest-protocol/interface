export const getImageSrc = (
  path: string,
  format: 'png' | 'webp',
  breakpoint?: number
): string =>
  `/images/${format == 'webp' ? 'web' : 'min'}/${path}${
    breakpoint && breakpoint != 1 ? `@${breakpoint}x` : ''
  }.${format}`;

export const getImageSrcSet = (path: string, format: 'png' | 'webp'): string =>
  [1, 2, 3]
    .map(
      (breakpoint) =>
        `${getImageSrc(path, format, breakpoint)}${
          breakpoint != 3 ? ` ${breakpoint * 400}w` : ''
        }`
    )
    .join(', ');
