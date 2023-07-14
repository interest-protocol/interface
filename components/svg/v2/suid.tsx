import { FC } from 'react';

import { SVGProps } from '../svg.types';

const SUID: FC<SVGProps & { filled?: boolean }> = ({
  filled,
  maxWidth,
  maxHeight,
  ...props
}) =>
  filled ? (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <path
        d="M36 0H4C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0Z"
        fill="#3898EC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0001 29H19.7731C21.3008 29 22.7767 28.4455 23.9264 27.4394L26.0262 25.6021C27.6356 24.1939 27.718 21.718 26.2059 20.2058C24.8255 18.8254 22.6097 18.7562 21.1458 20.0478L11.0001 29ZM14.9672 27.5H19.7731C20.9375 27.5 22.0623 27.0774 22.9387 26.3106L25.0385 24.4733C25.9948 23.6364 26.0438 22.1651 25.1452 21.2665C24.3249 20.4462 23.0082 20.4051 22.1383 21.1726L14.9672 27.5Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.0001 11H20.227C18.6993 11 17.2235 11.5545 16.0737 12.5606L13.9739 14.3979C12.3645 15.8061 12.2821 18.282 13.7942 19.7942C15.1746 21.1746 17.3905 21.2438 18.8543 19.9522L29.0001 11ZM25.0329 12.5H20.227C19.0626 12.5 17.9378 12.9226 17.0615 13.6894L14.9617 15.5267C14.0053 16.3636 13.9563 17.8349 14.8549 18.7335C15.6752 19.5538 16.992 19.5949 17.8619 18.8274L25.0329 12.5Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.91821e-05 18H8.7731C10.3008 18 11.7767 17.4455 12.9264 16.4394L15.0262 14.6021C16.6356 13.1939 16.718 10.718 15.2059 9.2058C13.8255 7.8254 11.6097 7.7562 10.1458 9.0478L9.91821e-05 18ZM3.9672 16.5H8.7731C9.9375 16.5 11.0623 16.0774 11.9387 15.3106L14.0385 13.4733C14.9948 12.6364 15.0438 11.1651 14.1452 10.2665C13.3249 9.4462 12.0082 9.4051 11.1383 10.1726L3.9672 16.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0001 0H9.227C7.6993 0 6.2235 0.5545 5.0737 1.5606L2.9739 3.3979C1.3645 4.8061 1.2821 7.282 2.7942 8.7942C4.1746 10.1746 6.3905 10.2438 7.8543 8.9522L18.0001 0ZM14.0329 1.5H9.227C8.0626 1.5 6.9378 1.9226 6.0615 2.6894L3.9617 4.5267C3.0053 5.3636 2.9563 6.8349 3.8549 7.7335C4.6752 8.5538 5.992 8.5949 6.8619 7.8274L14.0329 1.5Z"
        fill="currentColor"
      />
    </svg>
  );

export default SUID;