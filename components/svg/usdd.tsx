import { FC } from 'react';

import { SVGProps } from './svg.types';

const USDD: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="0 0 42 42"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_89_23)">
      <path
        d="M21 0C32.6 0 42 9.4 42 21C42 32.6 32.6 42 21 42C9.4 42 0 32.6 0 21C0 9.4 9.4 0 21 0Z"
        fill="white"
      />
      <path
        d="M20.9999 40.5999C31.8247 40.5999 40.5999 31.8247 40.5999 20.9999C40.5999 10.1751 31.8247 1.3999 20.9999 1.3999C10.1751 1.3999 1.3999 10.1751 1.3999 20.9999C1.3999 31.8247 10.1751 40.5999 20.9999 40.5999Z"
        fill="#216C58"
        stroke="#216C58"
        strokeWidth="0.7"
      />
      <path
        d="M39.1998 20.9998C39.1998 31.0998 31.0998 39.1998 20.9998 39.1998C10.8998 39.1998 2.7998 31.0998 2.7998 20.9998C2.7998 10.8998 10.8998 2.7998 20.9998 2.7998C31.0998 2.7998 39.1998 10.8998 39.1998 20.9998Z"
        fill="#216C58"
      />
      <path d="M20.6 29.7998H18.5V31.8998H20.6V29.7998Z" fill="#216C58" />
      <path d="M24.1 29.7998H22V31.8998H24.1V29.7998Z" fill="#216C58" />
      <path
        d="M14.9998 8H28.2998C28.6998 8 28.9998 8.4 28.9998 8.7V9.1C28.9998 9.5 28.6998 9.8 28.2998 9.8H14.9998C14.5998 9.8 14.2998 9.5 14.2998 9.1V8.7C14.2998 8.4 14.6998 8 14.9998 8Z"
        fill="white"
      />
      <path
        d="M21.0002 10.5V34.3C21.0002 34.7 20.7002 35 20.3002 35H19.9002C19.5002 35 19.2002 34.7 19.2002 34.3V10.5H21.0002Z"
        fill="white"
      />
      <path
        d="M23.8 10.5V34.3C23.8 34.7 23.5 35 23.1 35H22.7C22.3 35 22 34.7 22 34.3V10.5H23.8Z"
        fill="white"
      />
      <path
        d="M19.5001 16.3999C20.0001 16.1999 20.6001 16.0999 21.4001 16.0999C22.5001 16.0999 23.3001 16.2999 23.9001 16.6999C24.3001 16.9999 24.6001 17.2999 24.8001 17.7999C25.0001 18.1999 25.3001 18.5999 25.9001 18.5999H29.1001C29.7001 18.5999 30.2001 18.0999 30.1001 17.4999C30.0001 16.4999 29.6001 15.6999 29.0001 14.8999C28.3001 13.8999 27.2001 13.1999 25.9001 12.6999C24.6001 12.1999 23.1001 11.8999 21.4001 11.8999C19.7001 11.8999 18.2001 12.1999 16.9001 12.6999C15.6001 13.1999 14.5001 13.9999 13.7001 14.8999C12.9001 15.8999 12.5001 16.9999 12.5001 18.2999C12.5001 19.8999 13.1001 21.1999 14.3001 22.0999C15.5001 22.9999 17.0001 23.6999 18.9001 24.0999L21.4001 24.5999C22.2001 24.7999 22.9001 24.9999 23.4001 25.1999C23.9001 25.3999 24.3001 25.5999 24.6001 25.8999C24.8001 26.0999 25.0001 26.3999 25.0001 26.7999C25.0001 27.1999 24.9001 27.4999 24.6001 27.8999C24.3001 28.1999 23.9001 28.4999 23.3001 28.6999C22.8001 28.8999 22.1001 28.9999 21.3001 28.9999C20.5001 28.9999 19.8001 28.8999 19.2001 28.6999C18.6001 28.4999 18.1001 28.1999 17.8001 27.7999C17.6001 27.4999 17.4001 27.1999 17.3001 26.8999C17.2001 26.3999 16.8001 25.9999 16.2001 25.9999H13.0001C12.4001 25.9999 11.9001 26.4999 12.0001 27.0999C12.1001 28.2999 12.5001 29.2999 13.2001 30.1999C14.0001 31.1999 15.1001 31.9999 16.5001 32.4999C17.9001 32.9999 19.5001 33.2999 21.4001 33.2999C23.3001 33.2999 24.9001 33.0999 26.2001 32.4999C27.6001 31.9999 28.6001 31.2999 29.3001 30.2999C30.0001 29.2999 30.4001 28.1999 30.4001 26.8999C30.4001 25.9999 30.2001 25.1999 29.8001 24.4999C29.4001 23.7999 28.9001 23.1999 28.3001 22.6999C27.7001 22.1999 26.9001 21.7999 26.1001 21.3999C25.3001 21.0999 24.3001 20.7999 23.3001 20.5999L21.3001 20.1999C20.8001 20.0999 20.4001 19.9999 20.0001 19.8999C19.6001 19.7999 19.2001 19.5999 18.9001 19.3999C18.6001 19.1999 18.4001 18.9999 18.2001 18.7999C18.1001 18.5999 18.0001 18.3999 18.0001 18.0999C18.0001 17.7999 18.1001 17.3999 18.3001 17.1999C18.7001 16.7999 19.0001 16.5999 19.5001 16.3999Z"
        fill="white"
        stroke="#216C58"
        strokeWidth="0.7"
      />
      <path
        d="M21.0002 15.1001H19.2002V17.5001H21.0002V15.1001Z"
        fill="white"
      />
      <path
        d="M21.0002 23.7998H19.2002V26.2998H21.0002V23.7998Z"
        fill="white"
      />
      <path
        d="M21.0002 31.1001H19.2002V33.5001H21.0002V31.1001Z"
        fill="white"
      />
      <path
        d="M23.9001 15.1001H22.1001V17.5001H23.9001V15.1001Z"
        fill="white"
      />
      <path
        d="M23.9001 23.7998H22.1001V26.2998H23.9001V23.7998Z"
        fill="white"
      />
      <path
        d="M23.9001 31.1001H22.1001V33.5001H23.9001V31.1001Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.6 21.9998C38.3 21.9998 38.1 22.1998 38.1 22.4998C37.3 31.2998 30 38.1998 21 38.1998C12 38.1998 4.69999 31.2998 3.89999 22.4998C3.89999 22.1998 3.59999 21.9998 3.39999 21.9998C3.09999 21.9998 2.89999 22.2998 2.89999 22.5998C3.69999 31.8998 11.5 39.1998 21 39.1998C30.5 39.1998 38.3 31.8998 39.1 22.5998C39.2 22.2998 38.9 21.9998 38.6 21.9998ZM3.39999 19.9998C3.69999 19.9998 3.89999 19.7998 3.89999 19.4998C4.69999 10.6998 12 3.8998 21 3.8998C30 3.8998 37.3 10.7998 38.1 19.4998C38.1 19.7998 38.4 19.9998 38.6 19.9998C38.9 19.9998 39.1 19.6998 39.1 19.3998C38.3 10.0998 30.5 2.7998 21 2.7998C11.5 2.7998 3.69999 10.0998 2.89999 19.3998C2.79999 19.6998 3.09999 19.9998 3.39999 19.9998Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_89_23">
        <rect width="42" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default USDD;
