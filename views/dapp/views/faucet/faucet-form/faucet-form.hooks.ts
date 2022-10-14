import { getAddress } from 'ethers/lib/utils';
import { pathOr } from 'ramda';
import { Control, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { DEFAULT_ERC_20_DECIMALS, ERC_20_DATA } from '@/constants';
import { CHAIN_ID, CONTRACTS, FixedPointMath } from '@/sdk';
import MintABI from '@/sdk/abi/mint.abi.json';
import MintOldABI from '@/sdk/abi/mint-old.abi.json';
import { isValidAccount, safeGetAddress } from '@/utils';
import { FAUCET_TOKEN_MAX_AMOUNT } from '@/views/dapp/views/faucet/faucet.data';
import { getTokenMinter } from '@/views/dapp/views/faucet/utilts';

import { IFaucetForm } from '../faucet.types';

const MINT_FN_RECORD = {
  [getAddress(CONTRACTS.DINERO_FAUCET[CHAIN_ID.BNB_TEST_NET])]: true,
  [getAddress(CONTRACTS.BTC[CHAIN_ID.BNB_TEST_NET])]: true,
  [getAddress(CONTRACTS.BUSD[CHAIN_ID.BNB_TEST_NET])]: true,
};

export const useMint = (
  chainId: number,
  account: string,
  control: Control<IFaucetForm>
) => {
  const [amount] = useDebounce(useWatch({ control, name: 'amount' }) || 0, 500);
  const token = useWatch({ control, name: 'token' });

  const maxAmount = FAUCET_TOKEN_MAX_AMOUNT[chainId][token];

  const safeAmount = amount > maxAmount ? maxAmount : amount;

  const decimals = pathOr(
    DEFAULT_ERC_20_DECIMALS,
    [chainId, safeGetAddress(token), 'decimals'],
    ERC_20_DATA
  );

  const isOld = MINT_FN_RECORD[getAddress(token)];

  const contractInterface = isOld ? MintOldABI : MintABI;

  const value = FixedPointMath.toBigNumber(safeAmount, decimals);

  const args = isOld ? [value] : [account, value];

  const { config } = usePrepareContractWrite({
    addressOrName: getTokenMinter(chainId, token),
    functionName: 'mint',
    contractInterface,
    args,
    enabled: !value.isZero() && isValidAccount(token),
  });

  return useContractWrite(config);
};
