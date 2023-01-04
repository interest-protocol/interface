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
import { capitalize, provider, showToast } from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { MintButtonProps } from './faucet-form.types';

const MintButton: FC<MintButtonProps> = ({ getValues }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const { signAndExecuteTransaction } = useWallet();
  const { account } = useWeb3();
  const handleOnMint = useCallback(async () => {
    try {
      setLoading(true);
      const type = getValues('type');
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.Faucet,
        functionName: 'handleOnMint',
      });

      if (type === COIN_TYPE[Network.DEVNET].SUI) {
        if (!account) throw new Error('No account found');
        const tx = await provider.requestSuiFromFaucet(account);
        return;
      }
      const tx = await signAndExecuteTransaction({
        kind: 'moveCall',
        data: {
          function: 'mint',
          gasBudget: 1000,
          module: 'faucet',
          packageObjectId: FAUCET_PACKAGE_ID,
          typeArguments: [type.split('<')[1].slice(0, -1)],
          arguments: [FAUCET_OBJECT_ID, 1],
        },
      });
    } catch (error) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.Faucet,
        functionName: 'handleOnMint',
      });
    } finally {
      setLoading(false);
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
      hover={{ bg: 'accentAlternativeActive', color: 'textSecondary' }}
      bg={!loading ? 'accent' : 'disabled'}
      cursor={loading ? 'not-allowed' : 'pointer'}
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
            Minting
          </Typography>
        </Box>
      ) : (
        'Mint'
      )}
    </Button>
  );
};

export default MintButton;
