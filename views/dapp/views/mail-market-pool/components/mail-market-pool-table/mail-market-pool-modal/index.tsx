import { ethers } from 'ethers';
import { prop } from 'ramda';
import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  addAllowance,
  mailBorrow,
  mailDeposit,
  mailRepay,
  mailWithdraw,
} from '@/api';
import { Switch } from '@/components';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useGetSigner } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { IntMath, ZERO_BIG_NUMBER } from '@/sdk';
import { LoadingSVG, TimesSVG, UnknownCoinSVG } from '@/svg';
import {
  adjustDecimals,
  elasticToPrincipal,
  formatMoney,
  safeToBigNumber,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import ConnectWallet from '@/views/dapp/components/wallet/connect-wallet';

import BorrowRateImpact from './borrow-rate-impact';
import Details from './details';
import InputBalance from './input-balance';
import { getSwitchDefaultData } from './mail-market-pool-modal.data';
import {
  IMAILMarketPoolForm,
  MAILMarketPoolModalProps,
} from './mail-market-pool-modal.types';
import {
  calculateMax,
  calculateTokenValue,
  isBorrowing,
  isRedeeming,
  isRepaying,
  isSupplying,
  processButtonText,
  processLoadingMessage,
} from './utils';

const MAILMarketPoolModal: FC<MAILMarketPoolModalProps> = ({
  type,
  handleClose,
  data,
  totalBorrowsInUSDRecord,
  pool,
  refreshData,
}) => {
  const [base, setBase] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signer } = useGetSigner();
  const { chainId, account } = useIdAccount();

  const SWITCH_DEFAULT_DATA = getSwitchDefaultData(setBase);

  const { register, setValue, getValues, control } =
    useForm<IMAILMarketPoolForm>({
      defaultValues: {
        value: '',
      },
    });

  const tokenValue = useMemo(
    () => calculateTokenValue(data, base, type),
    [data, base, type]
  );

  const max = useMemo(
    () => calculateMax(data, base, type, totalBorrowsInUSDRecord),
    [data, base, totalBorrowsInUSDRecord, type]
  );

  if (!data || !chainId) return null;

  const handleDeposit = async () => {
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const value = getValues('value');

      if (!value) {
        throwError(`No 0 ${data.symbol} deposits`);
      }

      const amount = safeToBigNumber(value, data.decimals);

      const safeAmount = amount.gt(data.balance) ? data.balance : amount;

      const tx = await mailDeposit(
        validId,
        validSigner,
        pool,
        data.tokenAddress,
        safeAmount,
        account
      );

      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Failed to deposit', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async () => {
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const value = getValues('value');

      if (!value) {
        throwError(`You must redeem some ${data.symbol}`);
      }

      const amount = safeToBigNumber(value, data.decimals);

      const safeAmount = amount.gt(data.supply) ? data.supply : amount;

      const tx = await mailWithdraw(
        validId,
        validSigner,
        pool,
        data.tokenAddress,
        safeAmount.gte(data.cash) ? data.cash : safeAmount,
        account
      );

      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Failed to redeem', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRepay = async () => {
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const value = getValues('value');

      if (!value) {
        throwError(`You must repay some ${data.symbol}`);
      }

      const amount = safeToBigNumber(value, data.decimals);

      const safeAmount = amount.gt(data.balance) ? data.balance : amount;

      const adjustedAmount = adjustDecimals(safeAmount, data.decimals);

      const principal = elasticToPrincipal(
        data.totalElastic,
        data.totalBase,
        adjustedAmount
      );

      const safePrincipal = principal.gt(data.borrow) ? data.borrow : principal;

      const tx = await mailRepay(
        validId,
        validSigner,
        pool,
        data.tokenAddress,
        safePrincipal,
        account
      );

      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Failed to repay', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async () => {
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const value = getValues('value');

      if (!value) {
        throwError(`You must borrow some ${data.symbol}`);
      }

      const amount = safeToBigNumber(value, data.decimals);

      const amountInUSD = IntMath.from(amount).mul(data.usdPrice).value();

      const leftAmountToBorrowInUSD =
        totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD.gte(
          totalBorrowsInUSDRecord.totalBorrowInUSD
        )
          ? totalBorrowsInUSDRecord.totalMaxBorrowAmountInUSD.sub(
              totalBorrowsInUSDRecord.totalBorrowInUSD
            )
          : ZERO_BIG_NUMBER;

      const safeAmount = amountInUSD.gt(
        IntMath.from(leftAmountToBorrowInUSD)
          .mul(ethers.utils.parseEther('0.975'))
          .value()
      )
        ? IntMath.from(leftAmountToBorrowInUSD)
            .div(data.usdPrice)
            .mul(ethers.utils.parseEther('0.95'))
            .value()
        : amount;

      const tx = await mailBorrow(
        validId,
        validSigner,
        pool,
        data.tokenAddress,
        safeAmount.gt(data.cash) ? data.cash : safeAmount,
        account
      );

      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Failed to borrow', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAllowance = async () => {
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const tx = await addAllowance(
        validId,
        validSigner,
        account,
        data.tokenAddress,
        pool
      );

      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Failed to give allowance', error);
    } finally {
      setLoading(false);
      refreshData();
    }
  };

  const toastAddAllowance = () =>
    showToast(handleAllowance(), {
      loading: 'Giving allowance...',
      success: 'Success!',
      error: prop('message'),
    });

  const action = () =>
    showToast(
      (async () => {
        if (isSupplying(base, type)) {
          await handleDeposit();
          await refreshData();
          return;
        }

        if (isRedeeming(base, type)) {
          await handleRedeem();
          await refreshData();
          return;
        }

        if (isBorrowing(base, type)) {
          await handleBorrow();
          await refreshData();
          return;
        }
        await handleRepay();
        await refreshData();
      })(),
      {
        loading: processLoadingMessage(base, type, data.symbol),
        success: 'Success!',
        error: prop('message'),
      }
    );

  const SVG = TOKENS_SVG_MAP[data.symbol]
    ? TOKENS_SVG_MAP[data.symbol]
    : UnknownCoinSVG;

  return (
    <Box
      display="flex"
      maxHeight="95vh"
      overflow="hidden"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="flex-end">
        <Box display="flex" textAlign="right" justifyContent="flex-end" mb="M">
          <Button
            px="L"
            variant="primary"
            onClick={handleClose}
            hover={{
              bg: 'accentActive',
            }}
          >
            <TimesSVG width="1rem" height="1rem" />
          </Button>
        </Box>
      </Box>
      <Box
        py="L"
        color="text"
        height="100%"
        width="28rem"
        bg="foreground"
        maxWidth="90vw"
        overflow="auto"
        borderRadius="M"
        px={['L', 'XL']}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="title3"
            fontWeight="normal"
            textTransform="uppercase"
          >
            {type}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" my="L">
          <Switch
            defaultValue={base ? type : SWITCH_DEFAULT_DATA[type][1].value}
            options={SWITCH_DEFAULT_DATA[type]}
          />
        </Box>
        <Box my="XL" bg="background" p="L" borderRadius="M">
          <Typography variant="normal" textTransform="capitalize">
            {(base && type === 'borrow') || (!base && type === 'supply')
              ? `current ${type}ing`
              : 'your balance'}
            :
          </Typography>
          <Box mt="L" key={v4()} display="flex" justifyContent="space-between">
            <Box display="flex">
              <SVG width="1rem" height="1rem" />
              <Typography ml="M" variant="normal">
                {formatMoney(tokenValue)}
              </Typography>
            </Box>
            <Typography variant="normal" color="textSecondary">
              {data.symbol}
            </Typography>
          </Box>
        </Box>
        <Box my="XL">
          <InputBalance
            name="value"
            max={max}
            register={register}
            label="Type quantity"
            setValue={setValue}
          />
        </Box>
        <Typography variant="normal" textTransform="capitalize">
          Rate
        </Typography>
        <Box my="L" bg="background" p="L" borderRadius="M">
          <Box
            py="M"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              fontSize="S"
              variant="normal"
              color="textSecondary"
              textTransform="uppercase"
            >
              {type === 'borrow' ? 'Borrow Rate Impact' : 'Supply APR'}
            </Typography>
            <BorrowRateImpact
              control={control}
              chainId={chainId}
              pool={pool}
              type={type}
              data={data}
            />
          </Box>
        </Box>
        <Typography variant="normal">Details</Typography>
        <Details
          data={data}
          type={type}
          control={control}
          totalBorrowsInUSDRecord={totalBorrowsInUSDRecord}
          base={base}
        />
        {account ? (
          data.allowance.isZero() &&
          (isSupplying(base, type) || isRepaying(base, type)) ? (
            <Box display="flex">
              <Button
                width="100%"
                variant="primary"
                disabled={loading}
                onClick={toastAddAllowance}
                hover={{ bg: 'accentActive' }}
                bg={loading ? 'accentActive' : 'accent'}
              >
                {loading ? (
                  <Box as="span" display="flex" justifyContent="center">
                    <LoadingSVG width="1rem" height="1rem" />
                    <Typography as="span" variant="normal" ml="M" fontSize="S">
                      Requesting allowance...
                    </Typography>
                  </Box>
                ) : (
                  'Request allowance'
                )}
              </Button>
            </Box>
          ) : (
            <Box display="flex">
              <Button
                width="100%"
                variant="primary"
                disabled={loading}
                hover={{ bg: 'accentAlternativeActive' }}
                bg={loading ? 'accentAlternativeActive' : 'accentAlternative'}
                onClick={action}
              >
                {loading ? (
                  <Box as="span" display="flex" justifyContent="center">
                    <LoadingSVG width="1rem" height="1rem" />
                    <Typography as="span" variant="normal" ml="M" fontSize="S">
                      {processLoadingMessage(base, type, data.symbol)}
                    </Typography>
                  </Box>
                ) : (
                  processButtonText(base, type, data.symbol)
                )}
              </Button>
            </Box>
          )
        ) : (
          <Box display="flex" justifyContent="center">
            <ConnectWallet />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MAILMarketPoolModal;
