import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Dropdown, Typography } from '@/elements';
import { ArrowSVG, BinanceTestSVG, SuiSVG } from '@/svg';
import { capitalize } from '@/utils';

const SelectNetwork: FC = () => {
  const t = useTranslations();
  return (
    <Dropdown
      buttonMode
      mode="select"
      suffix={
        <Box display="flex" alignItems="center">
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
          {t('common.chooseNetwork')}
        </Typography>
      }
      header={capitalize(t('common.chooseNetwork'))}
      defaultValue={`sui`}
      data={[
        {
          value: `sui`,
          displayOption: (
            <Box pl="L" display="flex" alignItems="center">
              <Box as="span" display="inline-block" width="1.5rem" color="text">
                <SuiSVG
                  width="1.5rem"
                  height="1.5rem"
                  fill="currentColor"
                  maxHeight="1.5rem"
                  maxWidth="1.5rem"
                />
              </Box>
              <Typography
                variant="normal"
                mx="M"
                whiteSpace="nowrap"
                color="text"
              >
                SUI
              </Typography>
            </Box>
          ),
          disabled: true,
        },
        {
          value: `bsct`,
          onSelect: () => {
            window?.open('https://interestprotocol.com/dapp/dex', '_blank');
          },
          displayOption: (
            <Box
              px="L"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" alignItems="center" color="text">
                <BinanceTestSVG
                  width="1.5rem"
                  height="1.5rem"
                  maxHeight="1.5rem"
                  maxWidth="1.5rem"
                  fill="currentColor"
                />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  BSCT
                </Typography>
              </Box>
            </Box>
          ),
          noSelectable: true,
        },
      ]}
    />
  );
};

export default SelectNetwork;
