import { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addAllowance, depositLP, withdrawLP } from '@/api';
import { Routes, RoutesEnum, StakeState } from '@/constants';
import { Typography } from '@/elements';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { useGetSigner } from '@/hooks';
import { TOKEN_SYMBOL, ZERO_BIG_NUMBER } from '@/sdk';
import { FixedPointMath } from '@/sdk/entities/fixed-point-math';
import { coreActions } from '@/state/core/core.actions';
import { LoadingSVG } from '@/svg';
import {
  formatDollars,
  formatMoney,
  getCasaDePapelAddress,
  makeFarmSymbol,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';

import EarnCard from '../earn-farm-card';
import EarnStakeModal from '../earn-stake-modal';
import { EarnFarmOptionsProps } from './earn-farm-options.types';

const EarnFarmOptions: FC<EarnFarmOptionsProps> = ({
  farm,
  mutate,
  loading,
  intUSDPrice,
}) => {
  const { push } = useRouter();
  const [modal, setModal] = useState<StakeState | undefined>();
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [loadingPool, setLoadingPool] = useState<boolean>(false);

  const { signer, chainId, account } = useGetSigner();

  const dispatch = useDispatch();

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
      setLoadingPool(true);
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
      setLoadingPool(false);
      throwError('Failed to approve', e);
    } finally {
      setLoadingPool(false);
      dispatch(coreActions.updateNativeBalance());
    }
  }, [chainId, signer]);

  const handleApprove = useCallback(() => showToast(approve()), [approve]);

  const harvest = useCallback(async () => {
    if (farm.pendingRewards.isZero()) return;

    const { validId, validSigner } = throwIfInvalidSigner(
      [account],
      chainId,
      signer
    );

    try {
      const tx = await depositLP(
        validId,
        validSigner,
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
      if (farm.balance.isZero()) return;

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
          farm.id,
          amount.add(ethers.utils.parseEther('1')).gt(farm.balance)
            ? farm.balance
            : amount
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
    [chainId, signer, farm.balance.toString()]
  );

  const handleWithdrawTokens = useCallback(
    async (amount: BigNumber) => {
      if (farm.stakingAmount.isZero()) return;

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
          farm.id,
          amount.add(ethers.utils.parseEther('1')).gt(farm.stakingAmount)
            ? farm.stakingAmount
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
    [farm.stakingAmount.toString(), chainId, signer]
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
      bg="foreground"
      borderRadius="L"
      columnGap="1rem"
      p={['S', 'S', 'S', 'L']}
      gridTemplateColumns="1fr 1fr 1fr"
      display={['flex', 'flex', 'flex', 'grid']}
      flexDirection={['column', 'column', 'column', 'unset']}
    >
      <EarnCard
        loading={loading}
        title="Your balance"
        amountUSD={formatDollars(
          FixedPointMath.from(farm.stakingTokenPrice)
            .mul(farm.balance)
            .toNumber()
        )}
        amount={`${formatMoney(
          FixedPointMath.toNumber(farm.balance)
        )} ${farmSymbol}`}
        button={
          <Button
            variant="primary"
            onClick={() =>
              farm.id === 0
                ? push({ pathname: Routes[RoutesEnum.DEX] }).then()
                : push({
                    pathname: Routes[RoutesEnum.DEXPoolDetails],
                    query: { pairAddress: farm.stakingTokenAddress },
                  }).then()
            }
            hover={{
              bg: farm.isLive ? 'accentActive' : 'disabled',
              cursor: farm.isLive ? 'pointer' : 'not-allowed',
            }}
            disabled={!farm.isLive}
            bg={farm.isLive ? 'accent' : 'disabled'}
          >
            Get {farmSymbol}
          </Button>
        }
      />
      <EarnCard
        title="Staked"
        loading={loading}
        amountUSD={formatDollars(
          FixedPointMath.from(farm.stakingTokenPrice)
            .mul(farm.stakingAmount)
            .toNumber()
        )}
        amount={`${formatMoney(
          FixedPointMath.toNumber(farm.stakingAmount)
        )} ${farmSymbol}`}
        button={
          farm.allowance.isZero() ? (
            <Button
              variant="primary"
              onClick={handleApprove}
              hover={{ bg: 'accentActive' }}
            >
              {loadingPool ? (
                <Box as="span" display="flex" justifyContent="center">
                  <Box as="span" display="inline-block" width="1rem">
                    <LoadingSVG width="100%" />
                  </Box>
                  <Typography as="span" variant="normal" ml="M" fontSize="S">
                    Approving...
                  </Typography>
                </Box>
              ) : farm.id === 0 ? (
                'Approve Pool'
              ) : (
                'Approve Farm'
              )}
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
                disabled={farm.balance.isZero() || !farm.isLive}
                onClick={handleChangeModal(StakeState.Stake)}
                bg={
                  farm.balance.isZero() || !farm.isLive ? 'disabled' : 'accent'
                }
                cursor={
                  farm.balance.isZero() || !farm.isLive
                    ? 'not-allowed'
                    : 'pointer'
                }
                hover={{
                  bg:
                    farm.balance.isZero() || !farm.isLive
                      ? 'disabled'
                      : 'accentActive',
                }}
              >
                +
              </Button>
              <Button
                variant="primary"
                disabled={farm.stakingAmount.isZero()}
                onClick={handleChangeModal(StakeState.Unstake)}
                bg={farm.stakingAmount.isZero() ? 'disabled' : 'error'}
                cursor={farm.stakingAmount.isZero() ? 'not-allowed' : 'pointer'}
                hover={{
                  bg: farm.stakingAmount.isZero() ? 'disabled' : 'errorActive',
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
        shadow={!farm.pendingRewards.isZero()}
        amountUSD={formatDollars(
          FixedPointMath.from(intUSDPrice).mul(farm.pendingRewards).toNumber()
        )}
        amount={`${formatMoney(FixedPointMath.toNumber(farm.pendingRewards))} ${
          TOKEN_SYMBOL.INT
        }`}
        button={
          <Button
            onClick={!farm.pendingRewards.isZero() ? handleHarvest : undefined}
            variant="primary"
            disabled={farm.pendingRewards.isZero()}
            bg={!farm.pendingRewards.isZero() ? 'success' : 'disabled'}
            cursor={!farm.pendingRewards.isZero() ? 'pointer' : 'not-allowed'}
            hover={{
              bg: !farm.pendingRewards.isZero() ? 'successActive' : 'disabled',
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
        amount={FixedPointMath.toNumber(
          modal === StakeState.Stake ? farm.balance : farm.stakingAmount
        )}
        farmSymbol={farmSymbol}
      />
    </Box>
  );
};

export default EarnFarmOptions;
