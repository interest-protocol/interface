import { FC, SVGAttributes } from 'react';
import { v4 } from 'uuid';

const id = v4();

const UniSwap: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="17 17 86 86" fill="none" {...props}>
    <path
      d="M90 30C106.569 46.5685 106.569 73.4315 90 90V90C73.4315 106.569 46.5685 106.569 30 90V90C13.4315 73.4315 13.4315 46.5685 30 30V30C46.5685 13.4315 73.4315 13.4315 90 30V30Z"
      fill={`url(#${id})`}
    />
    <path
      d="M53.2001 43.0999C52.7001 42.9999 52.7001 42.9999 52.9001 42.9999C53.4001 42.8999 54.5001 42.9999 55.3001 43.1999C57.1001 43.5999 58.7001 44.6999 60.5001 46.5999L61.0001 47.0999L61.7001 46.9999C64.5001 46.5999 67.3001 46.8999 69.7001 47.9999C70.4001 48.2999 71.4001 48.8999 71.5001 48.9999C71.5001 48.9999 71.6001 49.3999 71.7001 49.6999C71.9001 50.8999 71.8001 51.7999 71.4001 52.3999C71.2001 52.7999 71.2001 52.8999 71.3001 53.1999C71.4001 53.3999 71.7001 53.5999 72.0001 53.5999C72.6001 53.5999 73.2001 52.6999 73.5001 51.2999L73.6001 50.7999L73.8001 51.0999C75.1001 52.4999 76.1001 54.4999 76.2001 55.8999V56.2999L76.0001 55.8999C75.6001 55.2999 75.3001 54.8999 74.8001 54.5999C73.9001 53.9999 73.0001 53.7999 70.7001 53.6999C68.5001 53.5999 67.3001 53.3999 66.1001 52.9999C64.0001 52.2999 63.0001 51.3999 60.6001 48.2999C59.5001 46.8999 58.8001 46.0999 58.2001 45.4999C56.6001 44.0999 55.1001 43.3999 53.2001 43.0999Z"
      fill="#FF007A"
    />
    <path
      d="M71.8002 46.2C71.9002 45.3 72.0002 44.5999 72.2002 44.0999C72.3002 43.8999 72.4002 43.7 72.4002 43.7C72.4002 43.7 72.4002 43.8999 72.3002 44.0999C72.1002 44.6999 72.1002 45.3999 72.2002 46.2999C72.4002 47.3999 72.5002 47.5999 73.6002 48.7999C74.2002 49.3999 74.8002 50.1 75.0002 50.4L75.4002 51L75.0002 50.5999C74.5002 50.0999 73.3002 49.2 73.0002 49C72.8002 48.9 72.8002 48.9 72.7002 49C72.6002 49.1 72.6002 49.3 72.6002 50C72.6002 51.1 72.4002 51.8 72.1002 52.5C71.9002 52.9 71.9002 52.8 72.0002 52.4C72.1002 52.1 72.1002 51.9 72.1002 50.9C72.1002 48.7 71.8002 48.1999 70.3002 47.2999C69.9002 47.0999 69.3002 46.7999 68.9002 46.5999C68.5002 46.3999 68.2002 46.2999 68.2002 46.2999C68.2002 46.2999 69.7002 46.7 70.3002 46.9C71.2002 47.2 71.3002 47.3 71.4002 47.2C71.8002 47 71.8002 46.8 71.8002 46.2Z"
      fill="#FF007A"
    />
    <path
      d="M54.2001 49.9C53.1001 48.4 52.5001 46.2 52.6001 44.6V44.1H52.8001C53.3001 44.2 54.0001 44.5 54.4001 44.7C55.4001 45.3 55.8001 46.1 56.3001 48.2C56.4001 48.8 56.6001 49.5 56.7001 49.7C56.8001 50.1 57.3001 50.9 57.7001 51.5C58.0001 51.9 57.8001 52.1 57.2001 52C56.3001 51.9 55.0001 51 54.2001 49.9Z"
      fill="#FF007A"
    />
    <path
      d="M70.5 60.6999C65.5 58.6999 63.8 56.9999 63.8 54.0999C63.8 53.6999 63.8 53.2999 63.8 53.2999C63.8 53.2999 64 53.3999 64.2 53.5999C65.2 54.3999 66.3 54.6999 69.5 55.1999C71.3 55.4999 72.4001 55.6999 73.3001 55.9999C76.3001 56.9999 78.2 58.9999 78.7 61.7999C78.8 62.5999 78.8 64.0999 78.5 64.8999C78.3 65.4999 77.8 66.6999 77.7 66.6999C77.7 66.6999 77.6 66.5999 77.6 66.3999C77.5 65.3999 77 64.3999 76.1 63.5999C75.2 62.6999 73.9 62.0999 70.5 60.6999Z"
      fill="#FF007A"
    />
    <path
      d="M67.1001 61.5999C67.0001 61.1999 66.9001 60.7999 66.9001 60.5999L66.8001 60.2L67.0001 60.5C67.3001 60.9 67.6001 61.3 67.8001 61.9C68.0001 62.4 68.0001 62.4999 68.0001 63.2999C68.0001 64.0999 68.0001 64.1999 67.8001 64.5999C67.6001 65.2999 67.3001 65.7 66.8001 66.3C65.9001 67.2 64.7001 67.7 63.0001 67.9C62.7001 67.9 61.9001 68 61.1001 68C59.2001 68.1 58.0001 68.2999 56.9001 68.6999C56.7001 68.7999 56.6001 68.8 56.6001 68.8C56.6001 68.8 57.3001 68.3 57.9001 68C58.8001 67.6 59.7001 67.3 61.6001 67C62.6001 66.8 63.6001 66.5999 63.8001 66.5999C66.2001 65.7999 67.5001 63.8999 67.1001 61.5999Z"
      fill="#FF007A"
    />
    <path
      d="M69.3002 65.6C68.6002 64.2 68.5002 62.8 68.9002 61.6C68.9002 61.5 69.0002 61.4 69.0002 61.4C69.0002 61.4 69.2002 61.5 69.3002 61.6C69.6002 61.8 70.2002 62.1 71.8002 63C73.8002 64.1 75.0002 64.9 75.8002 65.9C76.5002 66.8 76.9002 67.7 77.1002 68.9C77.2002 69.6 77.1002 71.2 77.0002 71.9C76.5002 74 75.2002 75.7 73.4002 76.7C73.1002 76.8 72.9002 77 72.9002 77C72.9002 77 73.0002 76.8 73.1002 76.5C73.7002 75.2 73.8002 74 73.3002 72.6C73.0002 71.8 72.4002 70.7 71.3002 69C70.0002 66.8 69.7002 66.3 69.3002 65.6Z"
      fill="#FF007A"
    />
    <path
      d="M50.7001 73.2C52.5001 71.7 54.8001 70.6 56.9001 70.2C57.8001 70.1 59.3001 70.1 60.1001 70.3C61.4001 70.6 62.6001 71.4 63.3001 72.3C63.9001 73.2 64.2001 74 64.4001 75.7C64.5001 76.4 64.6001 77.1 64.7001 77.2C64.9001 78.1 65.3001 78.8 65.8001 79.2C66.6001 79.8 67.9001 79.8 69.2001 79.3C69.4001 79.2 69.6001 79.2 69.6001 79.2C69.6001 79.2 69.0001 79.7 68.5001 79.9C67.9001 80.2 67.4001 80.3 66.7001 80.3C65.5001 80.3 64.5001 79.7 63.6001 78.4C63.4001 78.2 63.1001 77.4 62.8001 76.8C61.9001 74.8 61.5001 74.2 60.4001 73.5C59.5001 72.9 58.4001 72.8 57.5001 73.2C56.4001 73.8 56.0001 75.2 56.9001 76.1C57.2001 76.5 57.8001 76.8 58.3001 76.8C59.2001 76.9 60.0001 76.2 60.0001 75.3C60.0001 74.7 59.8001 74.4 59.2001 74.1C58.4001 73.7 57.5001 74.2 57.5001 74.9C57.5001 75.2 57.6001 75.4 58.0001 75.6C58.2001 75.7 58.2001 75.7 58.0001 75.7C57.3001 75.5 57.1001 74.7 57.7001 74.1C58.4001 73.4 59.9001 73.7 60.4001 74.7C60.6001 75.1 60.6001 75.9 60.5001 76.4C60.1001 77.5 58.9001 78.1 57.7001 77.7C56.9001 77.5 56.5001 77.3 55.5001 76.2C53.8001 74.4 53.1001 74.1 50.6001 73.7L50.1001 73.6L50.7001 73.2Z"
      fill="#FF007A"
    />
    <path
      d="M42.5001 41.2C48.3001 48.2 52.3001 51.1 52.8001 51.7C53.2001 52.2 53.0001 52.7 52.4001 53C52.0001 53.2 51.3001 53.4 51.0001 53.4C50.6001 53.4 50.5001 53.2 50.5001 53.2C50.3001 53 50.1001 53 48.9001 50.9C47.2001 48.3 45.8001 46.1 45.8001 46.1C45.7001 46 45.7001 46 48.8001 51.5C49.3001 52.6 48.9001 53 48.9001 53.2C48.9001 53.5 48.8001 53.7 48.4001 54.2C47.7001 55 47.4001 55.8 47.2001 57.6C47.0001 59.6 46.3001 60.9 44.3001 63.3C43.2001 64.7 43.0001 64.9 42.7001 65.5C42.3001 66.2 42.2001 66.6 42.2001 67.5C42.2001 68.4 42.2001 69 42.5001 69.9C42.8001 70.7 43.0001 71.2 43.7001 72.2C44.3001 73.1 44.6001 73.8 44.6001 74C44.6001 74.2 44.6001 74.2 45.5001 74C47.7001 73.5 49.4001 72.7 50.4001 71.6C51.0001 71 51.2001 70.6 51.2001 69.7C51.2001 69.1 51.2001 69 51.0001 68.7C50.7001 68.2 50.3001 67.7 49.2001 67C47.8001 66.1 47.3001 65.3 47.1001 64.3C47.0001 63.5 47.1001 62.9 47.9001 61.3C48.7001 59.7 48.9001 59 49.0001 57.4C49.1001 56.3 49.2001 55.9 49.5001 55.6C49.8001 55.3 50.1001 55.1 50.9001 55C52.2001 54.8 53.0001 54.5 53.7001 53.9C54.3001 53.4 54.5001 52.9 54.6001 52.1V51.5L54.3001 51.1C53.0001 49.9 41.7001 40.1 41.6001 40.1C41.6001 40.1 42.0001 40.6 42.5001 41.2ZM45.2001 68.5C45.5001 68 45.3001 67.4 44.9001 67.1C44.5001 66.8 43.8001 67 43.8001 67.3C43.8001 67.4 43.9001 67.5 44.0001 67.6C44.2001 67.7 44.2001 67.9 44.1001 68.1C43.9001 68.4 43.9001 68.6 44.1001 68.8C44.5001 69.1 45.0001 69 45.2001 68.5Z"
      fill="#FF007A"
    />
    <path
      d="M55.3001 55.3999C54.7001 55.5999 54.1001 56.1999 53.9001 56.8999C53.8001 57.2999 53.9001 57.9999 54.0001 58.1999C54.3001 58.5999 54.5001 58.5999 55.2001 58.5999C56.6001 58.5999 57.8001 57.9999 57.9001 57.2999C58.0001 56.6999 57.5001 55.8999 56.8001 55.4999C56.5001 55.3999 55.7001 55.2999 55.3001 55.3999ZM56.9001 56.6999C57.1001 56.3999 57.0001 56.0999 56.7001 55.8999C56.0001 55.3999 55.0001 55.7999 55.0001 56.3999C55.0001 56.6999 55.5001 57.0999 56.0001 57.0999C56.3001 57.0999 56.8001 56.8999 56.9001 56.6999Z"
      fill="#FF007A"
    />
    <defs>
      <linearGradient
        id={id}
        x1="81.233"
        y1="38.7935"
        x2="38.7961"
        y2="81.2303"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFA2C9" />
        <stop offset="0.2066" stopColor="#FFBCD8" />
        <stop offset="0.5477" stopColor="#FFE0ED" />
        <stop offset="0.8243" stopColor="#FFF7FA" />
        <stop offset="1" stopColor="white" />
      </linearGradient>
    </defs>
  </svg>
);

export default UniSwap;
