import { useTranslations } from 'next-intl';
import { values } from 'ramda';
import { FC } from 'react';

import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk';
import {
  ArrowSVG,
  BinanceSVG,
  BinanceTestSVG,
  BlockchainSVG,
  LinkSVG,
  SuiSVG,
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
                BNB Chain Test
              </Typography>
            </Box>
          ),
          displayTitle: (
            <Box
              display="flex"
              alignItems="center"
              pl={['NONE', 'NONE', 'NONE', 'S']}
            >
              <SuiSVG
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
                BNBTest
              </Typography>
            </Box>
          ),
        },
        {
          onSelect: () => {
            logGenericEvent('Network_Sui');
            window.open('https://sui.interestprotocol.com', '_blank');
          },
          displayOption: (
            <Box
              px="L"
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <BinanceSVG
                  width="1.5rem"
                  height="1.5rem"
                  maxHeight="1.5rem"
                  maxWidth="1.5rem"
                />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  SUI Dev
                </Typography>
              </Box>
              <Box>
                <LinkSVG
                  width="100%"
                  height="100%"
                  maxWidth="1rem"
                  maxHeight="1rem"
                />
              </Box>
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
                Sui dev
              </Typography>
            </Box>
          ),
        },
      ]}
    />
  );
};

export default SelectNetwork;
