import { useTheme } from '@emotion/react';
import { Network } from '@mysten/sui.js';
import { useWallet } from '@mysten/wallet-kit';
import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { useCallback, useState } from 'react';
import { FC } from 'react';

import { COIN_TYPE, FAUCET_OBJECT_ID, FAUCET_PACKAGE_ID } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useWeb3 } from '@/hooks';
import { LoadingSVG } from '@/svg';
import { capitalize, provider, showToast, showTXSuccessToast } from '@/utils';

import { MintButtonProps } from './faucet-form.types';

const MintButton: FC<MintButtonProps> = ({ getValues }) => {
  const t = useTranslations();
  const { dark } = useTheme() as { dark: boolean };
  const [loading, setLoading] = useState(false);
  const { signAndExecuteTransaction } = useWallet();
  const { account, mutate } = useWeb3();

  const handleOnMint = useCallback(async () => {
    try {
      setLoading(true);
      const type = getValues('type');

      if (type === COIN_TYPE[Network.DEVNET].SUI) {
        if (!account) throw new Error(t('error.accountNotFound'));
        return await provider.requestSuiFromFaucet(account);
      }
      const tx = await signAndExecuteTransaction({
        kind: 'moveCall',
        data: {
          function: 'mint',
          gasBudget: 1000,
          module: 'faucet',
          packageObjectId: FAUCET_PACKAGE_ID,
          typeArguments: [type.split('<')[1].slice(0, -1)],
          arguments: [FAUCET_OBJECT_ID, '1'],
        },
      });
      await showTXSuccessToast(tx);
    } finally {
      setLoading(false);
      await mutate();
    }
  }, []);

  const onMint = () =>
    showToast(handleOnMint(), {
      loading: `Loading`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  return (
    <Button
      width="100%"
      onClick={onMint}
      variant="primary"
      disabled={loading}
      hover={{ bg: 'accent' }}
      bg={!loading ? 'accentSecondary' : 'disabled'}
      cursor={loading ? 'not-allowed' : 'pointer'}
      color={dark ? 'text' : 'textInverted'}
    >
      {loading ? (
        <Box as="span" display="flex" justifyContent="center">
          <Box as="span" display="inline-block" width="1rem">
            <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
          </Box>
          <Typography
            as="span"
            variant="normal"
            ml="M"
            fontSize="S"
            textTransform="capitalize"
          >
            {capitalize(t('faucet.mint', { isLoading: +loading }))}
          </Typography>
        </Box>
      ) : (
        capitalize(t('faucet.mint', { isLoading: +loading }))
      )}
    </Button>
  );
};

export default MintButton;
