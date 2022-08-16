import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatMoney } from '@/utils';

import { YourBalanceProps } from './your-balance.types';

const YourBalance: FC<YourBalanceProps> = ({
  loading,
  dineroPair,
  tokenSymbols,
}) => (
  <Box
    py="XL"
    order={3}
    gridArea="e"
    bg="foreground"
    borderRadius="L"
    px={['XL', 'XXL']}
  >
    <Typography variant="normal" textTransform="uppercase" mt="L">
      Your balance:
    </Typography>
    {loading ? (
      <Box my="XL" rowGap="0.7rem" display="grid" gridTemplateRows="1fr 1fr">
        <Skeleton wrapper={Box} />
        <Skeleton wrapper={Box} />
      </Box>
    ) : (
      dineroPair?.toArray().map((x) => {
        const erc20 = x.currencyAmount.currency;
        const SVG = TOKENS_SVG_MAP[erc20.symbol];

        const TokenAIcon =
          TOKENS_SVG_MAP[tokenSymbols[0]] ??
          TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

        const TokenBIcon =
          tokenSymbols[1] &&
          (TOKENS_SVG_MAP[tokenSymbols[1]] ??
            TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown]);

        return (
          <Box my="L" key={v4()} display="flex" justifyContent="space-between">
            <Box display="flex">
              {erc20.symbol === TOKEN_SYMBOL.DNR ? (
                <>
                  <Box as="span" display="inline-block" width="1rem">
                    <SVG width="100%" />
                  </Box>
                  <Typography ml="M" variant="normal">
                    {erc20.name}
                  </Typography>
                </>
              ) : (
                <>
                  <Box as="span" display="inline-block" width="1rem">
                    <TokenAIcon width="100%" />
                  </Box>
                  {TokenBIcon && (
                    <Box
                      as="span"
                      display="inline-block"
                      width="1rem"
                      ml="-0.3rem"
                    >
                      <TokenBIcon width="100%" />
                    </Box>
                  )}
                  <Typography ml="M" variant="normal">
                    {TokenBIcon ? `LP (${tokenSymbols.join('-')})` : erc20.name}
                  </Typography>
                </>
              )}
            </Box>
            <Typography
              variant="normal"
              maxWidth="10rem"
              overflow="hidden"
              textAlign="right"
              whiteSpace="nowrap"
              color="textSecondary"
            >
              {formatMoney(+x.currencyAmount.toSignificant(6))}
            </Typography>
          </Box>
        );
      })
    )}
  </Box>
);

export default YourBalance;
