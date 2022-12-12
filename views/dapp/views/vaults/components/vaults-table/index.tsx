import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import TokenView from '@/components/token-view';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { capitalize } from '@/utils';

import { VaultTableProps } from '../../vaults.types';
import { handleFilterVaults, parseVaultType } from '../../vaults.utils';
import {
  DesktopVaultSkeletonRow,
  MobileVaultSkeletonRow,
} from './vaults-skeleton-row';

const VaultTable: FC<VaultTableProps> = ({
  data,
  loading,
  control,
  isDesktop,
}) => {
  const { push } = useRouter();
  const t = useTranslations();
  const HEADING_MOBILE = [
    t('vaults.column2'),
    'APR',
    t('vaults.column4'),
    capitalize(t('common.type')),
    'TVL',
  ];
  const HEADING = [t('vaults.column1'), ...HEADING_MOBILE];
  const typeFilter = useWatch({ control, name: 'type' });
  const search = useWatch({ control, name: 'search' });
  const onlyDeposit = useWatch({ control, name: 'onlyDeposit' });

  const filteredVaults = handleFilterVaults(
    data,
    search,
    typeFilter,
    onlyDeposit
  );

  return isDesktop ? (
    <Table
      hasButton
      headings={HEADING.map((title) => {
        return {
          item: (
            <Typography
              as="span"
              fontSize="S"
              variant="normal"
              textAlign="center"
              display={['none', 'block']}
              key={v4()}
            >
              {title}
            </Typography>
          ),
        };
      })}
      data={
        loading
          ? DesktopVaultSkeletonRow
          : filteredVaults.map((item) => {
              return {
                button: (
                  <Button
                    variant="primary"
                    hover={{ bg: 'accentActive' }}
                    onClick={() =>
                      push({
                        pathname: Routes[RoutesEnum.DineroVault],
                        query: {
                          address: item.vaultAddress,
                        },
                      })
                    }
                    key={v4()}
                  >
                    {capitalize(t('common.enter'))}
                  </Button>
                ),
                items: [
                  <TokenView
                    address={item.depositTokenAddress}
                    symbol={item.depositTokenSymbol}
                    key={v4()}
                  />,
                  <Typography
                    variant={'normal'}
                    fontWeight="400"
                    fontSize="0.9rem"
                    lineHeight="1.313rem"
                    textAlign="center"
                    key={v4()}
                  >
                    {FixedPointMath.toNumber(
                      item.depositAmount,
                      item.depositTokenDecimals
                    )}
                  </Typography>,
                  <Typography
                    variant={'normal'}
                    fontWeight="400"
                    fontSize="0.9rem"
                    lineHeight="1.313rem"
                    textAlign="center"
                    key={v4()}
                  >
                    {item.apr ? FixedPointMath.toNumber(item.apr) : 'N/A'}
                  </Typography>,
                  <Typography
                    variant={'normal'}
                    fontWeight="400"
                    fontSize="0.9rem"
                    lineHeight="1.313rem"
                    textAlign="center"
                    key={v4()}
                  >
                    {item.earn ? FixedPointMath.toNumber(item.earn) : 'N/A'}
                  </Typography>,
                  <Typography
                    variant={'normal'}
                    fontWeight="400"
                    fontSize="0.9rem"
                    lineHeight="1.313rem"
                    textAlign="center"
                    key={v4()}
                  >
                    {parseVaultType(item.type)}
                  </Typography>,
                  <Typography
                    variant={'normal'}
                    fontWeight="400"
                    fontSize="0.9rem"
                    lineHeight="1.313rem"
                    textAlign="center"
                    key={v4()}
                  >
                    {item.tvl ? FixedPointMath.toNumber(item.tvl) : 'N/A'}
                  </Typography>,
                ],
                handleClick: () =>
                  push({
                    pathname: Routes[RoutesEnum.DineroVault],
                    query: {
                      address: item.vaultAddress,
                    },
                  }),
              };
            })
      }
    />
  ) : (
    <Table
      hasButton
      headings={HEADING_MOBILE.map((title) => {
        return {
          item: (
            <Box
              height="100%"
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              as="span"
            >
              <Typography as="span" fontSize="0.9rem" variant="normal">
                {title}
              </Typography>
            </Box>
          ),
        };
      })}
      data={
        loading
          ? MobileVaultSkeletonRow
          : filteredVaults.map((item) => ({
              mobileSide: (
                <TokenView
                  address={item.depositTokenAddress}
                  symbol={item.depositTokenSymbol}
                  key={v4()}
                />
              ),
              button: (
                <Button
                  variant="primary"
                  hover={{ bg: 'accentActive' }}
                  onClick={() =>
                    push({
                      pathname: Routes[RoutesEnum.DineroVault],
                      query: {
                        address: item.vaultAddress,
                      },
                    })
                  }
                >
                  {capitalize(t('common.enter'))}
                </Button>
              ),
              items: [
                <Typography
                  variant={'normal'}
                  fontWeight="400"
                  fontSize="0.9rem"
                  lineHeight="1.313rem"
                  key={v4()}
                >
                  {FixedPointMath.toNumber(
                    item.depositAmount,
                    item.depositTokenDecimals
                  )}
                </Typography>,
                <Typography
                  variant="normal"
                  fontWeight="400"
                  fontSize="0.9rem"
                  lineHeight="1.313rem"
                  key={v4()}
                >
                  {item.apr ? FixedPointMath.toNumber(item.apr) : 'N/A'}
                </Typography>,
                <Typography
                  variant="normal"
                  fontWeight="400"
                  fontSize="0.9rem"
                  lineHeight="1.313rem"
                  key={v4()}
                >
                  {item.earn ? FixedPointMath.toNumber(item.earn) : 'N/A'}
                </Typography>,
                <Typography
                  variant="normal"
                  fontWeight="400"
                  fontSize="0.9rem"
                  lineHeight="1.313rem"
                  key={v4()}
                >
                  {parseVaultType(item.type)}
                </Typography>,
                <Typography
                  variant="normal"
                  fontWeight="400"
                  fontSize="0.9rem"
                  lineHeight="1.313rem"
                  key={v4()}
                >
                  {item.tvl ? FixedPointMath.toNumber(item.tvl) : 'N/A'}
                </Typography>,
              ],
              handleClick: () =>
                push({
                  pathname: Routes[RoutesEnum.DineroVault],
                  query: {
                    address: item.vaultAddress,
                  },
                }),
            }))
      }
    />
  );
};

export default VaultTable;
