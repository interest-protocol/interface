import { FC } from 'react';

import { SVGProps } from '../svg.types';

const ISuiYN: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 30 32"
    fill="none"
    {...props}
  >
    <path
      d="M13.9358 0.398117C14.3235 0.180039 14.5173 0.0710001 14.7234 0.0283216C14.9057 -0.00944052 15.0942 -0.00944052 15.2765 0.0283216C15.4826 0.0710001 15.6765 0.180039 16.0641 0.398117L28.3358 7.30114C28.7235 7.51921 28.9173 7.62825 29.0583 7.7808C29.183 7.91577 29.2773 8.07479 29.3349 8.24752C29.4 8.44275 29.4 8.66083 29.4 9.09698V22.903C29.4 23.3392 29.4 23.5573 29.3349 23.7525C29.2773 23.9252 29.183 24.0842 29.0583 24.2192C28.9173 24.3717 28.7235 24.4808 28.3358 24.6989L16.0641 31.6019C15.6765 31.82 15.4826 31.929 15.2765 31.9717C15.0942 32.0094 14.9057 32.0094 14.7234 31.9717C14.5173 31.929 14.3235 31.82 13.9358 31.6019L1.66415 24.6989C1.27646 24.4808 1.08262 24.3717 0.941648 24.2192C0.816912 24.0842 0.722686 23.9252 0.665081 23.7525C0.599976 23.5573 0.599976 23.3392 0.599976 22.903V9.09698C0.599976 8.66083 0.599976 8.44275 0.665081 8.24752C0.722686 8.07479 0.816912 7.91577 0.941648 7.7808C1.08262 7.62825 1.27647 7.51921 1.66415 7.30114L13.9358 0.398117Z"
      fill="#9747FF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1309 20.9812C11.1055 22.6894 12.851 23.7091 14.8 23.7091C15.0018 23.7091 15.2013 23.6982 15.3981 23.6767C15.1464 21.971 13.9419 20.561 12.3008 20.0573L12.2534 20.0413C11.0394 19.5933 10.0527 18.7322 9.4345 17.6439C9.30569 18.7794 9.53783 19.9417 10.1309 20.9812ZM10.504 14.872L11.5219 13.0881C11.8348 15.0794 13.2237 16.7386 15.1343 17.38L15.1821 17.3945C16.8545 17.8538 18.1085 19.2512 18.3935 20.973L18.5872 22.1435C18.1625 22.5707 17.6739 22.919 17.1398 23.1778C16.7158 20.8944 15.0699 19.023 12.8517 18.3316C11.5598 17.8454 10.6594 16.6547 10.5387 15.2699L10.504 14.872ZM19.4691 15.5259C20.2314 16.862 20.3974 18.4007 19.9672 19.8249C19.3396 17.8113 17.7376 16.2273 15.682 15.6531C14.3765 15.2057 13.4415 14.0422 13.2802 12.6617L13.0227 10.4577L14.2375 8.32862C14.4875 7.89046 15.1125 7.89046 15.3625 8.32862L19.4691 15.5259Z"
      fill="white"
    />
  </svg>
);

export default ISuiYN;