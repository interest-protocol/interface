import { useRouter } from 'next/router';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Switch } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button } from '@/elements';
import { useIdAccount } from '@/hooks';
import { getIPXPairAddress } from '@/sdk';

import { WalletGuardButton } from '../../components';
import SwapSelectCurrency from '../dex/components/swap-select-currency';
import { FindPoolProps } from './dex-find-pool.types';

const FindPool: FC<FindPoolProps> = ({
  control,
  setValue,
  currencyAChargerArgs,
  currencyBChargerArgs,
}) => {
  const { push } = useRouter();
  const { chainId } = useIdAccount();
  const addressA = useWatch({ control, name: `tokenA.address` });
  const addressB = useWatch({ control, name: `tokenB.address` });
  const isStable = useWatch({ control, name: `isStable` });

  const handleEnterPool = () => {
    const address = getIPXPairAddress(chainId, addressA, addressB, isStable);

    push({
      pathname: Routes[RoutesEnum.DEXPoolDetails],
      query: address,
    }).then();
  };

  return (
    <Box
      px="L"
      py="XL"
      my="L"
      color="text"
      width="100%"
      bg="foreground"
      maxWidth="30rem"
      borderRadius="M"
    >
      <Box display="flex" justifyContent="space-between">
        <SwapSelectCurrency currentToken={addressA} {...currencyAChargerArgs} />
        <Switch
          defaultValue={isStable ? 'stable' : 'volatile'}
          options={[
            { value: 'stable', onSelect: () => setValue('isStable', true) },
            { value: 'volatile', onSelect: () => setValue('isStable', false) },
          ]}
        />
        <SwapSelectCurrency currentToken={addressB} {...currencyBChargerArgs} />
      </Box>
      <Box mt="XL">
        <WalletGuardButton>
          <Button
            width="100%"
            variant="primary"
            onClick={handleEnterPool}
            hover={{ bg: 'accentActive' }}
          >
            Enter Pool
          </Button>
        </WalletGuardButton>
      </Box>
    </Box>
  );
};

export default FindPool;
