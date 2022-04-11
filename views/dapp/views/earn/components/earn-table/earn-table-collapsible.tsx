import Link from 'next/link';
import { FC, useState } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { formatDollars, formatMoney } from '@/utils/string';

import EarnCard from './earn-card';
import { EarnTableCollapsibleProps } from './earn-table.types';

const EarnTableCollapsible: FC<EarnTableCollapsibleProps> = ({
  earnedAmount,
  stakedAmount,
  earnedAmountUSD,
  stakedAmountUSD,
  stakeRequestApproval,
  availableAmount,
  availableAmountUSD,
  symbol,
}) => {
  const [stakedApproved, setStakedApproved] = useState(!stakeRequestApproval);

  const handleApprove = () => setStakedApproved(true);

  return (
    <Box
      columnGap="1rem"
      borderTop="1px solid"
      borderColor="textSoft"
      p={['S', 'S', 'S', 'L']}
      gridTemplateColumns="1fr 1fr 1fr"
      display={['flex', 'flex', 'flex', 'grid']}
      flexDirection={['column', 'column', 'column', 'unset']}
    >
      <EarnCard
        title="Available"
        amountUSD={formatDollars(availableAmountUSD)}
        amount={`${formatMoney(availableAmount)} ${symbol}`}
        button={
          <Button variant="primary" hover={{ bg: 'accentActive' }}>
            Get {symbol}
          </Button>
        }
      />
      <EarnCard
        title="Staked"
        amountUSD={formatDollars(stakedAmountUSD)}
        amount={`${formatMoney(stakedAmount)} ${symbol}`}
        button={
          !stakedApproved ? (
            <Button
              variant="primary"
              onClick={handleApprove}
              hover={{ bg: 'accentActive' }}
            >
              Enable Form
            </Button>
          ) : (
            <Box
              display="flex"
              justifyContent="space-evenly"
              px={['NONE', 'NONE', 'NONE', 'XL']}
            >
              <Link
                href={`${Routes[RoutesEnum.Earn]}?modal=stake&token=${symbol}`}
              >
                <Button variant="primary" mr="S" hover={{ bg: 'accentActive' }}>
                  +
                </Button>
              </Link>
              <Link
                href={`${
                  Routes[RoutesEnum.Earn]
                }?modal=unstake&token=${symbol}`}
              >
                <Button
                  bg="error"
                  variant="primary"
                  hover={{ bg: 'errorActive' }}
                >
                  -
                </Button>
              </Link>
            </Box>
          )
        }
      />
      <EarnCard
        title="Earned"
        shadow={!!earnedAmount}
        amountUSD={formatDollars(earnedAmountUSD)}
        amount={`${formatMoney(earnedAmount)} ${symbol}`}
        button={
          <Button
            variant="primary"
            disabled={!earnedAmount}
            bg={earnedAmount ? 'success' : 'disabled'}
            cursor={earnedAmount ? 'pointer' : 'not-allowed'}
            hover={{ bg: earnedAmount ? 'successActive' : 'disabled' }}
          >
            Harvest
          </Button>
        }
      />
    </Box>
  );
};

export default EarnTableCollapsible;
