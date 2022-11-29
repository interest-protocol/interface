import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { FC, useCallback, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Box, Button, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk/entities/fixed-point-math';
import { Fraction } from '@/sdk/entities/fraction';
import { InfoSVG } from '@/svg';
import { numberToString } from '@/utils';

import {
  calculateMintAmount,
  calculateUserCurrentLTV,
} from '../../synthetics-market-panel.utils';
import { SyntFormSelectLTVProps } from './synt-form.types';

const LTV_ARRAY = [0, 25, 50, 75, 100];

const INITIAL_STATE = LTV_ARRAY.reduce(
  (acc, x) => ({ ...acc, [x]: false }),
  {} as Record<number, boolean>
);

const SyntFormSelectLtv: FC<SyntFormSelectLTVProps> = ({
  data,
  control,
  isMint,
  setValue,
}) => {
  const t = useTranslations();
  const [selectedState, setSelected] = useState(INITIAL_STATE);

  const mintCollateral = useWatch({
    control,
    name: 'mint.collateral',
  });

  const mintSynt = useWatch({
    control,
    name: 'mint.synt',
  });

  const handleSetMintSynt = (intendedLTV: number) => {
    if (!data) return;
    setValue(
      'mint.synt',
      calculateMintAmount({
        ...data,
        ltv: FixedPointMath.toBigNumber(intendedLTV, 16),
        adjustedUserCollateral: data.adjustedUserCollateral.add(
          FixedPointMath.toBigNumber(mintCollateral)
        ),
      })
        .toNumber()
        .toString()
    );
  };

  const handleSetBurnSynt = (intendedLTV: number) => {
    if (!data) return;

    setValue(
      'burn.synt',
      numberToString(
        intendedLTV === 100
          ? FixedPointMath.from(data.syntBalance).toNumber()
          : FixedPointMath.from(data.syntBalance)
              .mul(FixedPointMath.toBigNumber(intendedLTV / 100))
              .toNumber()
      )
    );
  };

  const ltvRatio = useMemo(() => {
    if (data.ltv.isZero()) return 0;
    return (
      +Fraction.from(data.ltv, ethers.utils.parseEther('1')).toSignificant(4) *
      100
    );
  }, [data.ltv]);

  const isDisabled = useCallback(
    (item: number): boolean => {
      if (!isMint) return data.syntBalance.isZero();

      const collateralBalance = data.collateralBalance.add(data.userCollateral);

      if (isMint && collateralBalance.isZero()) return true;

      if (item >= ltvRatio) return true;

      return calculateUserCurrentLTV(
        data,
        FixedPointMath.toBigNumber(mintCollateral),
        FixedPointMath.toBigNumber(mintSynt)
      ).gte(data.ltv);
    },
    [
      ltvRatio,
      isMint,
      data.syntBalance.toString(),
      data.collateralBalance.toString(),
      data,
      mintCollateral,
      mintSynt,
    ]
  );

  return (
    <Box mt="XL">
      <Box
        p="M"
        display="flex"
        borderRadius="S"
        alignItems="center"
        bg="bottomBackground"
      >
        <Box width="1.2rem" ml="M" mr="L">
          <InfoSVG width="100%" maxHeight="1.2rem" maxWidth="1.2rem" />
        </Box>
        <Typography
          fontSize="S"
          variant="normal"
          lineHeight="1.1rem"
          whiteSpace="pre-line"
        >
          {t(`syntheticsMarketAddress.${isMint ? 'mint' : 'burn'}.cardInfo`, {
            syntheticSymbol: data.syntSymbol,
          })}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" my="L">
        {LTV_ARRAY.map((item) => (
          <Button
            key={v4()}
            width="3rem"
            fontSize="S"
            height="3rem"
            type="button"
            display="flex"
            borderRadius="M"
            variant="secondary"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              isMint ? handleSetMintSynt(item) : handleSetBurnSynt(item);

              setSelected({ ...INITIAL_STATE, [item]: true });
            }}
            disabled={isDisabled(item)}
            cursor={isDisabled(item) ? 'not-allowed' : 'pointer'}
            hover={{
              bg: isDisabled(item) ? 'disabled' : 'accent',
            }}
            active={{
              bg: isDisabled(item) ? 'disabled' : 'accentActive',
            }}
            bg={
              isDisabled(item)
                ? 'disabled'
                : selectedState[item]
                ? 'accentActive'
                : 'bottomBackground'
            }
          >
            {item}%
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default SyntFormSelectLtv;
