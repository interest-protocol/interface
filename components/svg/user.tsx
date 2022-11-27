import { FC } from 'react';

import { SVGProps } from './svg.types';

const User: FC<SVGProps> = ({ maxSize, ...props }) => (
  <svg
    style={{ maxWidth: maxSize, maxHeight: maxSize }}
    viewBox="0 0 473.931 473.931"
    {...props}
  >
    <circle fill="#A3D5E0" cx="236.966" cy="236.966" r="236.966" />
    <path
      fill="#CEA272"
      d="M274.054,296.991c-1.205,14.6-15.091,24.722-31.001,22.611l0,0  c-15.925-2.118-27.85-15.671-26.638-30.275l5.059-61.152c1.201-14.6,15.083-24.729,31.001-22.611l0,0  c15.925,2.107,27.842,15.663,26.638,30.263L274.054,296.991z"
    />
    <path
      fill="#D6A972"
      d="M296.493,214.755c2.137,24.621-17.654,44.815-44.201,45.114l0,0  c-26.559,0.299-49.807-19.416-51.947-44.041l-8.932-103.112c-2.137-24.613,17.657-44.815,44.205-45.111l0,0  c26.552-0.296,49.803,19.412,51.939,44.037L296.493,214.755z"
    />
    <path
      fill="#8B401E"
      d="M185.973,115.598c0,0,5.205,69.193,10.29,53.552c27.824-85.466,108.055-50.764,111.014-60.961  l-19.655-2.791c0,0,20.22-5.474,21.347-15.229C308.972,90.165,195.155,26.892,185.973,115.598z"
    />
    <path
      fill="#C4C3B7"
      d="M232.169,473.812c1.598,0.03,3.177,0.12,4.778,0.12c21.609,0,42.518-2.948,62.413-8.363   l-25.93-184.626l-56.901,9.77L232.169,473.812z"
    />
    <polygon
      fill="#C4C3B7"
      points="160.48,305.335 160.888,305.264 204.251,292.819 199.357,293.661  "
    />
    <polygon
      fill="#7F807D"
      points="204.251,292.819 216.528,290.716 216.412,289.332  "
    />
    <polygon
      fill="#7F807D"
      points="157.034,306.368 160.888,305.264 160.48,305.335  "
    />
    <path
      fill="#7F807D"
      d="M204.251,292.819l-43.363,12.445l-3.854,1.104l3.446-1.033l-21.081,3.678L95.763,427.275   c11.435,8.498,23.667,15.962,36.553,22.316l26.892-83.172l0.307,8.498l-0.962,85.671c23.117,8.101,47.861,12.707,73.619,13.216   l-15.641-183.099L204.251,292.819z"
    />
    <path
      fill="#7F807D"
      d="M405.008,404.013L361.604,271.94l-56.433,6.357l0.019,0.045l-31.756,2.601l25.93,184.626   c14.503-3.955,28.452-9.216,41.706-15.712l-6.93-103.684l36.796,86.233C383.167,424.001,394.576,414.501,405.008,404.013z"
    />
    <path
      fill="#A2A29B"
      d="M252.868,320.92c0.172,1.175,10.862,74.858,15.764,150.842c1.235-0.165,2.485-0.288,3.712-0.471  c-4.917-76.122-15.599-149.741-15.772-150.913L252.868,320.92z"
    />
  </svg>
);

export default User;
