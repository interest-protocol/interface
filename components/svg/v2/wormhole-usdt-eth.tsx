import { FC } from 'react';

import { SVGProps } from '../svg.types';

const WormholeUSDTETH: FC<SVGProps & { filled?: boolean }> = ({
  filled,
  maxWidth,
  maxHeight,
  ...props
}) =>
  filled ? (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 55 49"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 8C4 5.79086 5.79086 4 8 4H40C42.2091 4 44 5.79086 44 8V25.0411C43.6703 25.0139 43.3368 25 43 25C36.3726 25 31 30.3726 31 37C31 39.6124 31.8348 42.0298 33.2521 44H8C5.79086 44 4 42.2091 4 40V8Z"
        fill="#BFDBFE"
      />
      <path
        d="M53 37C53 31.4772 48.5228 27 43 27C37.4772 27 33 31.4772 33 37C33 42.5228 37.4772 47 43 47C48.5228 47 53 42.5228 53 37Z"
        fill="#627EEA"
      />
      <path
        d="M43.4747 29L43.377 29.3323V38.9743L43.4747 39.0718L47.9504 36.4263L43.4747 29Z"
        fill="white"
      />
      <path
        d="M43.4757 29L39 36.4263L43.4757 39.0719V34.392V29Z"
        fill="white"
      />
      <path
        d="M43.475 40.5271L43.4199 40.5942V44.0289L43.475 44.1898L47.9534 37.8828L43.475 40.5271Z"
        fill="white"
      />
      <path
        d="M43.4757 44.1898V40.5271L39 37.8828L43.4757 44.1898Z"
        fill="white"
      />
      <path
        d="M43.4766 39.0724L47.9522 36.4269L43.4766 34.3926V39.0724Z"
        fill="white"
      />
      <path d="M39 36.4269L43.4757 39.0725V34.3926L39 36.4269Z" fill="white" />
      <path
        d="M22.1144 22.8843V19.2157H17.1386V16H31.0429V19.261H26.0671V22.8843H22.1144Z"
        fill="#131316"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 23.2916C15 22.0687 18.9992 21.0723 23.975 21.0723C28.9507 21.0723 32.95 22.0687 32.95 23.2916C32.95 24.5144 28.9507 25.5108 23.975 25.5108C18.9992 25.5108 15 24.5144 15 23.2916ZM32.2058 23.2915C31.8803 22.8386 29.1831 21.4346 23.9748 21.4346C18.7665 21.4346 16.0694 22.7933 15.7439 23.2915C16.0694 23.7444 18.7665 24.4238 23.9748 24.4238C29.2296 24.4238 31.8803 23.7444 32.2058 23.2915Z"
        fill="#131316"
      />
      <path
        d="M26.0683 24.0175V21.4812C25.4172 21.4359 24.7197 21.3906 24.0222 21.3906C23.3711 21.3906 22.7666 21.3906 22.1621 21.4359V23.9722C22.7201 23.9722 23.3711 24.0175 24.0222 24.0175C24.7197 24.0628 25.4172 24.0628 26.0683 24.0175Z"
        fill="#131316"
      />
      <path
        d="M23.9753 25.5125C23.3243 25.5125 22.7197 25.5125 22.1152 25.4672V32.2156H26.0214V25.4219C25.3704 25.4672 24.6728 25.5125 23.9753 25.5125Z"
        fill="#131316"
      />
    </svg>
  ) : (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 55 49"
      fill="none"
      {...props}
    >
      <path
        d="M53 37C53 31.4772 48.5228 27 43 27C37.4772 27 33 31.4772 33 37C33 42.5228 37.4772 47 43 47C48.5228 47 53 42.5228 53 37Z"
        fill="#627EEA"
      />
      <path
        d="M43.4747 29L43.377 29.3323V38.9743L43.4747 39.0718L47.9504 36.4263L43.4747 29Z"
        fill="white"
      />
      <path
        d="M43.4757 29L39 36.4263L43.4757 39.0719V34.392V29Z"
        fill="white"
      />
      <path
        d="M43.475 40.5271L43.4199 40.5942V44.0289L43.475 44.1898L47.9534 37.8828L43.475 40.5271Z"
        fill="white"
      />
      <path
        d="M43.4757 44.1898V40.5271L39 37.8828L43.4757 44.1898Z"
        fill="white"
      />
      <path
        d="M43.4766 39.0724L47.9522 36.4269L43.4766 34.3926V39.0724Z"
        fill="white"
      />
      <path d="M39 36.4269L43.4757 39.0725V34.3926L39 36.4269Z" fill="white" />
      <path
        d="M20.8729 22V16.6711H13V12H35V16.7369H27.1271V22H20.8729Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 22.5001C9 20.5714 15.6839 19 24 19C32.3159 19 39 20.5714 39 22.5001C39 24.4286 32.3159 26 24 26C15.6839 26 9 24.4286 9 22.5001ZM37.7562 22.4999C37.2122 21.7856 32.7043 19.5714 23.9997 19.5714C15.295 19.5714 10.7873 21.7142 10.2433 22.4999C10.7873 23.2142 15.295 24.2857 23.9997 24.2857C32.7821 24.2857 37.2122 23.2142 37.7562 22.4999Z"
        fill="currentColor"
      />
      <path
        d="M27 23.4489V19.6362C25.9999 19.5681 24.9285 19.5 23.8571 19.5C22.857 19.5 21.9285 19.5 21 19.5681V23.3808C21.8571 23.3808 22.857 23.4489 23.8571 23.4489C24.9285 23.517 25.9999 23.517 27 23.4489Z"
        fill="currentColor"
      />
      <path
        d="M23.8571 25.16C22.8572 25.16 21.9285 25.16 21 25.08V37H27V25C26.0001 25.08 24.9285 25.16 23.8571 25.16Z"
        fill="currentColor"
      />
    </svg>
  );

export default WormholeUSDTETH;