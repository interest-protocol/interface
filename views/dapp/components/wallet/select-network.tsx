import { useTranslations } from 'next-intl';
import { values } from 'ramda';
import { FC } from 'react';

import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk';
import {
  AdaSVG,
  ArrowSVG,
  BinanceTestSVG,
  BlockchainSVG,
  BNBSVG,
  LoadingSVG,
} from '@/svg';
import { capitalize } from '@/utils';

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
              <BlockchainSVG width="100%" />
            </Box>
          )}
          <Box as="span" display="inline-block" width="0.6rem">
            <ArrowSVG width="100%" />
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
          onSelect: () => switchNetwork(CHAIN_ID.BNB_TEST_NET),
          displayOption: (
            <Box pl="L" display="flex" alignItems="center">
              <Box as="span" display="inline-block" width="1.5rem">
                <BinanceTestSVG width="100%" />
              </Box>
              <Typography variant="normal" mx="M" whiteSpace="nowrap">
                BNBT
              </Typography>
            </Box>
          ),
          displayTitle: (
            <Box
              display="flex"
              alignItems="center"
              pl={['NONE', 'NONE', 'NONE', 'S']}
            >
              <BinanceTestSVG width="1.5rem" height="1.5rem" />
              <Typography
                mx="M"
                variant="normal"
                whiteSpace="nowrap"
                display={['none', 'none', 'none', 'block']}
              >
                BNBT
              </Typography>
            </Box>
          ),
        },
        {
          value: ``,
          displayOption: (
            <Box
              px="L"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <BNBSVG width="1.5rem" height="1.5rem" fill="white" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  BNB
                </Typography>
              </Box>
              <Box as="span" display="inline-block" width="1rem">
                <LoadingSVG width="100%" />
              </Box>
            </Box>
          ),
          displayTitle: (
            <Box
              display="flex"
              alignItems="center"
              pl={['NONE', 'NONE', 'NONE', 'S']}
            >
              <BNBSVG width="1.5rem" height="1.5rem" fill="white" />
              <Typography
                mx="M"
                variant="normal"
                whiteSpace="nowrap"
                display={['none', 'none', 'none', 'block']}
              >
                BNB
              </Typography>
            </Box>
          ),
          disabled: true,
        },
        {
          value: ``,
          displayOption: (
            <Box
              px="L"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <AdaSVG width="1.5rem" height="1.5rem" fill="white" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  ADA
                </Typography>
              </Box>
              <Box as="span" display="inline-block" width="1rem">
                <LoadingSVG width="100%" />
              </Box>
            </Box>
          ),
          displayTitle: (
            <Box
              display="flex"
              alignItems="center"
              pl={['NONE', 'NONE', 'NONE', 'S']}
            >
              <AdaSVG width="1.5rem" height="1.5rem" fill="white" />
              <Typography
                mx="M"
                variant="normal"
                whiteSpace="nowrap"
                display={['none', 'none', 'none', 'block']}
              >
                ADA
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
