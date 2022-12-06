import { FC } from 'react';

import { SVGProps } from './svg.types';

const Earn: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
    viewBox="0 0 28 28"
    {...props}
  >
    <path
      d="M18.3341 12.5561V12.5706M4.13989 8.76892C3.50638 8.28201 3.01982 7.62943 2.734 6.88329C2.44818 6.13715 2.37422 5.32651 2.52031 4.54097C2.66639 3.75542 3.02683 3.02557 3.56178 2.43206C4.09673 1.83856 4.78536 1.40452 5.55156 1.17792C6.31777 0.951313 7.13171 0.940971 7.90342 1.14803C8.67514 1.35509 9.37458 1.7715 9.92444 2.35122C10.4743 2.93094 10.8532 3.6514 11.0192 4.43298C11.1852 5.21455 11.1318 6.02681 10.865 6.77997"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.7787 2.44531V7.93839C21.5663 8.97276 22.9273 10.6097 23.6179 12.5561H25.5548C25.9379 12.5561 26.3053 12.7083 26.5762 12.9792C26.8471 13.2501 26.9992 13.6175 26.9992 14.0006V16.8894C26.9992 17.2724 26.8471 17.6398 26.5762 17.9107C26.3053 18.1816 25.9379 18.3338 25.5548 18.3338H23.6165C23.1311 19.706 22.3064 20.9337 21.2216 21.9058V24.8336C21.2216 25.4082 20.9934 25.9593 20.587 26.3656C20.1807 26.7719 19.6296 27.0002 19.055 27.0002C18.4804 27.0002 17.9293 26.7719 17.523 26.3656C17.1167 25.9593 16.8884 25.4082 16.8884 24.8336V23.9915C16.4111 24.0715 15.928 24.1116 15.444 24.1114H9.66638C9.18242 24.1116 8.69929 24.0715 8.22198 23.9915V24.8336C8.22198 25.4082 7.99371 25.9593 7.58739 26.3656C7.18108 26.7719 6.62999 27.0002 6.05537 27.0002C5.48075 27.0002 4.92967 26.7719 4.52335 26.3656C4.11703 25.9593 3.88876 25.4082 3.88876 24.8336V21.9448L3.89021 21.9058C2.58161 20.7359 1.65913 19.1961 1.24484 17.4904C0.830552 15.7847 0.943993 13.9933 1.57015 12.3535C2.19631 10.7136 3.30566 9.30259 4.75139 8.30708C6.19712 7.31157 7.91106 6.77854 9.66638 6.77853H13.2774L19.7772 2.44531H19.7787Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Earn;
