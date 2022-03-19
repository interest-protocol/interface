import { FC } from 'react';

import {
  ArrowSVG,
  BinanceSVG,
  BinanceTestSVG,
} from '../../../../components/svg';
import { Box, Dropdown, Typography } from '../../../../elements';

const SelectNetwork: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const doSomethingBSCTestNet = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const doSomethingBSCMainNet = () => {};

  return (
    <Box mr={['S', 'L']}>
      <Dropdown
        buttonMode
        mode="select"
        suffix={
          <Box display={['none', 'block']}>
            <ArrowSVG width="0.6rem" />
          </Box>
        }
        title="Choose Network"
        header="Choose your Network:"
        defaultValue="BSCTestNet"
        data={[
          {
            value: 'BSCTestNet',
            onSelect: doSomethingBSCTestNet,
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <BinanceTestSVG width="1.5rem" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  BSC Test Net
                </Typography>
              </Box>
            ),
            displayTitle: (
              <Box pr={['S', 'L']} pl="S" display="flex" alignItems="center">
                <BinanceTestSVG width="1.5rem" />
                <Typography
                  display={['none', 'block']}
                  variant="normal"
                  mx="M"
                  whiteSpace="nowrap"
                >
                  BSC Test Net
                </Typography>
              </Box>
            ),
          },
          {
            value: 'BSCMainNet',
            onSelect: doSomethingBSCMainNet,
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <BinanceSVG width="1.5rem" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  Binance Smart Chain
                </Typography>
              </Box>
            ),
            displayTitle: (
              <Box pr={['S', 'L']} pl="S" display="flex" alignItems="center">
                <BinanceSVG width="1.5rem" />
                <Typography
                  display={['none', 'block']}
                  variant="normal"
                  mx="M"
                  whiteSpace="nowrap"
                >
                  Binance Smart Chain
                </Typography>
              </Box>
            ),
          },
        ]}
      />
    </Box>
  );
};

export default SelectNetwork;
