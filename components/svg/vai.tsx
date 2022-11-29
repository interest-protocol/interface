import { FC } from 'react';

import { SVGProps } from './svg.types';

const Vai: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 65 64"
    fill="none"
    {...props}
  >
    <path
      d="M32.0313 63.8889C49.7227 63.8889 64.0625 49.588 64.0625 31.9444C64.0625 14.3004 49.7227 0 32.0313 0C14.3392 0 0 14.3004 0 31.9444C0 49.588 14.3392 63.8889 32.0313 63.8889Z"
      fill="#74BB59"
    />
    <path
      d="M15.6858 30.0423H48.3769C49.4687 30.0381 50.3522 29.1575 50.3559 28.0685C50.3522 26.9833 49.4687 26.1022 48.3769 26.0984H43.3227L47.3986 15.3633C47.7816 14.3457 47.2696 13.2084 46.2498 12.8222C45.2298 12.4408 44.0885 12.9508 43.7019 13.9685L39.095 26.0984H23.7353L19.1285 13.9685C18.7386 12.9508 17.6006 12.4408 16.5807 12.8222C15.5603 13.2084 15.0489 14.3457 15.4314 15.3633L19.5083 26.0984H15.6858C14.5977 26.1022 13.7143 26.9833 13.7105 28.0685C13.7142 29.1575 14.5976 30.0381 15.6858 30.0423ZM31.4128 46.3247L28.1265 37.6654H34.7005L31.4128 46.3247ZM48.3769 33.7217H15.6858C14.5976 33.7254 13.7143 34.6064 13.7104 35.6955C13.7104 36.7806 14.5939 37.6617 15.6858 37.6654H23.8984L29.4641 52.3256C29.7716 53.1234 30.5597 53.6377 31.4171 53.5923C32.274 53.6376 33.0589 53.1234 33.366 52.3256L38.9321 37.6654H48.3769C49.4687 37.6617 50.3522 36.7806 50.3559 35.6955C50.3522 34.6064 49.4687 33.7253 48.3769 33.7217Z"
      fill="white"
    />
  </svg>
);

export default Vai;
