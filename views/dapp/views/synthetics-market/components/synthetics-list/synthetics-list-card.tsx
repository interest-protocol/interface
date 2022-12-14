import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import {
  ERC_20_DATA,
  getSyntheticsMarketSVGByAddress,
  ORACLE_SVG_MAP,
  Routes,
  RoutesEnum,
  SyntheticOracleType,
  TOKENS_SVG_MAP,
} from '@/constants';
import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { FixedPointMath } from '@/sdk';
import { InfoSVG } from '@/svg';
import {
  formatDollars,
  formatMoney,
  getETHERC20Address,
  isSameAddress,
} from '@/utils';

import PriceAware from './price-aware';
import { SyntheticsListCardProps } from './synthetics-list.types';

const ORACLE_NAME = {
  [SyntheticOracleType.ChainLink]: 'ChainLink',
  [SyntheticOracleType.RedStoneConsumer]: 'RedStone',
  [SyntheticOracleType.RedStonePriceAware]: 'RedStone',
};

const SyntheticsListCard: FC<SyntheticsListCardProps> = ({ chainId, data }) => {
  const t = useTranslations();
  const { push } = useRouter();

  const OracleSVG = ORACLE_SVG_MAP[data.oracleType];
  const CollateralSVG = TOKENS_SVG_MAP[chainId][data.collateralAddress];
  const collateralData = ERC_20_DATA[chainId][data.collateralAddress];
  const collateralIsEthers = isSameAddress(
    collateralData.address,
    getETHERC20Address(chainId)
  );

  return (
    <Box
      p="XL"
      key={v4()}
      display="flex"
      bg="foreground"
      cursor="pointer"
      borderRadius="L"
      border="1px solid"
      flexDirection="column"
      borderColor="foreground"
      justifyContent="space-between"
      hover={{
        borderColor: 'accent',
      }}
      onClick={() =>
        push({
          pathname: Routes[RoutesEnum.SyntheticsMarketMint],
          query: { address: data.marketAddress },
        })
      }
    >
      <Box key={v4()} display="flex" alignItems="center" flexDirection="column">
        <Box display="flex" position="relative">
          {getSyntheticsMarketSVGByAddress(chainId, data.marketAddress).map(
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
          <Box
            right="0"
            bottom="0"
            width="1.3rem"
            height="1.3rem"
            border="3px solid"
            position="absolute"
            borderRadius="50%"
            boxSizing="content-box"
            borderColor="foreground"
            data-tip={t('common.collateral')}
          >
            <CollateralSVG width="100%" maxHeight="1.3rem" maxWidth="1.3rem" />
          </Box>
        </Box>
        <Typography variant="normal" textAlign="center" my="M">
          {data.symbol}
        </Typography>
        <Typography
          cursor="help"
          fontSize="L"
          fontWeight="600"
          variant="normal"
        >
          {SyntheticOracleType.RedStonePriceAware == data.oracleType ? (
            <PriceAware
              market={data}
              collateralSymbol={collateralData.symbol}
            />
          ) : collateralIsEthers ? (
            `${formatMoney(FixedPointMath.toNumber(data.syntheticUSDPrice))} ${
              collateralData.symbol
            }`
          ) : (
            formatDollars(FixedPointMath.toNumber(data.syntheticUSDPrice))
          )}
        </Typography>
        <Typography
          my="S"
          fontSize="S"
          cursor="help"
          variant="normal"
          data-tip={t('syntheticsMarket.tableHeading.TVLTip')}
        >
          {`${
            collateralIsEthers
              ? `${formatMoney(FixedPointMath.from(data.TVL).toNumber())} ${
                  collateralData.symbol
                }`
              : formatDollars(FixedPointMath.from(data.TVL).toNumber())
          } TVL`}
        </Typography>
        <Box
          my="S"
          fontSize="S"
          cursor="help"
          display="flex"
          alignItems="center"
          data-tip={t('syntheticsMarket.tableHeading.userSyntheticMinted')}
        >
          {formatMoney(FixedPointMath.toNumber(data.userSyntheticMinted))}
        </Box>
      </Box>
      <Box>
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
            : {FixedPointMath.from(data.LTV).toPercentage(4)}
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
            : {FixedPointMath.from(data.transferFee).toPercentage(2)}
          </Box>
        </Box>
        <Box mt="M" display="flex" alignItems="center" justifyContent="center">
          <Typography fontSize="S" variant="normal" color="textSecondary">
            {t('common.poweredBy')} {ORACLE_NAME[data.oracleType]}
          </Typography>
          <Box ml="S" mt="XS" width="1.2rem">
            <OracleSVG width="100%" maxHeight="1.2rem" maxWidth="1.2rem" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SyntheticsListCard;
