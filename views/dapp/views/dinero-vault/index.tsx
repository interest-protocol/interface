import { useTranslations } from 'next-intl';
import { FC, useMemo, useState } from 'react';

import { Container, Tooltip } from '@/components';
import { RoutesEnum, StakeState } from '@/constants';
import { Box, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { FixedPointMath, TOKEN_SYMBOL, ZERO_ADDRESS } from '@/sdk';
import { LoadingSVG, TimesSVG } from '@/svg';
import { formatMoney, getDNRAddress } from '@/utils';
import { useGetUserDineroVault } from '@/views/dapp/views/dinero-vault/dinero-vault.hooks';

import GoBack from '../../components/go-back';
import ButtonTabSelect from './button-tab-select';
import DineroVaultInfo from './details-info';
import { DineroVaultProps } from './dinero-vault.types';
import { processDineroVault } from './dinero-vault.utils';
import DineroVaultFooter from './dinero-vault-footer';
import DineroVaultTitle from './dinero-vault-title';
import DineroVaultForm from './form/dinero-vault-form';

const DineroVault: FC<DineroVaultProps> = ({ vault }) => {
  const t = useTranslations();
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

  if (processedData.loading)
    return (
      <Box
        flex="1"
        display="flex"
        flexDirection="column"
        width={['100%', '100%', '35rem', '35rem']}
        mx="auto"
      >
        <Box as="span" display="flex" width="2rem" m="auto">
          <LoadingSVG width="100%" maxHeight="2rem" maxWidth="2rem" />
        </Box>
      </Box>
    );

  if (error)
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          mb="L"
          width="10rem"
          height="10rem"
          color="error"
          overflow="hidden"
          borderRadius="50%"
          border="0.3rem solid"
        >
          <TimesSVG
            width="100%"
            height="100%"
            maxHeight="10rem"
            maxWidth="10rem"
          />
        </Box>
        <Typography variant="title3">{t('error.generic')}</Typography>
      </Box>
    );

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
      <Container dapp width="100%" mt="XL" px="M" position="relative">
        <Box display="flex" justifyContent="space-between">
          <GoBack route={RoutesEnum.Vaults} />
        </Box>
        <Box mb="XL">
          <ButtonTabSelect state={stakeState} setState={setStakeState} />
          <Box
            bg="foreground"
            borderBottomLeftRadius="M"
            borderBottomRightRadius="M"
          >
            <DineroVaultTitle
              token1={isStake ? underlyingToken : dineroToken}
              token2={isStake ? dineroToken : underlyingToken}
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <DineroVaultInfo
              items={[
                {
                  title: 'dineroVault.detail1',
                  tip: 'dineroVault.detail1Tip',
                  content:
                    formatMoney(
                      FixedPointMath.toNumber(
                        processedData.data.depositAmount,
                        processedData.data.depositTokenDecimals
                      )
                    ) +
                    ' ' +
                    processedData.data.depositTokenSymbol,
                },
                {
                  title: 'dineroVault.detail2',
                  tip: 'dineroVault.detail2Tip',
                  content:
                    formatMoney(
                      FixedPointMath.toNumber(
                        processedData.data.depositAmount,
                        processedData.data.dineroDecimals
                      )
                    ) +
                    ' ' +
                    TOKEN_SYMBOL.DNR,
                },
                {
                  title: 'dineroVault.detail3',
                  tip: 'dineroVault.detail3Tip',
                  content:
                    formatMoney(
                      FixedPointMath.toNumber(
                        processedData.data.mintedDineroAmount
                      )
                    ) +
                    ' / ' +
                    formatMoney(
                      FixedPointMath.toNumber(
                        processedData.data.maxDineroAmount
                      )
                    ),
                },
              ]}
            />
            <DineroVaultForm
              stakeState={stakeState}
              data={processedData.data}
              refetch={async () => void (await refetch())}
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <DineroVaultFooter
              dineroVaultDetailsFooterItems={[
                {
                  title: 'common.tvl',
                  content: formatMoney(
                    FixedPointMath.toNumber(
                      processedData.data.mintedDineroAmount
                    )
                  ),
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

export default DineroVault;
