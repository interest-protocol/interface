import { FC, useMemo, useState } from 'react';

import { Container, Tooltip } from '@/components';
import { RoutesEnum, StakeState } from '@/constants';
import { Box, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { FixedPointMath, TOKEN_SYMBOL, ZERO_ADDRESS } from '@/sdk';
import { getDNRAddress } from '@/utils';
import { useGetUserDineroVault } from '@/views/dapp/views/dinero-vault-details/dinero-vault-details.hooks';

import GoBack from '../../components/go-back';
import ButtonTabSelect from './button-tab-select';
import DineroVaultDetailsInfo from './details-info';
import { DineroVaultDetailsDetailsProps } from './dinero-vault-details.types';
import DineroVaultDetailsFooter from './dinero-vault-details-footer';
import DineroVaultDetailsTitle from './dinero-vault-title';
import { processDineroVault } from './dinero-vaults-details.utils';
import DineroVaultForm from './form/dinero-vault-form';

const DineroVaultDetails: FC<DineroVaultDetailsDetailsProps> = ({ vault }) => {
  const [stakeState, setStakeState] = useState(StakeState.Stake);

  const { chainId, account } = useIdAccount();
  const { data, error, refetch } = useGetUserDineroVault(
    chainId,
    account,
    vault
  );

  const processedData = useMemo(
    () => processDineroVault(chainId, vault, data),
    [vault, chainId, account, data]
  );

  if (error) return <div>error</div>;

  const isStake = stakeState === StakeState.Stake;

  const dnrAddress = getDNRAddress(chainId ? chainId : -1);

  const dineroToken = {
    symbol: TOKEN_SYMBOL.DNR,
    address: dnrAddress ? dnrAddress : ZERO_ADDRESS,
  };

  const underlyingToken = {
    address: processedData.data.depositTokenAddress,
    symbol: processedData.data.depositTokenSymbol,
  };

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      width={['100%', '100%', '35rem', '35rem']}
      mx="auto"
    >
      <Container
        dapp
        width="100%"
        mt="XL"
        px="M"
        position="relative"
        background="specialBackground"
      >
        <Box display="flex" justifyContent="space-between">
          <GoBack route={RoutesEnum.DineroVault} />
        </Box>
        <Box mb="XL">
          <ButtonTabSelect state={stakeState} setState={setStakeState} />
          <Box
            bg="foreground"
            borderBottomLeftRadius="M"
            borderBottomRightRadius="M"
          >
            <DineroVaultDetailsTitle
              token1={isStake ? underlyingToken : dineroToken}
              token2={isStake ? dineroToken : underlyingToken}
              isLoading={processedData.loading}
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <DineroVaultDetailsInfo
              items={[
                {
                  title: 'dineroVaultAddress.detail1',
                  tip: 'dineroVaultAddress.detail1Tip',
                  content:
                    FixedPointMath.toNumber(
                      processedData.data.depositAmount,
                      processedData.data.depositTokenDecimals
                    ) +
                    ' ' +
                    processedData.data.depositTokenSymbol,
                  isLoading: processedData.loading,
                },
                {
                  title: 'dineroVaultAddress.detail2',
                  tip: 'dineroVaultAddress.detail2Tip',
                  content:
                    FixedPointMath.toNumber(
                      processedData.data.depositAmount,
                      processedData.data.dineroDecimals
                    ) +
                    ' ' +
                    TOKEN_SYMBOL.DNR,
                  isLoading: processedData.loading,
                },
                {
                  title: 'dineroVaultAddress.detail3',
                  tip: 'dineroVaultAddress.detail3Tip',
                  content:
                    FixedPointMath.toNumber(
                      processedData.data.mintedDineroAmount
                    ) +
                    ' / ' +
                    FixedPointMath.toNumber(processedData.data.maxDineroAmount),
                  isLoading: processedData.loading,
                },
              ]}
            />
            <DineroVaultForm
              stakeState={stakeState}
              data={processedData.data}
              refetch={async () => void (await refetch())}
              isLoading={processedData.loading}
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <DineroVaultDetailsFooter
              dineroVaultDetailsFooterItems={[
                {
                  title: 'common.tvl',
                  content: String(
                    FixedPointMath.toNumber(
                      processedData.data.mintedDineroAmount
                    )
                  ),
                  isLoading: processedData.loading,
                },
              ]}
            />
          </Box>
        </Box>
        <Tooltip />
      </Container>
    </Box>
  );
};

export default DineroVaultDetails;
