import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import { capitalize, noop } from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import { SwapViewButtonProps } from './swap.types';

const SwapViewButton: FC<SwapViewButtonProps> = ({
  text,
  onClick,
  disabled,
  loadingText,
}) => (
  <Button
    mt="L"
    width="100%"
    variant="primary"
    onClick={onClick}
    disabled={!!loadingText || disabled}
    hover={{
      bg: !!loadingText || disabled ? 'disabled' : 'accentAlternativeActive',
    }}
    cursor={loadingText ? 'progress' : disabled ? 'not-allowed' : 'pointer'}
    bg={!!loadingText || disabled ? 'disabled' : 'accentAlternative'}
  >
    {loadingText ? (
      <Box as="span" display="flex" justifyContent="center">
        <Box as="span" display="inline-block" width="1rem">
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
        </Box>
        <Typography as="span" variant="normal" ml="M" fontSize="S">
          {loadingText}
        </Typography>
      </Box>
    ) : (
      text
    )}
  </Button>
);

const SwapButton: FC = () => {
  const t = useTranslations();

  return (
    <WalletGuardButton>
      <SwapViewButton
        disabled={false}
        loadingText={capitalize(t('common.loading'))}
        text={t('dexSwap.buttonText')}
        onClick={noop}
      />
    </WalletGuardButton>
  );
};

export default SwapButton;
