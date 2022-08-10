import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';
import { FC, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addAllowance, depositLP, withdrawLP } from '@/api';
import { Routes, RoutesEnum, StakeState } from '@/constants';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { useGetSigner, useGetUserFarmData } from '@/hooks';
import { TOKEN_SYMBOL, ZERO_BIG_NUMBER } from '@/sdk';
import { IntMath } from '@/sdk/entities/int-math';
import { coreActions } from '@/state/core/core.actions';
import {
  formatDollars,
  getCasaDePapelAddress,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';

import { makeFarmSymbol } from '../../utils';
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
  farm,
  intUSDPrice,
}) => {
  const { push } = useRouter();
  const [modal, setModal] = useState<StakeState | undefined>();
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const { signer, chainId, account } = useGetSigner();

  const dispatch = useDispatch();

  const { data, error, mutate } = useGetUserFarmData(
    farm.stakingTokenAddress,
    farm.id
  );

  const loading = useMemo(() => !error && !data, [error, data]);

  const processedData = useMemo(() => (data ? data : safeData), [data]);

  const farmSymbol =
    farm.id === 0
      ? TOKEN_SYMBOL.INT
      : makeFarmSymbol(farm.chainId, farm.token0, farm.token1);

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
        farm.stakingTokenAddress,
        getCasaDePapelAddress(validId)
      );

      await showTXSuccessToast(tx, validId);
      await mutate();
    } catch (e) {
      throwError('Failed to approve', e);
    } finally {
      dispatch(coreActions.updateNativeBalance());
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

      await showTXSuccessToast(tx, validId);
      await mutate();
    } catch (e) {
      throwError('Failed to harvest rewards', e);
    } finally {
      dispatch(coreActions.updateNativeBalance());
    }
  }, [signer, chainId]);

  const handleHarvest = useCallback(() => showToast(harvest()), [harvest]);

  const handleCloseModal = () => setModal(undefined);

  const handleChangeModal = (target: StakeState) => () => setModal(target);

  const handleDepositTokens = useCallback(
    async (amount: BigNumber) => {
      if (processedData.balance.isZero()) return;

      setModalLoading(true);
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
          amount.gt(processedData.balance) ? processedData.balance : amount
        );

        await showTXSuccessToast(tx, validId);
        await mutate();
      } catch (e) {
        throwError('Failed to deposit', e);
      } finally {
        setModalLoading(false);
        handleCloseModal();
        dispatch(coreActions.updateNativeBalance());
      }
    },
    [chainId, signer, processedData.balance.toString()]
  );

  const handleWithdrawTokens = useCallback(
    async (amount: BigNumber) => {
      if (processedData.stakingAmount.isZero()) return;

      setModalLoading(true);
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
          amount.gt(processedData.stakingAmount)
            ? processedData.stakingAmount
            : amount
        );

        await showTXSuccessToast(tx, validId);
        await mutate();
      } catch (e) {
        throw e || new Error('Something Went Wrong');
      } finally {
        setModalLoading(false);
        handleCloseModal();
        dispatch(coreActions.updateNativeBalance());
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
        title="Your balance"
        amountUSD={formatDollars(
          IntMath.from(farm.stakingTokenPrice)
            .mul(processedData.balance)
            .toNumber()
        )}
        amount={`${IntMath.toNumber(processedData.balance)} ${farmSymbol}`}
        button={
          <Button
            variant="primary"
            onClick={() =>
              farm.id === 0
                ? push({ pathname: Routes[RoutesEnum.DEX] })
                : push(
                    {
                      pathname: Routes[RoutesEnum.DEXFindPool],
                      query: {
                        pairAddress: farm.stakingTokenAddress,
                      },
                    },
                    undefined,
                    { shallow: true }
                  )
            }
            hover={{ bg: 'accentActive' }}
          >
            Get {farmSymbol}
          </Button>
        }
      />
      <EarnCard
        title="Staked"
        loading={loading}
        amountUSD={formatDollars(
          IntMath.from(farm.stakingTokenPrice)
            .mul(processedData.stakingAmount)
            .toNumber()
        )}
        amount={`${IntMath.toNumber(
          processedData.stakingAmount
        )} ${farmSymbol}`}
        button={
          processedData.allowance.isZero() ? (
            <Button
              variant="primary"
              onClick={handleApprove}
              hover={{ bg: 'accentActive' }}
            >
              {farm.id === 0 ? 'Enable Pool' : 'Enable Farm'}
            </Button>
          ) : (
            <Box
              display="flex"
              justifyContent="space-evenly"
              px={['NONE', 'NONE', 'NONE', 'XL']}
            >
              <Button
                mr="S"
                variant="primary"
                disabled={processedData.balance.isZero()}
                onClick={handleChangeModal(StakeState.Stake)}
                bg={processedData.balance.isZero() ? 'disabled' : 'accent'}
                cursor={
                  processedData.balance.isZero() ? 'not-allowed' : 'pointer'
                }
                hover={{
                  bg: processedData.balance.isZero()
                    ? 'disabled'
                    : 'accentActive',
                }}
              >
                +
              </Button>
              <Button
                variant="primary"
                disabled={processedData.stakingAmount.isZero()}
                onClick={handleChangeModal(StakeState.Unstake)}
                bg={processedData.stakingAmount.isZero() ? 'disabled' : 'error'}
                cursor={
                  processedData.stakingAmount.isZero()
                    ? 'not-allowed'
                    : 'pointer'
                }
                hover={{
                  bg: processedData.stakingAmount.isZero()
                    ? 'disabled'
                    : 'errorActive',
                }}
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
        amount={`${IntMath.toNumber(processedData.pendingRewards)} ${
          TOKEN_SYMBOL.INT
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
        farm={farm}
        modal={modal}
        onStake={handleStake}
        loading={modalLoading}
        onUnstake={handleUnstake}
        handleClose={handleCloseModal}
        amount={IntMath.toNumber(
          modal === StakeState.Stake
            ? processedData.balance
            : processedData.stakingAmount
        )}
        farmSymbol={farmSymbol}
      />
    </Box>
  );
};

export default EarnTableCollapsible;
