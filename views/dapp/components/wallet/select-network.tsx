import { useTranslations } from 'next-intl';
import { values } from 'ramda';
import { FC } from 'react';

import EthereumNetwork from '@/components/svg/ethereum-network';
import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk';
import {
  AdaSVG,
  ArrowSVG,
  BinanceSVG,
  BinanceTestSVG,
  BlockchainSVG,
} from '@/svg';
import { capitalize } from '@/utils';
import { logGenericEvent } from '@/utils/analytics';

import { SelectNetworkProps } from './wallet.types';
const SelectNetwork: FC<SelectNetworkProps> = ({ switchNetwork, chainId }) => {
  const t = useTranslations();

  return (
    <Dropdown
      buttonMode
      mode="select"
      suffix={
        <Box display="flex" alignItems="center">
          {(!chainId || !values(CHAIN_ID).includes(chainId)) && (
            <Box
              mr="S"
              as="span"
              width="1rem"
              display={['inline-block', 'none']}
            >
              <BlockchainSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
            </Box>
          )}
          <Box as="span" display="inline-block" width="0.6rem">
            <ArrowSVG width="100%" maxHeight="0.6rem" maxWidth="0.6rem" />
          </Box>
        </Box>
      }
      title={
        <Typography
          variant="normal"
          display={['none', 'none', 'none', 'block']}
        >
          {capitalize(t('common.networkTitle'))}
        </Typography>
      }
      header={capitalize(t('common.networkTitle') + ':')}
      defaultValue={`${chainId}`}
      data={[
        {
          value: `${CHAIN_ID.BNB_TEST_NET}`,
          onSelect: () => {
            logGenericEvent('Network_BSCT');
            switchNetwork(CHAIN_ID.BNB_TEST_NET);
          },
          displayOption: (
            <Box pl="L" display="flex" alignItems="center">
              <Box as="span" display="inline-block" width="1.5rem">
                <BinanceTestSVG
                  width="1.5rem"
                  height="1.5rem"
                  fill="white"
                  maxHeight="1.5rem"
                  maxWidth="1.5rem"
                />
              </Box>
              <Typography variant="normal" mx="M" whiteSpace="nowrap">
                BSCT
              </Typography>
            </Box>
          ),
          displayTitle: (
            <Box
              display="flex"
              alignItems="center"
              pl={['NONE', 'NONE', 'NONE', 'S']}
            >
              <BinanceTestSVG
                width="1.5rem"
                height="1.5rem"
                fill="white"
                maxHeight="1.5rem"
                maxWidth="1.5rem"
              />
              <Typography
                mx="M"
                variant="normal"
                whiteSpace="nowrap"
                display={['none', 'none', 'none', 'block']}
              >
                BSCT
              </Typography>
            </Box>
          ),
        },
        {
          value: ``,
          onSelect: () => {
            logGenericEvent('Network_BSC');
          },
          displayOption: (
            <Box
              px="L"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <BinanceSVG
                  width="1.5rem"
                  height="1.5rem"
                  maxHeight="1.5rem"
                  maxWidth="1.5rem"
                />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  BSC
                </Typography>
              </Box>
              <Typography
                px="M"
                py="M"
                fontSize="XS"
                variant="normal"
                borderRadius="M"
                textAlign="center"
                bg="accentAlternative"
                textTransform="uppercase"
              >
                {t('common.soon')}
              </Typography>
            </Box>
          ),
          displayTitle: (
            <Box
              display="flex"
              alignItems="center"
              pl={['NONE', 'NONE', 'NONE', 'S']}
            >
              <BinanceSVG
                width="1.5rem"
                height="1.5rem"
                maxHeight="1.5rem"
                maxWidth="1.5rem"
              />
              <Typography
                mx="M"
                variant="normal"
                whiteSpace="nowrap"
                display={['none', 'none', 'none', 'block']}
              >
                BSC
              </Typography>
            </Box>
          ),
          disabled: true,
        },
        {
          value: ``,
          onSelect: () => {
            logGenericEvent('Network_ADA_EVM');
          },
          displayOption: (
            <Box
              px="L"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <AdaSVG
                  width="1.5rem"
                  height="1.5rem"
                  maxHeight="1.5rem"
                  maxWidth="1.5rem"
                />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  ADA EVM
                </Typography>
              </Box>
              <Typography
                px="M"
                py="M"
                fontSize="XS"
                variant="normal"
                borderRadius="M"
                textAlign="center"
                bg="accentAlternative"
                textTransform="uppercase"
              >
                {t('common.soon')}
              </Typography>
            </Box>
          ),
          displayTitle: (
            <Box
              display="flex"
              alignItems="center"
              pl={['NONE', 'NONE', 'NONE', 'S']}
            >
              <AdaSVG
                width="1.5rem"
                height="1.5rem"
                maxHeight="1.5rem"
                maxWidth="1.5rem"
              />
              <Typography
                mx="M"
                variant="normal"
                whiteSpace="nowrap"
                display={['none', 'none', 'none', 'block']}
              >
                ADA EVM
              </Typography>
            </Box>
          ),
          disabled: true,
        },
        {
          value: ``,
          onSelect: () => {
            logGenericEvent('Network_Goerli');
          },
          displayOption: (
            <Box
              px="L"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <EthereumNetwork
                  width="1.5rem"
                  height="1.5rem"
                  maxHeight="1.5rem"
                  maxWidth="1.5rem"
                />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  Goerli
                </Typography>
              </Box>
              <Typography
                px="M"
                py="M"
                fontSize="XS"
                variant="normal"
                borderRadius="M"
                textAlign="center"
                bg="accentAlternative"
                textTransform="uppercase"
              >
                {t('common.soon')}
              </Typography>
            </Box>
          ),
          displayTitle: (
            <Box
              display="flex"
              alignItems="center"
              pl={['NONE', 'NONE', 'NONE', 'S']}
            >
              <EthereumNetwork
                width="1.5rem"
                height="1.5rem"
                fill="white"
                maxHeight="1.5rem"
                maxWidth="1.5rem"
              />
              <Typography
                mx="M"
                variant="normal"
                whiteSpace="nowrap"
                display={['none', 'none', 'none', 'block']}
              >
                Goerli
              </Typography>
            </Box>
          ),
          disabled: true,
        },
      ]}
    />
  );
};

export default SelectNetwork;
