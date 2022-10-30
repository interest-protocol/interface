import { ethers } from 'ethers';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { formatMoney, safeToBigNumber } from '@/utils';

import {
  calculateSyntLeftToMint,
  safeAmountToWithdrawRepay,
} from '../../synthetics-market.utils';
import { InputMaxTagProps } from './input-money.types';

const InputMaxTag: FC<InputMaxTagProps> = ({
  max,
  data,
  isBUSD,
  control,
  isMint,
}) => {
  const mintCollateral = useWatch({ control, name: 'mint.collateral' });
  const burnSynt = useWatch({ control, name: 'burn.synt' });

  const recalculatedMax = useMemo(
    () =>
      isMint
        ? calculateSyntLeftToMint({
            ...data,
            adjustedUserCollateral: data.adjustedUserCollateral.add(
              safeToBigNumber(+mintCollateral)
            ),
          })
            .mul(ethers.utils.parseEther('0.9'))
            .toNumber()
        : safeAmountToWithdrawRepay(
            data,
            safeToBigNumber(+burnSynt)
          ).toNumber(),
    [mintCollateral, burnSynt, isMint]
  );

  return (
    <Box
      py="S"
      px="M"
      mb="-1rem"
      bg="bottomBackground"
      borderRadius="M"
      position="relative"
    >
      <Typography fontSize="S" variant="normal">
        Max:{' '}
        <Typography fontSize="S" variant="normal" fontWeight="bold" as="span">
          {formatMoney(
            ((isMint && !isBUSD) || (!isMint && isBUSD)
              ? recalculatedMax
              : max) ?? 0
          )}
        </Typography>
      </Typography>
    </Box>
  );
};

export default InputMaxTag;
