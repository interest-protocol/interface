import { FC } from 'react';

import { SVGProps } from '../svg.types';

const ClockWise: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 21 20"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.272 4.22527C9.41434 3.75237 10.6713 3.6289 11.8838 3.87047C13.0957 4.11191 14.2088 4.70718 15.0824 5.58101L15.0838 5.58239L16.6448 7.16431H14.4322V8.41431H18.1822L18.8072 7.78931V4.03931H17.5572V6.30932L15.9708 4.70164L15.9708 4.70163L15.9681 4.69887C14.9194 3.64936 13.5831 2.93445 12.128 2.64456C10.673 2.35468 9.16469 2.50284 7.79389 3.07032C6.42308 3.6378 5.25138 4.59909 4.427 5.83259C3.60262 7.06609 3.1626 8.51638 3.1626 10C3.1626 11.4836 3.60262 12.9339 4.427 14.1674C5.25138 15.4009 6.42308 16.3622 7.79389 16.9297C9.16469 17.4972 10.673 17.6453 12.128 17.3554C13.5831 17.0656 14.9194 16.3506 15.9681 15.3011L16.4098 14.859L15.5256 13.9755L15.0838 14.4176C14.2099 15.2922 13.0963 15.888 11.8838 16.1295C10.6713 16.3711 9.41434 16.2476 8.272 15.7747C7.12967 15.3018 6.15325 14.5008 5.46627 13.4728C4.77928 12.4449 4.4126 11.2364 4.4126 10C4.4126 8.76365 4.77928 7.55508 5.46627 6.52716C6.15325 5.49924 7.12967 4.69817 8.272 4.22527ZM11.2916 9.63911V5.625H10.0416V9.98975C10.0412 10.0113 10.042 10.0327 10.0439 10.054C10.0515 10.1429 10.0777 10.2264 10.1185 10.3007C10.1683 10.3916 10.2413 10.4713 10.3348 10.5298C10.343 10.5349 10.3514 10.5399 10.3598 10.5447L14.1456 12.7288L14.7703 11.6461L11.2916 9.63911Z"
      fill="currentColor"
    />
  </svg>
);

export default ClockWise;