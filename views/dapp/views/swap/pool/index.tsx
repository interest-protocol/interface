import { useRouter } from 'next/router';
import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';

import Liquidity from './liquidity';
import AddLiquidity from './modal-add-liquidity';
import NonHasPool from './non-has-pool';

const PoolView: FC = () => {
  const DefaultTokenSVG = TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  const {
    pathname,
    query: { modal },
    push,
  } = useRouter();

  const toggleModal = () =>
    push(
      `${pathname}${
        !modal && modal !== 'add-liquidity' ? '?modal=add-liquidity' : ''
      }`
    );

  return (
    <>
      <Box
        my="L"
        pb="XL"
        px="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="40rem"
        borderRadius="M"
      >
        <Box
          py="L"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="normal" width="100%">
            Pools Overview
          </Typography>
          <Button
            variant="primary"
            px="L"
            width="10rem"
            fontWeight="600"
            type="button"
            onClick={toggleModal}
          >
            Add Liquidity
          </Button>
        </Box>
        <Typography variant="normal" as="hr" color="#33373B" mb="L" />
        <Liquidity
          Par1TokenSVG={DefaultTokenSVG}
          Par2TokenSVG={DefaultTokenSVG}
          par1Token="UNI"
          par2Token="BTC"
          perceptual="10"
          minValue="1,715,100,000,000,000"
          maxValue="1,715,100,000,000,000"
          hasWarning
        />
        <Liquidity
          Par1TokenSVG={DefaultTokenSVG}
          Par2TokenSVG={DefaultTokenSVG}
          par1Token="UNI"
          par2Token="BTC"
          perceptual="10"
          minValue="1,715,100,000,000,000"
          maxValue="1,715,100,000,000,000"
          hasWarning
        />
        {false && <NonHasPool />}
      </Box>
      <AddLiquidity
        isOpen={!!modal && (modal as string) === 'add-liquidity'}
        handleClose={toggleModal}
      />
    </>
  );
};

export default PoolView;
