import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Button } from '@/elements';
import { AddressZero } from '@/sdk';
import { capitalize, showToast } from '@/utils';
import CreatePoolPopup from '@/views/dapp/dex-find-pool/create-pool-popup';

import { FindPoolButtonProps } from './dex-find-pool.types';

const FindPoolButton: FC<FindPoolButtonProps> = ({
  getValues /*
  tokenBAddress,
  tokenAAddress,*/,
  isCreatingPair,
  setCreatingPair,
}) => {
  const [loading, setLoading] = useState(false);
  const [createPoolPopup, setCreatePoolPopup] = useState(false);
  const t = useTranslations();
  const { push } = useRouter();

  const tokenANeedsAllowance = false;

  const tokenBNeedsAllowance = false;

  const enterPool = async () => {
    setLoading(true);

    try {
      const address = AddressZero;

      const doesPairExist = true;
      setLoading(false);

      if (doesPairExist)
        return await push({
          pathname: Routes[RoutesEnum.DEXPoolDetails],
          query: { address: address },
        }).then();

      setCreatingPair(true);
    } finally {
      console.log(false);
    }
  };

  const handleEnterPool = () =>
    showToast(enterPool(), {
      loading: capitalize(t('common.check', { isLoading: 1 })),
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  const createPair = async () => {
    try {
      setLoading(true);
      setCreatePoolPopup(false);

      return push({
        pathname: Routes[RoutesEnum.DEXPoolDetails],
        query: { address: AddressZero },
      }).then();
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePair = () =>
    showToast(createPair(), {
      loading: t('dexPoolFind.buttonPool', { isLoading: 1 }),
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  const handleValidateCreatePair = async () => {
    return setCreatePoolPopup(true);
  };

  return (
    <Box
      p="L"
      my="L"
      color="text"
      bg="foreground"
      maxWidth="30rem"
      borderRadius="M"
      width={['100%', '100%', '100%', '30rem']}
    >
      {/*tokenAAddress === tokenBAddress ? (
        <Button width="100%" variant="primary" disabled={true} bg="disabled">
          {t('dexPoolFind.buttonSameToken')}
        </Button>
      ) : */}
      {isCreatingPair ? (
        <Button
          width="100%"
          variant="primary"
          disabled={loading || tokenANeedsAllowance || tokenBNeedsAllowance}
          bg={
            tokenANeedsAllowance || tokenBNeedsAllowance
              ? 'disabled'
              : loading
              ? 'accentActive'
              : 'accent'
          }
          hover={{
            bg:
              loading || tokenANeedsAllowance || tokenBNeedsAllowance
                ? 'disabled'
                : 'accentActive',
          }}
          onClick={
            loading || tokenANeedsAllowance || tokenBNeedsAllowance
              ? undefined
              : handleValidateCreatePair
          }
        >
          {t('dexPoolFind.buttonPool', { isLoading: Number(loading) })}
        </Button>
      ) : (
        <Button
          width="100%"
          variant="primary"
          disabled={loading}
          onClick={handleEnterPool}
          bg={loading ? 'accentActive' : 'accent'}
          hover={{ bg: loading ? 'disabled' : 'accentActive' }}
        >
          {t('dexPoolFind.button', { isLoading: Number(loading) })}
        </Button>
      )}
      <CreatePoolPopup
        isOpen={createPoolPopup}
        symbol0={getValues('tokenA.symbol')}
        symbol1={getValues('tokenB.symbol')}
        onCancel={() => setCreatePoolPopup(false)}
        onContinue={handleCreatePair}
      />
    </Box>
  );
};

export default FindPoolButton;
