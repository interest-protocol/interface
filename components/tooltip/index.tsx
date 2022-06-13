import { FC } from 'react';
import ReactTooltip from 'react-tooltip';

import { useIsMounted } from '@/hooks';

const Tooltip: FC = () => {
  const isMounted = useIsMounted();
  return isMounted ? (
    <ReactTooltip place="top" type="dark" effect="solid" multiline />
  ) : null;
};

export default Tooltip;
