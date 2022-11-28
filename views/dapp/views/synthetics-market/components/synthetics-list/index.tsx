import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { v4 } from 'uuid';

import {
  getSyntheticsMarketSVGByAddress,
  Routes,
  RoutesEnum,
} from '@/constants';
import colors from '@/design-system/landing-page-theme/colors';
import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { InfoSVG } from '@/svg';
import { formatDollars, formatMoney } from '@/utils';
import { getLPToastOption } from '@/views/home/layout/layout.utils';

import { handleFilterDineroMarkets } from '../../synthetics-market.utils';
import { SyntheticsListProps } from './synthetics-list.types';

const SyntheticsList: FC<SyntheticsListProps> = ({
  control,
  markets,
  chainId,
}) => {
  const t = useTranslations();
  const { push } = useRouter();
  const sortBy = useWatch({ control, name: 'sortBy' });
  const search = useWatch({ control, name: 'search' });
  const onlyMinted = useWatch({ control, name: 'onlyMinted' });

  const filteredMarkets = handleFilterDineroMarkets(
    markets,
    sortBy,
    search,
    onlyMinted
  );

  return (
    <>
      <Box
        display="grid"
        gridGap="1rem"
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr 1fr']}
      >
        {filteredMarkets.map((x) => (
          <Box
            p="XL"
            key={v4()}
            display="flex"
            bg="foreground"
            cursor="pointer"
            borderRadius="L"
            border="1px solid"
            borderColor="foreground"
            hover={{
              borderColor: 'accent',
            }}
            flexDirection="column"
            onClick={() =>
              push({
                pathname: Routes[RoutesEnum.SyntheticsMarketMint],
                query: { address: x.marketAddress },
              })
            }
          >
            <Box
              key={v4()}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Box display="flex">
                {getSyntheticsMarketSVGByAddress(chainId, x.marketAddress).map(
                  ({ SVG, highZIndex }, index) => (
                    <Box
                      key={v4()}
                      width="4rem"
                      ml={index != 0 ? '-1rem' : 'NONE'}
                      zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
                    >
                      <SVG width="100%" maxHeight="4rem" maxWidth="4rem" />
                    </Box>
                  )
                )}
              </Box>
              <Typography variant="normal" textAlign="center" my="M">
                {x.name}
              </Typography>
              <Typography
                cursor="help"
                fontSize="L"
                fontWeight="600"
                variant="normal"
              >
                {formatDollars(FixedPointMath.toNumber(x.syntheticUSDPrice))}
              </Typography>
              <Typography
                my="S"
                fontSize="S"
                cursor="help"
                variant="normal"
                data-tip={t('syntheticsMarket.tableHeading.TVLTip')}
              >
                {`${formatDollars(FixedPointMath.from(x.TVL).toNumber())} TVL`}
              </Typography>
              <Box
                my="S"
                fontSize="S"
                cursor="help"
                display="flex"
                alignItems="center"
                data-tip={t(
                  'syntheticsMarket.tableHeading.userSyntheticMinted'
                )}
              >
                {formatMoney(FixedPointMath.toNumber(x.userSyntheticMinted))}
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="L">
              <Box my="S" fontSize="S" display="flex" alignItems="center">
                <Box
                  mr="S"
                  as="span"
                  width="1rem"
                  cursor="help"
                  display="inline-block"
                  data-tip={t('syntheticsMarket.tableHeading.LTVTip')}
                >
                  <InfoSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
                </Box>
                <Typography as="span" variant="normal" fontSize="inherit">
                  LTV
                </Typography>
                : {FixedPointMath.from(x.LTV).toPercentage(0)}
              </Box>
              <Box my="S" fontSize="S" display="flex" alignItems="center">
                <Box
                  mr="S"
                  as="span"
                  width="1rem"
                  cursor="help"
                  display="inline-block"
                  data-tip={t('syntheticsMarket.tableHeading.feeTip')}
                >
                  <InfoSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
                </Box>
                <Typography as="span" variant="normal" fontSize="inherit">
                  {t('syntheticsMarket.tableHeading.fee')}
                </Typography>
                : {FixedPointMath.from(x.transferFee).toPercentage(2)}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={getLPToastOption(colors)}
      />
    </>
  );
};

export default SyntheticsList;
