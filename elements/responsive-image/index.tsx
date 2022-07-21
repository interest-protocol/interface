import { FC } from 'react';

import Box from '../box';
import { ResponsiveImageProps } from './responsive-image.types';
import { getImageSrc, getImageSrcSet } from './responsive-image.utils';

const ResponsiveImage: FC<ResponsiveImageProps> = ({
  path,
  alt,
  width,
  height,
  ...props
}) => (
  <Box as="picture" {...props} width="100%" height="100%">
    <source type="image/webp" srcSet={getImageSrcSet(path, 'webp')} />
    <source type="image/png" srcSet={getImageSrcSet(path, 'png')} />
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      src={getImageSrc(path, 'png')}
      width={(width ?? '100%') as string}
      height={(height ?? '') as string}
    />
  </Box>
);

export default ResponsiveImage;
