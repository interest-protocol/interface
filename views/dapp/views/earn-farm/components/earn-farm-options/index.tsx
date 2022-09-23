import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC, useCallback, useState } from 'react';

import { Routes, RoutesEnum, StakeState } from '@/constants';
import { Typography } from '@/elements';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { useApprove } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { FixedPointMath } from '@/sdk/entities/fixed-point-math';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  formatDollars,
  formatMoney,
  getCasaDePapelAddress,
  makeFarmSymbol,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';
import { useHarvest } from '@/views/dapp/views/earn-farm/components/earn-farm-options/use-farm-options.hooks';

import EarnCard from '../earn-farm-card';
import EarnStakeModal from '../earn-stake-modal';
import { EarnFarmOptionsProps } from './earn-farm-options.types';

const EarnFarmOptions: FC<EarnFarmOptionsProps> = ({
  farm,
  refetch,
  loading,
  intUSDPrice,
}) => {
  const t = useTranslations();
  const { push } = useRouter();
  const [modal, setModal] = useState<StakeState | undefined>();
  const [loadingPool, setLoadingPool] = useState<boolean>(false);

  const { writeAsync: _approve } = useApprove(
    farm.stakingTokenAddress,
    getCasaDePapelAddress(farm.chainId),
    { enabled: farm.allowance.isZero() }
  );

  const { writeAsync: _harvest } = useHarvest(farm);

  const farmSymbol =
    farm.id === 0
      ? TOKEN_SYMBOL.INT
      : makeFarmSymbol(farm.chainId, farm.token0, farm.token1);

  const approve = useCallback(async () => {
    try {
      setLoadingPool(true);
      const tx = await _approve?.();
      await showTXSuccessToast(tx, farm.chainId);
      await refetch();
    } catch (e) {
      setLoadingPool(false);
      throwError(t('error.generic'), e);
    } finally {
      setLoadingPool(false);
    }
  }, [_approve, refetch, farm.chainId]);

  const handleApprove = useCallback(
    () =>
      showToast(approve(), {
        success: capitalize(t('common.success')),
        error: propOr(capitalize(t('common.error')), 'message'),
        loading: capitalize(t('common.approve', { isLoading: 1 })),
      }),
    [approve]
  );

  const harvest = useCallback(async () => {
    if (farm.pendingRewards.isZero()) return;
    setLoadingPool(true);

    try {
      const tx = await _harvest?.();

      await showTXSuccessToast(tx, farm.chainId);
      await refetch();
    } catch (e) {
      throwError(t('error.generic'), e);
    } finally {
      setLoadingPool(false);
    }
  }, [_harvest, farm.chainId]);

  const handleHarvest = useCallback(
    () =>
      showToast(harvest(), {
        success: capitalize(t('common.success')),
        error: propOr(capitalize(t('common.error')), 'message'),
        loading: t('earnTokenAddress.thirdCardButton', { isLoading: 1 }),
      }),
    [harvest]
  );

  const handleCloseModal = () => setModal(undefined);

  const handleChangeModal = (target: StakeState) => () => setModal(target);

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
        title={capitalize(t('common.yourBalance'))}
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
            <Typography
              as="span"
              variant="normal"
              ml="M"
              fontSize="S"
              textTransform="capitalize"
            >
              {t('common.get') + ' ' + farmSymbol}
            </Typography>
          </Button>
        }
      />
      <EarnCard
        title={t('earnTokenAddress.secondCardTitle')}
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
                  <Typography
                    as="span"
                    variant="normal"
                    ml="M"
                    fontSize="S"
                    textTransform="capitalize"
                  >
                    {capitalize(t('common.approve', { isLoading: 1 }))}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  as="span"
                  variant="normal"
                  ml="M"
                  fontSize="S"
                  textTransform="capitalize"
                >
                  {
                    (t('common.approve', { isLoading: 0 }) +
                      ' ' +
                      t(
                        farm.id === 0 ? 'common.pool' : 'common.farm'
                      )) as string
                  }
                </Typography>
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
        title={t('earnTokenAddress.thirdCardTitle')}
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
            {t('earnTokenAddress.thirdCardButton', { isLoading: +loadingPool })}
          </Button>
        }
      />
      <EarnStakeModal
        farm={farm}
        modal={modal}
        handleClose={handleCloseModal}
        amount={FixedPointMath.toNumber(
          modal === StakeState.Stake ? farm.balance : farm.stakingAmount
        )}
        farmSymbol={farmSymbol}
        refetch={refetch}
      />
    </Box>
  );
};

export default EarnFarmOptions;
