import { useRouter } from 'next/router';
import { head, nth, prop } from 'ramda';
import { FC, useState } from 'react';

import { createMailMarket } from '@/api';
import { CopyToClipboard } from '@/components';
import { Routes, RoutesEnum, TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useGetSigner } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { TOKEN_SYMBOL } from '@/sdk';
import { LoadingSVG } from '@/svg';
import {
  isZeroAddress,
  shortAccount,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import ConnectWallet from '@/views/dapp/components/wallet/connect-wallet';

import { SearchItemProps } from '../../mail-market.types';

const SearchItem: FC<SearchItemProps> = ({ address, addLocalAsset, data }) => {
  const [getIsDeployed, getName, getSymbol, getMarketAddress] = [
    head,
    nth(1),
    nth(2),
    nth(4),
  ];

  const { push } = useRouter();
  const { signer } = useGetSigner();

  const { account, chainId } = useIdAccount();

  // handle only in the creating button
  const [createMarketLoading, setCreateMarketLoading] = useState(false);

  const handleCreateMarket = async () => {
    try {
      setCreateMarketLoading(true);
      const { validSigner, validId } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      if (isZeroAddress(address)) return;

      const tx = await createMailMarket(validId, validSigner, address);
      await showTXSuccessToast(tx, validId);
    } catch (error) {
      throwError('Something went wrong', error);
    } finally {
      setCreateMarketLoading(false);
    }
  };

  const createMarket = async (callback: () => void) =>
    showToast(handleCreateMarket(), {
      loading: 'Creating...',
      success: () => {
        callback();
        return 'Success!';
      },
      error: prop('message'),
    });

  const handleClick = () => {
    addLocalAsset({
      market: getMarketAddress(data) as string,
      name: getName(data) as string,
      symbol: getSymbol(data) as string,
      token: address,
    });
    push(
      {
        pathname: Routes[RoutesEnum.MAILMarketPool],
        query: { pool: getMarketAddress(data) as string },
      },
      undefined,
      {
        shallow: true,
      }
    ).then();
  };

  const handleCreateToken = async () => createMarket(handleClick);

  const SVG =
    TOKENS_SVG_MAP[getSymbol(data) as string] ??
    TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <Box
      p="L"
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box
          mr="L"
          width="2rem"
          height="2rem"
          display="flex"
          borderRadius="50%"
          alignItems="center"
          justifyContent="center"
        >
          <SVG width="2rem" />
        </Box>
        <Box>
          <Typography variant="normal" fontWeight="800">{`${getName(
            data
          )} (${getSymbol(data)})`}</Typography>
          <Box display="flex" alignItems="center" my="S">
            <Typography
              mr="M"
              fontSize="S"
              variant="normal"
              color="textSecondary"
            >
              Token Address:
            </Typography>
            <Typography variant="normal">{shortAccount(address)}</Typography>
            <CopyToClipboard ml="M" address={address} />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography
              mr="M"
              fontSize="S"
              variant="normal"
              color="textSecondary"
            >
              Market Address:
            </Typography>
            <Typography variant="normal">
              {shortAccount(getMarketAddress(data) as string)}
            </Typography>
            <CopyToClipboard
              ml="M"
              address={getMarketAddress(data) as string}
            />
          </Box>
        </Box>
      </Box>
      <Box
        mt={['XL', 'XL', 'XL', 'NONE']}
        mx={['auto', 'auto', 'auto', 'NONE']}
      >
        {getIsDeployed(data) ? (
          <Button
            variant="primary"
            hover={{
              bg: 'accentActive',
            }}
            onClick={handleClick}
          >
            Enter
          </Button>
        ) : account ? (
          <Button
            variant="primary"
            onClick={handleCreateToken}
            disabled={createMarketLoading}
            bg={createMarketLoading ? 'disabled' : 'accent'}
          >
            {createMarketLoading ? (
              <Box display="flex">
                <LoadingSVG width="1rem" />
                <Typography ml="M" variant="normal">
                  Creating
                </Typography>
              </Box>
            ) : (
              'Create pool'
            )}
          </Button>
        ) : (
          <ConnectWallet />
        )}
      </Box>
    </Box>
  );
};

export default SearchItem;
