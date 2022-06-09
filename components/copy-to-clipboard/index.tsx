import { FC, MouseEvent as ReactMouseEvent } from 'react';
import toast from 'react-hot-toast';
import ReactTooltip from 'react-tooltip';

import { Box } from '@/elements';
import { useIsMounted } from '@/hooks';
import { CopySVG } from '@/svg';

import { CopyToClipboardProps } from './copy-to-clipboard';

const CopyToClipboard: FC<CopyToClipboardProps> = ({
  address,
  onClick,
  children,
  ...props
}) => {
  const isMounted = useIsMounted();
  const copyToClipboard = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    window.navigator.clipboard.writeText(address || '');
    onClick?.(e);
    toast('Copied to clipboard');
  };

  return (
    <>
      <Box
        as="span"
        cursor="pointer"
        data-tip="Copy Address"
        hover={{ color: 'accent' }}
        onClick={copyToClipboard}
        {...props}
      >
        <CopySVG width="1rem" />
        {children}
      </Box>
      {isMounted && (
        <ReactTooltip place="top" type="dark" effect="solid" multiline />
      )}
    </>
  );
};

export default CopyToClipboard;
