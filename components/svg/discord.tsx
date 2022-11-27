import { FC } from 'react';

import { SVGProps } from './svg.types';

const Discord: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="0 0 16 12"
    fill="none"
    {...props}
  >
    <path
      d="M13.5447 0.994734C12.5249 0.534315 11.4313 0.195098 10.2879 0.000814994C10.2671 -0.00293462 10.2463 0.00643586 10.2356 0.0251773C10.0949 0.27131 9.93915 0.592411 9.83006 0.844794C8.60027 0.663633 7.37679 0.663633 6.17221 0.844794C6.0631 0.586801 5.90166 0.27131 5.76038 0.0251773C5.74966 0.00706117 5.72886 -0.00230931 5.70803 0.000814994C4.56527 0.194478 3.47171 0.533694 2.45129 0.994734C2.44246 0.998482 2.43488 1.00473 2.42986 1.01285C0.355594 4.06208 -0.212633 7.03635 0.0661201 9.97375C0.0673814 9.98812 0.0755799 10.0019 0.086932 10.0106C1.45547 10.9995 2.78114 11.5999 4.08219 11.9978C4.10301 12.0041 4.12507 11.9966 4.13832 11.9797C4.44608 11.5662 4.72043 11.1301 4.95565 10.6715C4.96953 10.6447 4.95628 10.6128 4.92791 10.6022C4.49275 10.4398 4.0784 10.2417 3.67982 10.0169C3.64829 9.99874 3.64577 9.95437 3.67477 9.93313C3.75865 9.87129 3.84255 9.80694 3.92264 9.74197C3.93713 9.73011 3.95732 9.7276 3.97435 9.7351C6.59286 10.9114 9.4277 10.9114 12.0153 9.7351C12.0323 9.72698 12.0525 9.72949 12.0677 9.74135C12.1478 9.80632 12.2316 9.87129 12.3161 9.93313C12.3451 9.95437 12.3433 9.99874 12.3117 10.0169C11.9131 10.2461 11.4988 10.4398 11.063 10.6016C11.0346 10.6122 11.022 10.6447 11.0359 10.6715C11.2762 11.1295 11.5505 11.5655 11.8526 11.9791C11.8652 11.9966 11.8879 12.0041 11.9087 11.9978C13.2161 11.5999 14.5417 10.9995 15.9103 10.0106C15.9223 10.0019 15.9298 9.98874 15.9311 9.97438C16.2647 6.57842 15.3723 3.62853 13.5655 1.01347C13.5611 1.00473 13.5535 0.998482 13.5447 0.994734ZM5.34668 8.18518C4.55833 8.18518 3.90876 7.47302 3.90876 6.59842C3.90876 5.72381 4.54574 5.01165 5.34668 5.01165C6.15392 5.01165 6.79721 5.73006 6.78459 6.59842C6.78459 7.47302 6.14761 8.18518 5.34668 8.18518ZM10.6632 8.18518C9.87484 8.18518 9.22526 7.47302 9.22526 6.59842C9.22526 5.72381 9.86222 5.01165 10.6632 5.01165C11.4704 5.01165 12.1137 5.73006 12.1011 6.59842C12.1011 7.47302 11.4704 8.18518 10.6632 8.18518Z"
      fill="currentColor"
    />
  </svg>
);

export default Discord;
