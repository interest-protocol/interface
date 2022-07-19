import { FC, SVGAttributes } from 'react';

const EtherGray: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 52 52" fill="none" {...props}>
    <circle cx="26" cy="26" r="26" fill="#ECEFF0" />
    <path
      d="M25.9947 5.03174L25.7129 5.98892V33.7618L25.9947 34.0429L38.8863 26.4226L25.9947 5.03174Z"
      fill="#343434"
    />
    <path
      d="M26.012 5.02441L13.1201 26.4153L26.012 34.0356V20.5554V5.02441Z"
      fill="#8C8C8C"
    />
    <path
      d="M25.9948 36.4499L25.8359 36.6436V46.5367L25.9948 47.0003L38.8942 28.8335L25.9948 36.4499Z"
      fill="#3C3C3B"
    />
    <path
      d="M26.0218 47.0003V36.4499L13.1299 28.8335L26.0218 47.0003Z"
      fill="#8C8C8C"
    />
    <path d="M26 34.0139L38.8916 26.3935L26 20.5337V34.0139Z" fill="#141414" />
    <path
      d="M13.1299 26.3935L26.0218 34.0139V20.5337L13.1299 26.3935Z"
      fill="#393939"
    />
  </svg>
);

export default EtherGray;
