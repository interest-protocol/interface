import { useTranslations } from 'next-intl';
import { FC, MouseEvent as ReactMouseEvent } from 'react';
import toast from 'react-hot-toast';
import ReactTooltip from 'react-tooltip';

import { Box } from '@/elements';
import { useIsMounted } from '@/hooks';
import { CopySVG } from '@/svg';
import { capitalize } from '@/utils';

import { CopyToClipboardProps } from './copy-to-clipboard';

const CopyToClipboard: FC<CopyToClipboardProps> = ({
  address,
  onClick,
  children,
  ...props
}) => {
  const t = useTranslations();
  const isMounted = useIsMounted();
  const copyToClipboard = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    window.navigator.clipboard.writeText(address || '');
    onClick?.(e);
    toast(capitalize(t('common.copyClipboard')));
  };

  return (
    <>
      <Box
        as="span"
        cursor="pointer"
        data-tip={capitalize(t('common.copyAddress'))}
        hover={{ color: 'accent' }}
        onClick={copyToClipboard}
        {...props}
      >
        <Box as="span" display="inline-block" width="1rem">
          <CopySVG width="100%" maxWidth="1rem" maxHeight="1rem" />
        </Box>
        {children}
      </Box>
      {isMounted && (
        <ReactTooltip place="top" type="dark" effect="solid" multiline />
      )}
    </>
  );
};

export default CopyToClipboard;
