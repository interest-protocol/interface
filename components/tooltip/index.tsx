import dynamic from 'next/dynamic';
import { FC } from 'react';

import { useIsMounted } from '@/hooks';

const Tooltip: FC = () => {
  const isMounted = useIsMounted();

  const ReactTooltip = dynamic(() => import('react-tooltip'), {
    ssr: false,
  });

  return isMounted ? (
    <ReactTooltip place="top" type="dark" effect="solid" multiline />
  ) : null;
};

export default Tooltip;
