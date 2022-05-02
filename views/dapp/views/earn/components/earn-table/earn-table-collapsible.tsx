import { BigNumber } from 'ethers';
import { FC, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import priorityHooks from '@/connectors/index';
import Box from '@/elements/box';
import Button from '@/elements/button';
import { CHAIN_ID, CHAINS } from '@/sdk/../../../../../../constants/chains';
import { CASA_DE_PAPEL } from '@/sdk/../../../../../../constants/contracts';
import { ZERO } from '@/sdk/../../../../../../constants/index';
import {
  calculateFarmTokenPrice,
  depositLP,
  getRewards,
  getUserPoolData,
  withdrawLP,
} from '@/sdk/../../../../../../utils/casa-de-papel';
import {
  addAllowance,
  getAllowance,
  getERC20Balance,
  getERC20TotalSupply,
} from '@/sdk/../../../../../../utils/erc-20';
import { formatDollars } from '@/sdk/../../../../../../utils/string';
import { IntMath } from '@/sdk/entities/int-math';

import EarnStakeModal from '../earn-stake-modal';
import EarnCard from './earn-card';
import { EarnTableCollapsibleProps, IEarnTableData } from './earn-table.types';

const { usePriorityAccount, usePriorityProvider } = priorityHooks;

const processData = (data: IEarnTableData | undefined) => {
  if (data) return data;

  return {
    totalSupply: ZERO,
    lpBalance: ZERO,
    userData: { stakingAmount: ZERO, pendingRewards: ZERO },
    allowance: ZERO,
  };
};

const EarnTableCollapsible: FC<EarnTableCollapsibleProps> = ({
  baseTokenPrice,
  farm,
}) => {
  const provider = usePriorityProvider();
  const account = usePriorityAccount();

  const [modal, setModal] = useState<'stake' | 'unstake' | undefined>();
  const [stakedApproved, setStakedApproved] = useState(true);

  const { data, error, mutate } = useSWR(
    `EarnTableCollapsible-${account}`,
    async () => {
      if (!provider || !account) return;

      const [lpBalance, totalSupply, userData, allowance] = await Promise.all([
        getERC20Balance(account, farm.stakingToken.address, provider),
        getERC20TotalSupply(farm.stakingToken.address, provider),
        getUserPoolData(provider, account, farm.id),
        getAllowance(
          account,
          CASA_DE_PAPEL,
          farm.stakingToken.address,
          provider
        ),
      ]);

      return { lpBalance, totalSupply, userData, allowance };
    },
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  const loading = useMemo(() => !error && !data, [error, data]);

  const processedData = useMemo(() => processData(data), [data]);

  const handleApprove = () =>
    toast.promise(
      (async () => {
        if (!account || !provider) return;
        try {
          const tx = await addAllowance(
            account,
            farm.stakingToken.address,
            provider,
            CASA_DE_PAPEL
          );

          const receipt = await tx.wait(2);

          // send modal with bsc scan test net
          const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

          toast(
            <a
              target="__black"
              rel="noreferrer nofollow"
              href={`${explorer ? explorer[0] : ''}/tx/${
                receipt.transactionHash
              }`}
            >
              Check on Explorer
            </a>
          );
          mutate();
          setStakedApproved(true);
        } catch (e) {
          throw e || new Error('Something went wrong');
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
        if (
          !account ||
          !provider ||
          processedData.userData.pendingRewards.isZero()
        )
          return;

        try {
          const tx = await getRewards(provider, account, farm.id);

          const receipt = await tx.wait(2);

          const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

          toast(
            <a
              target="__black"
              rel="noreferrer nofollow"
              href={`${explorer ? explorer[0] : ''}/tx/${
                receipt.transactionHash
              }`}
            >
              Check on Explorer
            </a>
          );
          mutate();
        } catch (e) {
          throw e || new Error('Something went wrong');
        }
      })(),
      {
        loading: 'Loading...',
        success: 'Success',
        error: (e) => e.message,
      }
    );

  const handleCloseModal = () => setModal(undefined);

  const handleChangeModal = (target: 'stake' | 'unstake') => () =>
    setModal(target);

  const handleDepositTokens = async (amount: BigNumber) => {
    if (!account || !provider || processedData.lpBalance.isZero()) return;

    try {
      const tx = await depositLP(provider, account, farm.id, amount);

      const receipt = await tx.wait(2);

      const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

      toast(
        <a
          target="__black"
          rel="noreferrer nofollow"
          href={`${explorer ? explorer[0] : ''}/tx/${receipt.transactionHash}`}
        >
          Check on Explorer
        </a>
      );
      mutate();
    } catch (e) {
      throw e || new Error('Something Went Wrong');
    }
  };

  // Amount needs to come from the input or press max button i assume
  const handleWithdrawTokens = async (amount: BigNumber) => {
    if (!account || !provider || processedData.userData.stakingAmount.isZero())
      return;

    try {
      const tx = await withdrawLP(provider, account, farm.id, amount);

      const receipt = await tx.wait(2);

      const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

      toast(
        <a
          target="__black"
          rel="noreferrer nofollow"
          href={`${explorer ? explorer[0] : ''}/tx/${receipt.transactionHash}`}
        >
          Check on Explorer
        </a>
      );
      mutate();
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
        amountUSD={formatDollars(
          calculateFarmTokenPrice(
            baseTokenPrice,
            farm,
            processedData.totalSupply
          )
            .mul(processedData.lpBalance)
            .toNumber()
        )}
        amount={`${IntMath.toNumber(processedData.lpBalance)} ${farm.symbol}`}
        button={
          <Button variant="primary" hover={{ bg: 'accentActive' }}>
            Get {farm.symbol}
          </Button>
        }
      />
      <EarnCard
        title="Staked"
        loading={loading}
        amountUSD={formatDollars(
          calculateFarmTokenPrice(
            baseTokenPrice,
            farm,
            processedData.totalSupply
          )
            .mul(processedData.userData.stakingAmount)
            .toNumber()
        )}
        amount={`${IntMath.toNumber(processedData.userData.stakingAmount)} ${
          farm.symbol
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
        loading={loading}
        shadow={!processedData.userData.pendingRewards.isZero()}
        amountUSD={formatDollars(
          calculateFarmTokenPrice(
            baseTokenPrice,
            farm,
            processedData.totalSupply
          )
            .mul(processedData.userData.pendingRewards)
            .toNumber()
        )}
        amount={`${IntMath.toNumber(processedData.userData.pendingRewards)} ${
          farm.symbol
        }`}
        button={
          <Button
            onClick={
              !processedData.userData.pendingRewards.isZero()
                ? handleHarvest
                : undefined
            }
            variant="primary"
            disabled={processedData.userData.pendingRewards.isZero()}
            bg={
              !processedData.userData.pendingRewards.isZero()
                ? 'success'
                : 'disabled'
            }
            cursor={
              !processedData.userData.pendingRewards.isZero()
                ? 'pointer'
                : 'not-allowed'
            }
            hover={{
              bg: !processedData.userData.pendingRewards.isZero()
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
        balance={processedData.lpBalance}
        handleClose={handleCloseModal}
        symbol={farm.symbol}
        id={farm.id}
      />
    </Box>
  );
};

export default EarnTableCollapsible;
