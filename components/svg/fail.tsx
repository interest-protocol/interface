import { FC, SVGAttributes } from 'react';

const Fail: FC<SVGAttributes<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 572 572" fill="none" {...props}>
    <path
      d="M286 571.6C128.08 571.6 0.399994 443.92 0.399994 286C0.399994 128.08 128.08 0.399994 286 0.399994C443.92 0.399994 571.6 128.08 571.6 286C571.6 443.92 443.92 571.6 286 571.6ZM286 34C146.56 34 34 146.56 34 286C34 425.44 146.56 538 286 538C425.44 538 538 425.44 538 286C538 146.56 425.44 34 286 34Z"
      fill="currentColor"
    />
    <path
      d="M408.354 139.874L432.11 163.646L163.646 432.11L139.89 408.354L408.354 139.874Z"
      fill="currentColor"
    />
    <path
      d="M163.646 139.874L432.11 408.338L408.354 432.11L139.89 163.646L163.646 139.874Z"
      fill="currentColor"
    />
  </svg>
);

export default Fail;
