import { FC, useState } from 'react';

import { Container, Tooltip } from '@/components';
import { ERC_20_DATA, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';
import { CHAIN_ID, FixedPointMath, TOKEN_SYMBOL, ZERO_BIG_NUMBER } from '@/sdk';

import GoBack from '../../components/go-back';
import VaultDetailsBalance from './balance';
import ButtonTabSelect from './button-tab-select';
import VaultDetailsInfo from './details-info';
import VaultDetailsPool from './pool-details';
import { VaultDetailsProps } from './vault-details.types';
import VaultDetailsTitle from './vault-title';

const DATA = {
  token1: {
    symbol: 'BUSD',
    address: ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][TOKEN_SYMBOL.BUSD].address,
  },
  token2: {
    symbol: 'DNR',
    address: ERC_20_DATA[CHAIN_ID.BNB_TEST_NET][TOKEN_SYMBOL.DNR].address,
  },
  deposit: {
    title: 'vaultAddress.detail1',
    tip: 'vaultAddress.detail1Tip',
    content: ZERO_BIG_NUMBER,
  },
  vault: {
    title: 'vaultAddress.detail2',
    tip: 'vaultAddress.detail2Tip',
    content: ZERO_BIG_NUMBER,
  },
  amout: {
    title: 'vaultAddress.detail3',
    tip: 'vaultAddress.detail3Tip',
    content: ZERO_BIG_NUMBER,
  },
  limit: ZERO_BIG_NUMBER,
  balance: ZERO_BIG_NUMBER,
  tvl: ZERO_BIG_NUMBER,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VaultDetails: FC<VaultDetailsProps> = ({ vault }) => {
  const [select, setSelect] = useState('stake');

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
          <GoBack route={RoutesEnum.Vaults} />
        </Box>
        <Box mb="XL">
          <ButtonTabSelect state={select} setState={setSelect} />
          <Box
            bg="foreground"
            borderBottomLeftRadius="M"
            borderBottomRightRadius="M"
          >
            <VaultDetailsTitle
              token1={select === 'stake' ? DATA.token1 : DATA.token2}
              token2={select === 'stake' ? DATA.token2 : DATA.token1}
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultDetailsInfo
              items={[
                {
                  title: DATA.deposit.title,
                  tip: DATA.deposit.tip,
                  content:
                    select === 'stake'
                      ? FixedPointMath.toNumber(DATA.vault.content) +
                        ' ' +
                        DATA.token1.symbol
                      : FixedPointMath.toNumber(DATA.vault.content) +
                        ' ' +
                        DATA.token2.symbol,
                },
                {
                  title: DATA.vault.title,
                  tip: DATA.vault.tip,
                  content:
                    select === 'stake'
                      ? FixedPointMath.toNumber(DATA.vault.content) +
                        ' ' +
                        DATA.token2.symbol
                      : FixedPointMath.toNumber(DATA.vault.content) +
                        ' ' +
                        DATA.token1.symbol,
                },
                {
                  title: DATA.amout.title,
                  tip: DATA.amout.tip,
                  content:
                    FixedPointMath.toNumber(DATA.amout.content) +
                    ' / ' +
                    FixedPointMath.toNumber(DATA.limit),
                },
              ]}
            />
            <VaultDetailsBalance
              {...(select === 'stake' ? DATA.token1 : DATA.token2)}
              balance={DATA.balance}
            />
            <Typography variant="normal" as="hr" color="#44484C" mb="M" />
            <VaultDetailsPool
              VaultPoolDetails={[
                {
                  title: 'common.tvl',
                  content: FixedPointMath.toNumber(DATA.tvl) + '',
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

export default VaultDetails;
