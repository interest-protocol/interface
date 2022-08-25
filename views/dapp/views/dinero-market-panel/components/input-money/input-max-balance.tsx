import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { IntMath } from '@/sdk';
import { formatMoney } from '@/utils';

import { calculateBorrowAmount } from '../../dinero-market.utils';
import { InputMaxBalanceProps } from './input-money.types';

const InputMaxBalance: FC<InputMaxBalanceProps> = ({
  max,
  data,
  isDNR,
  control,
  isBorrow,
}) => {
  const depositCollateral = useWatch({ control, name: 'borrow.collateral' });
  const recalculatedMax = useMemo(
    () =>
      calculateBorrowAmount({
        ...data,
        userCollateral: data.userCollateral.add(
          IntMath.toBigNumber(depositCollateral)
        ),
      }).toNumber(),
    [depositCollateral]
  );

  console.log('>> recalculatedMax :: ', recalculatedMax);
  console.log('>> isDNR:: ', isDNR);
  console.log('>> isBorrow :: ', isBorrow);
  console.log('>> isDNR && isBorrow :: ', isDNR && isBorrow);

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
          {formatMoney((isDNR && isBorrow ? recalculatedMax : max) ?? 0)}
        </Typography>
      </Typography>
    </Box>
  );
};

export default InputMaxBalance;
