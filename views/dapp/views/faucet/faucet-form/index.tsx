import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { pathOr } from 'ramda';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { CopyToClipboard, Tooltip } from '@/components';
import {
  DEFAULT_ERC_20_DECIMALS,
  ERC_20_DATA,
  TOKENS_SVG_MAP,
} from '@/constants';
import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { TimesSVG } from '@/svg';
import { formatMoney, safeGetAddress } from '@/utils';
import ConnectWallet from '@/views/dapp/components/wallet/connect-wallet';

import InputBalance from '../input-balance';
import CurrencyIdentifier from './faucet-currency-identifier';
import { FaucetFormProps } from './faucet-form.types';
import FaucetSelectCurrency from './faucet-select-currency';
import MintButton from './mint-button';

const FaucetForm: FC<FaucetFormProps> = ({
  tokens,
  isLoadingData,
  removeLocalToken,
  refetch,
  formFaucet,
  chainId,
  account,
}) => {
  const t = useTranslations();

  const onSelectCurrency = (token: `0x${string}`) => {
    formFaucet.setValue('token', token);
    formFaucet.setValue('amount', 0);
  };

  return (
    <>
      <Box
        py="XL"
        color="text"
        width="100%"
        display="grid"
        gridGap="1rem"
        height={['auto', 'auto', 'auto', '22rem']}
        gridTemplateColumns={['1fr', '1fr', '1fr', '1fr 1fr']}
      >
        <Box
          py="L"
          display="flex"
          bg="foreground"
          px={['L', 'XL']}
          borderRadius="M"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <FaucetSelectCurrency
            chainId={chainId}
            tokens={tokens}
            label={t('faucet.tokenInput')}
            defaultValue={tokens?.[0]?.address ?? ethers.constants.AddressZero}
            onSelectCurrency={onSelectCurrency}
          />
          <InputBalance
            name="amount"
            register={formFaucet.register}
            label={t('faucet.amountInput')}
            setValue={formFaucet.setValue}
            chainId={chainId}
            control={formFaucet.control}
            currencyPrefix={
              isLoadingData ? (
                <Skeleton width="4rem" />
              ) : (
                <CurrencyIdentifier
                  chainId={chainId}
                  tokens={tokens}
                  control={formFaucet.control}
                />
              )
            }
          />
          <Box display="flex" justifyContent="center">
            {account ? (
              <MintButton
                control={formFaucet.control}
                chainId={chainId}
                account={account}
                getValues={formFaucet.getValues}
                refetch={refetch}
              />
            ) : (
              <ConnectWallet />
            )}
          </Box>
        </Box>
        <Box
          py="L"
          display="flex"
          bg="foreground"
          px={['L', 'XL']}
          borderRadius="M"
          maxHeight="22rem"
          overflowY="hidden"
          flexDirection="column"
        >
          <Typography variant="normal" textTransform="uppercase" my="L">
            {t('common.yourBalance')}
          </Typography>
          <Box
            display="grid"
            overflowY="auto"
            gridGap="0.25rem"
            alignItems="start"
          >
            {isLoadingData
              ? Array.from({ length: 5 }).map(() => (
                  <Box mb="L" key={v4()}>
                    <Skeleton />
                  </Box>
                ))
              : tokens.map(({ symbol, address, balance }) => {
                  const SVG =
                    TOKENS_SVG_MAP[chainId][address] ??
                    TOKENS_SVG_MAP[chainId].default;

                  const decimals = pathOr(
                    DEFAULT_ERC_20_DECIMALS,
                    [chainId || 0, safeGetAddress(address), 'decimals'],
                    ERC_20_DATA
                  );

                  return (
                    <Box
                      mr="M"
                      mb="M"
                      key={v4()}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center">
                        <SVG width="1rem" maxHeight="1rem" maxWidth="1rem" />
                        <Typography ml="M" variant="normal">
                          {formatMoney(
                            FixedPointMath.toNumber(balance, decimals)
                          )}
                        </Typography>
                      </Box>
                      <Box
                        display="grid"
                        alignItems="center"
                        gridTemplateColumns={`4rem 2rem ${
                          removeLocalToken ? '2rem' : ''
                        }`}
                      >
                        <Typography variant="normal" color="textSecondary">
                          {symbol}
                        </Typography>
                        <CopyToClipboard address={address} />
                        {removeLocalToken && (
                          <Box
                            color="error"
                            display="flex"
                            width="1.3rem"
                            height="1.3rem"
                            cursor="pointer"
                            borderRadius="S"
                            border="1px solid"
                            alignItems="center"
                            justifyContent="center"
                            hover={{
                              color: 'errorActive',
                            }}
                            onClick={() => removeLocalToken(address)}
                          >
                            <Box as="span" display="inline-block" width="1rem">
                              <TimesSVG
                                width="100%"
                                maxHeight="1rem"
                                maxWidth="1rem"
                              />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}
          </Box>
        </Box>
      </Box>
      <Tooltip />
    </>
  );
};

export default FaucetForm;
