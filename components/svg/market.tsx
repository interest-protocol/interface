import { FC } from 'react';

import { SVGProps } from './svg.types';

const Market: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg style={{ maxWidth, maxHeight }} viewBox="0 0 26 26" {...props}>
    <path
      d="M26 2.16667V16.25C26 16.8246 25.7717 17.3757 25.3654 17.7821C24.9591 18.1884 24.408 18.4167 23.8333 18.4167H9.11354L10.5219 19.8115C10.7253 20.0169 10.8394 20.2942 10.8394 20.5833C10.8394 20.8724 10.7253 21.1498 10.5219 21.3552C10.3148 21.5554 10.038 21.6674 9.75 21.6674C9.46196 21.6674 9.18519 21.5554 8.97813 21.3552L5.72813 18.1052C5.5247 17.8998 5.41057 17.6224 5.41057 17.3333C5.41057 17.0442 5.5247 16.7669 5.72813 16.5615L8.97813 13.3115C9.18861 13.1387 9.45583 13.0504 9.7278 13.0638C9.99978 13.0771 10.2571 13.1912 10.4496 13.3837C10.6422 13.5763 10.7562 13.8336 10.7696 14.1055C10.7829 14.3775 10.6946 14.6447 10.5219 14.8552L9.11354 16.25H23.8333V2.16667H8.66667V3.25C8.66667 3.53732 8.55253 3.81287 8.34937 4.01603C8.1462 4.2192 7.87065 4.33333 7.58333 4.33333C7.29602 4.33333 7.02047 4.2192 6.8173 4.01603C6.61414 3.81287 6.5 3.53732 6.5 3.25V2.16667C6.5 1.59203 6.72827 1.04093 7.1346 0.634602C7.54093 0.228273 8.09203 0 8.66667 0H23.8333C24.408 0 24.9591 0.228273 25.3654 0.634602C25.7717 1.04093 26 1.59203 26 2.16667ZM18.4167 21.6667C18.1293 21.6667 17.8538 21.7808 17.6506 21.984C17.4475 22.1871 17.3333 22.4627 17.3333 22.75V23.8333H2.16667V9.75H16.8865L15.4781 11.1448C15.2747 11.3502 15.1606 11.6276 15.1606 11.9167C15.1606 12.2058 15.2747 12.4831 15.4781 12.6885C15.6852 12.8888 15.962 13.0007 16.25 13.0007C16.538 13.0007 16.8148 12.8888 17.0219 12.6885L20.2719 9.43854C20.4753 9.23315 20.5894 8.95575 20.5894 8.66667C20.5894 8.37758 20.4753 8.10019 20.2719 7.89479L17.0219 4.64479C16.8114 4.47204 16.5442 4.38376 16.2722 4.39711C16.0002 4.41047 15.7429 4.52452 15.5504 4.71706C15.3578 4.90961 15.2438 5.16689 15.2304 5.43886C15.2171 5.71084 15.3054 5.97805 15.4781 6.18854L16.8865 7.58333H2.16667C1.59203 7.58333 1.04093 7.81161 0.634602 8.21794C0.228273 8.62426 0 9.17536 0 9.75V23.8333C0 24.408 0.228273 24.9591 0.634602 25.3654C1.04093 25.7717 1.59203 26 2.16667 26H17.3333C17.908 26 18.4591 25.7717 18.8654 25.3654C19.2717 24.9591 19.5 24.408 19.5 23.8333V22.75C19.5 22.4627 19.3859 22.1871 19.1827 21.984C18.9795 21.7808 18.704 21.6667 18.4167 21.6667Z"
      fill="white"
    />
  </svg>
);

export default Market;
