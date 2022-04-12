import { FC, useState } from 'react';

import Box from '@/elements/box';
import Button from '@/elements/button';
import { formatDollars, formatMoney } from '@/utils/string';

import EarnStakeModal from '../earn-stake-modal';
import { TToken } from '../earn-stake-modal/earn-stake-modal.types';
import EarnCard from './earn-card';
import { EarnTableCollapsibleProps } from './earn-table.types';

const EarnTableCollapsible: FC<EarnTableCollapsibleProps> = ({
  symbol,
  earnedAmount,
  stakedAmount,
  earnedAmountUSD,
  stakedAmountUSD,
  availableAmount,
  availableAmountUSD,
  stakeRequestApproval,
}) => {
  const [modal, setModal] = useState<'stake' | 'unstake' | undefined>();
  const [stakedApproved, setStakedApproved] = useState(!stakeRequestApproval);

  const handleApprove = () => setStakedApproved(true);

  const handleCloseModal = () => setModal(undefined);

  const handleChangeModal = (target: 'stake' | 'unstake') => () =>
    setModal(target);

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
              <Button
                variant="primary"
                mr="S"
                hover={{ bg: 'accentActive' }}
                onClick={handleChangeModal('stake')}
              >
                +
              </Button>
              <Button
                bg="error"
                variant="primary"
                hover={{ bg: 'errorActive' }}
                onClick={handleChangeModal('unstake')}
              >
                -
              </Button>
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
      <EarnStakeModal
        modal={modal}
        balance={stakedAmount}
        token={symbol as TToken}
        handleClose={handleCloseModal}
      />
    </Box>
  );
};

export default EarnTableCollapsible;
