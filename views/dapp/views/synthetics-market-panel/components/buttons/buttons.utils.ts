import { ethers } from 'ethers';

import { SyntheticRequestActions } from '@/constants';
import { FixedPointMath, ZERO_ADDRESS } from '@/sdk';
import { safeToBigNumber } from '@/utils';

import { RedStoneSubmitHandlerArgs } from './buttons.types';
const encodeData = (to: string, amount: ethers.BigNumber) =>
  ethers.utils.defaultAbiCoder.encode(
    ['address', 'uint256'],
    [to || ZERO_ADDRESS, amount]
  );

const handleMintSynt = ({
  contract,
  data,
  synt,
}: Omit<RedStoneSubmitHandlerArgs<number>, 'collateral'>) => {
  const syntBN = safeToBigNumber(synt);

  return contract.mint(data.account, syntBN);
};

const handleDepositCollateral = ({
  contract,
  data,
  collateral,
}: Omit<RedStoneSubmitHandlerArgs<number>, 'synt'>) => {
  const bnCollateral = safeToBigNumber(collateral, data.collateralDecimals, 8);

  const safeCollateral = bnCollateral.gt(data.collateralBalance)
    ? data.collateralBalance
    : bnCollateral;

  return contract.deposit(data.account, safeCollateral);
};

const handleMintRequest = ({
  contract,
  data,
  collateral,
  synt,
}: RedStoneSubmitHandlerArgs<number>) => {
  const collateralBN = safeToBigNumber(collateral, data.collateralDecimals);

  const safeCollateral = collateralBN.gt(data.collateralBalance)
    ? data.collateralBalance
    : collateralBN;

  const syntBN = safeToBigNumber(synt);

  return contract.request(
    [SyntheticRequestActions.Deposit, SyntheticRequestActions.Mint],
    [encodeData(data.account, safeCollateral), encodeData(data.account, syntBN)]
  );
};

export const makeRedStoneMintCall = ({
  contract,
  data,
  collateral,
  synt,
}: RedStoneSubmitHandlerArgs<string>) => {
  const safeCollateral = isNaN(+collateral) ? 0 : +collateral;
  const safeSynt = isNaN(+synt) ? 0 : +synt;

  if (!!safeCollateral && !!safeSynt)
    return handleMintRequest({
      contract,
      data,
      collateral: safeCollateral,
      synt: safeSynt,
    });

  if (safeCollateral && !safeSynt)
    return handleDepositCollateral({
      data,
      collateral: safeCollateral,
      contract,
    });

  return handleMintSynt({ data, contract, synt: safeSynt });
};

const handleBurnRequest = ({
  contract,
  data,
  collateral,
  synt,
}: RedStoneSubmitHandlerArgs<number>) => {
  const bnCollateral = safeToBigNumber(collateral, data.collateralDecimals, 8);

  const safeBNCollateral = bnCollateral.gt(data.userCollateral)
    ? data.userCollateral
    : bnCollateral;

  const syntBN = FixedPointMath.toBigNumber(synt);

  const maxBNSyntToBurn = syntBN.gt(data.userSyntMinted)
    ? data.userSyntMinted
    : syntBN;

  const safeBNSynt = maxBNSyntToBurn.gt(data.syntBalance)
    ? data.syntBalance
    : maxBNSyntToBurn;

  return contract.request(
    [SyntheticRequestActions.Burn, SyntheticRequestActions.Withdraw],
    [
      encodeData(data.account, safeBNSynt),
      encodeData(data.account, safeBNCollateral),
    ]
  );
};

const handleWithdrawCollateral = ({
  contract,
  data,
  collateral,
}: Omit<RedStoneSubmitHandlerArgs<number>, 'synt'>) => {
  const bnCollateral = safeToBigNumber(collateral, data.collateralDecimals, 8);

  const safeBNCollateral = bnCollateral.gt(data.userCollateral)
    ? data.userCollateral
    : bnCollateral;

  return contract.withdraw(data.account, safeBNCollateral);
};

const handleBurnSynt = ({
  contract,
  data,
  synt,
}: Omit<RedStoneSubmitHandlerArgs<number>, 'collateral'>) => {
  const syntBN = FixedPointMath.toBigNumber(synt);

  const safeAmount = syntBN.gt(data.syntBalance) ? data.syntBalance : syntBN;

  const maxAmount = safeAmount.gt(data.userSyntMinted)
    ? data.userSyntMinted
    : safeAmount;

  return contract.burn(data.account, maxAmount);
};

export const makeRedStoneBurnCall = ({
  contract,
  data,
  collateral,
  synt,
}: RedStoneSubmitHandlerArgs<string>) => {
  const safeCollateral = isNaN(+collateral) ? 0 : +collateral;
  const safeSynt = isNaN(+synt) ? 0 : +synt;

  if (!!safeCollateral && !!safeSynt)
    return handleBurnRequest({
      data,
      contract,
      synt: safeSynt,
      collateral: safeCollateral,
    });

  if (safeCollateral && !safeSynt)
    return handleWithdrawCollateral({
      data,
      contract,
      collateral: safeCollateral,
    });

  return handleBurnSynt({ contract, data, synt: safeSynt });
};
