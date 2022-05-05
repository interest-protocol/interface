import { BigNumber } from 'ethers';
import { FC, useCallback, useMemo, useState } from 'react';

import { addAllowance, depositLP, withdrawLP } from '@/api';
import { StakeState } from '@/constants';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { useGetSigner, useGetUserFarmData } from '@/hooks';
import { ZERO_BIG_NUMBER } from '@/sdk';
import { IntMath } from '@/sdk/entities/int-math';
import {
  formatDollars,
  getCasaDePapelAddress,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
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
  intUSDPrice,
}) => {
  const [modal, setModal] = useState<StakeState | undefined>();

  const { signer, chainId, account } = useGetSigner();

  const { data, error, mutate } = useGetUserFarmData(
    farm.stakingToken.address,
    farm.id
  );

  const loading = useMemo(() => !error && !data, [error, data]);

  const processedData = useMemo(() => (data ? data : safeData), [data]);

  const approve = useCallback(async () => {
    const { validId, validSigner } = throwIfInvalidSigner(
      [account],
      chainId,
      signer
    );

    try {
      const tx = await addAllowance(
        validId,
        validSigner,
        account,
        farm.stakingToken.address,
        getCasaDePapelAddress(validId)
      );

      await showTXSuccessToast(tx);
      await mutate();
    } catch (e) {
      throwError('Failed to approve', e);
    }
  }, [chainId, signer]);

  const handleApprove = useCallback(() => showToast(approve()), [approve]);

  const harvest = useCallback(async () => {
    if (processedData.pendingRewards.isZero()) return;

    const { validId, validSigner } = throwIfInvalidSigner(
      [account],
      chainId,
      signer
    );

    try {
      const tx = await depositLP(
        validId,
        validSigner,
        account,
        farm.id,
        ZERO_BIG_NUMBER
      );

      await showTXSuccessToast(tx);
      await mutate();
    } catch (e) {
      throwError('Failed to harvest rewards', e);
    }
  }, [signer, chainId]);

  const handleHarvest = useCallback(() => showToast(harvest()), [harvest]);

  const handleCloseModal = () => setModal(undefined);

  const handleChangeModal = (target: StakeState) => () => setModal(target);

  const handleDepositTokens = useCallback(
    async (amount: BigNumber) => {
      if (processedData.balance.isZero()) return;

      try {
        const { validId, validSigner } = throwIfInvalidSigner(
          [account],
          chainId,
          signer
        );
        const tx = await depositLP(
          validId,
          validSigner,
          account,
          farm.id,
          amount
        );

        await showTXSuccessToast(tx);
        await mutate();
      } catch (e) {
        throwError('Failed to deposit', e);
      }
    },
    [chainId, signer, processedData.balance.toString()]
  );

  const handleWithdrawTokens = useCallback(
    async (amount: BigNumber) => {
      if (processedData.stakingAmount.isZero()) return;

      try {
        const { validId, validSigner } = throwIfInvalidSigner(
          [account],
          chainId,
          signer
        );
        const tx = await withdrawLP(
          validId,
          validSigner,
          account,
          farm.id,
          amount
        );

        await showTXSuccessToast(tx);
        await mutate();
      } catch (e) {
        throw e || new Error('Something Went Wrong');
      }
    },
    [processedData.stakingAmount.toString(), chainId, signer]
  );

  const handleUnstake = useCallback(
    (value: BigNumber) => showToast(handleWithdrawTokens(value)),
    [handleWithdrawTokens]
  );

  const handleStake = useCallback(
    (value: BigNumber) => showToast(handleDepositTokens(value)),
    [handleDepositTokens]
  );

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
        amountUSD={formatDollars(
          IntMath.from(farmTokenPrice.numerator)
            .mul(processedData.balance)
            .toNumber()
        )}
        amount={`${IntMath.toNumber(
          processedData.balance,
          farm.stakingToken.decimals
        )} ${farm.farmSymbol}`}
        button={
          <Button variant="primary" hover={{ bg: 'accentActive' }}>
            Get {farm.farmSymbol}
          </Button>
        }
      />
      <EarnCard
        title="Staked"
        loading={loading}
        amountUSD={formatDollars(
          IntMath.from(farmTokenPrice.numerator)
            .mul(processedData.stakingAmount)
            .toNumber(farm.stakingToken.decimals)
        )}
        amount={`${IntMath.toNumber(
          processedData.stakingAmount,
          farm.stakingToken.decimals
        )} ${farm.farmSymbol}`}
        button={
          processedData.allowance.isZero() ? (
            <Button
              variant="primary"
              onClick={handleApprove}
              hover={{ bg: 'accentActive' }}
            >
              {farm.isPool ? 'Enable Pool' : 'Enable Farm'}
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
                disabled={processedData.balance.isZero()}
                onClick={handleChangeModal(StakeState.Stake)}
              >
                +
              </Button>
              <Button
                bg="error"
                variant="primary"
                hover={{ bg: 'errorActive' }}
                disabled={processedData.stakingAmount.isZero()}
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
        amountUSD={formatDollars(
          IntMath.from(intUSDPrice).mul(processedData.pendingRewards).toNumber()
        )}
        amount={`${IntMath.toNumber(
          processedData.pendingRewards,
          farm.getRewardTokenMetaData().decimals
        )} ${farm.getRewardTokenMetaData().symbol}`}
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
        balance={IntMath.toNumber(
          processedData.balance,
          farm.stakingToken.decimals
        )}
        handleClose={handleCloseModal}
        symbol={farm.farmSymbol}
        poolId={farm.id}
      />
    </Box>
  );
};

export default EarnTableCollapsible;