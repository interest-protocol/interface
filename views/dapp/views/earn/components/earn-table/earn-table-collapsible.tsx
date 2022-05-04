import { BigNumber } from 'ethers';
import { FC, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { addAllowance, depositLP, withdrawLP } from '@/api';
import { StakeState } from '@/constants';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { useGetUserFarmData } from '@/hooks';
import { ZERO_BIG_NUMBER } from '@/sdk';
import { IntMath } from '@/sdk/entities/int-math';
import { getAccount, getChainId } from '@/state/core/core.selectors';
import {
  formatDollars,
  getCasaDePapelAddress,
  showTXSuccessToast,
  throwError,
  throwIfInvalidAccountAndChainId,
} from '@/utils';

import EarnStakeModal from '../earn-stake-modal';
import EarnCard from './earn-card';
import { EarnTableCollapsibleProps } from './earn-table.types';

const safeData = {
  allowance: ZERO_BIG_NUMBER,
  balance: ZERO_BIG_NUMBER,
  stakingAmount: ZERO_BIG_NUMBER,
  pendingRewards: ZERO_BIG_NUMBER,
};

const EarnTableCollapsible: FC<EarnTableCollapsibleProps> = ({
  farmTokenPrice,
  farm,
}) => {
  const [modal, setModal] = useState<StakeState | undefined>();
  const [stakedApproved, setStakedApproved] = useState(true);

  const account = useSelector(getAccount) as string;
  const chainId = useSelector(getChainId) as number | null;

  const { data, error, mutate } = useGetUserFarmData(
    farm.stakingToken.address,
    farm.id
  );

  const loading = useMemo(() => !error && !data, [error, data]);

  const processedData = useMemo(() => (data ? data : safeData), [data]);

  const handleApprove = () =>
    toast.promise(
      (async () => {
        const validId = throwIfInvalidAccountAndChainId([account], chainId);

        try {
          const tx = await addAllowance(
            validId,
            account,
            farm.stakingToken.address,
            getCasaDePapelAddress(validId)
          );

          await showTXSuccessToast(tx);
          await mutate();
          setStakedApproved(true);
        } catch (e) {
          throwError('Failed to approve', e);
        }
      })(),
      {
        loading: 'Loading...',
        success: 'Success',
        error: (e) => e.message,
      }
    );

  const handleHarvest = () =>
    toast.promise(
      (async () => {
        if (processedData.pendingRewards.isZero()) return;

        const validId = throwIfInvalidAccountAndChainId([account], chainId);

        try {
          const tx = await depositLP(
            validId,
            account,
            farm.id,
            ZERO_BIG_NUMBER
          );

          await showTXSuccessToast(tx);
          await mutate();
        } catch (e) {
          throwError('Failed to harvest rewards', e);
        }
      })(),
      {
        loading: 'Loading...',
        success: 'Success',
        error: (e) => e.message,
      }
    );

  const handleCloseModal = () => setModal(undefined);

  const handleChangeModal = (target: StakeState) => () => setModal(target);

  const handleDepositTokens = async (amount: BigNumber) => {
    if (processedData.balance.isZero()) return;

    try {
      const validId = throwIfInvalidAccountAndChainId([account], chainId);
      const tx = await depositLP(validId, account, farm.id, amount);

      await showTXSuccessToast(tx);
      await mutate();
    } catch (e) {
      throwError('Failed to deposit', e);
    }
  };

  const handleWithdrawTokens = async (amount: BigNumber) => {
    if (processedData.balance.isZero()) return;

    try {
      const validId = throwIfInvalidAccountAndChainId([account], chainId);
      const tx = await withdrawLP(validId, account, farm.id, amount);

      await showTXSuccessToast(tx);
      await mutate();
    } catch (e) {
      throw e || new Error('Something Went Wrong');
    }
  };

  const handleUnstake = (value: BigNumber) =>
    toast.promise(handleWithdrawTokens(value), {
      loading: 'Loading...',
      success: 'Success!',
      error: (e) => e.message,
    });

  const handleStake = (value: BigNumber) =>
    toast.promise(handleDepositTokens(value), {
      loading: 'Loading...',
      success: 'Success!',
      error: (e) => e.message,
    });

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
        loading={loading}
        title="Available"
        amountUSD={formatDollars(IntMath.toNumber(farmTokenPrice.numerator))}
        amount={`${IntMath.toNumber(processedData.balance)} ${farm.farmSymbol}`}
        button={
          <Button variant="primary" hover={{ bg: 'accentActive' }}>
            Get {farm.farmSymbol}
          </Button>
        }
      />
      <EarnCard
        title="Staked"
        loading={loading}
        amountUSD={formatDollars(IntMath.toNumber(farmTokenPrice.numerator))}
        amount={`${IntMath.toNumber(processedData.stakingAmount)} ${
          farm.farmSymbol
        }`}
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
                onClick={handleChangeModal(StakeState.Stake)}
              >
                +
              </Button>
              <Button
                bg="error"
                variant="primary"
                hover={{ bg: 'errorActive' }}
                onClick={handleChangeModal(StakeState.Unstake)}
              >
                -
              </Button>
            </Box>
          )
        }
      />
      <EarnCard
        title="Earned"
        loading={loading}
        shadow={!processedData.pendingRewards.isZero()}
        amountUSD={formatDollars(IntMath.toNumber(farmTokenPrice.numerator))}
        amount={`${IntMath.toNumber(processedData.pendingRewards)} ${
          farm.farmSymbol
        }`}
        button={
          <Button
            onClick={
              !processedData.pendingRewards.isZero() ? handleHarvest : undefined
            }
            variant="primary"
            disabled={processedData.pendingRewards.isZero()}
            bg={!processedData.pendingRewards.isZero() ? 'success' : 'disabled'}
            cursor={
              !processedData.pendingRewards.isZero() ? 'pointer' : 'not-allowed'
            }
            hover={{
              bg: !processedData.pendingRewards.isZero()
                ? 'successActive'
                : 'disabled',
            }}
          >
            Harvest
          </Button>
        }
      />
      <EarnStakeModal
        modal={modal}
        onStake={handleStake}
        onUnstake={handleUnstake}
        balance={processedData.balance}
        handleClose={handleCloseModal}
        symbol={farm.farmSymbol}
        poolId={farm.id}
      />
    </Box>
  );
};

export default EarnTableCollapsible;
