import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { capitalize } from '@/utils';

import { VaultTableProps } from '../../vault.types';
import { handleFilterVaults, parseVaultType } from '../../vault.utils';
import VaultName from './vault-name';
import {
  DesktopVaultSkeletonRow,
  MobileVaultSkeletonRow,
} from './vault-skeleton-row';

const VaultTable: FC<VaultTableProps> = ({ data, loading, control }) => {
  const { push } = useRouter();
  const t = useTranslations();
  const HEADING_MOBILE = [
    t('vault.column2'),
    'APR',
    t('vault.column4'),
    capitalize(t('common.type')),
    'TVL',
  ];
  const HEADING = [t('vault.column1'), ...HEADING_MOBILE];
  const typeFilter = useWatch({ control, name: 'type' });
  const search = useWatch({ control, name: 'search' });
  const onlyDeposit = useWatch({ control, name: 'onlyDeposit' });

  const filteredVaults = handleFilterVaults(
    data,
    search,
    typeFilter,
    onlyDeposit
  );

  return (
    <Container>
      <Box display={['none', 'none', 'none', 'block']}>
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
                          push(
                            {
                              pathname: Routes[RoutesEnum.VaultDetails],
                              query: {
                                address: item.vaultAddress,
                              },
                            },
                            undefined,
                            {
                              shallow: true,
                            }
                          )
                        }
                      >
                        {capitalize(t('common.enter'))}
                      </Button>
                    ),
                    items: [
                      <VaultName
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
                      push(
                        {
                          pathname: Routes[RoutesEnum.VaultDetails],
                          query: {
                            address: item.vaultAddress,
                          },
                        },
                        undefined,
                        {
                          shallow: true,
                        }
                      ),
                  };
                })
          }
        />
      </Box>
      <Box display={['flex', 'flex', 'flex', 'none']} flexDirection="column">
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
                >
                  <Typography fontSize="0.9rem" variant="normal">
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
                    <VaultName
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
                        push(
                          {
                            pathname: Routes[RoutesEnum.VaultDetails],
                            query: {
                              address: item.vaultAddress,
                            },
                          },
                          undefined,
                          {
                            shallow: true,
                          }
                        )
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
                    push(
                      {
                        pathname: Routes[RoutesEnum.VaultDetails],
                        query: {
                          address: item.vaultAddress,
                        },
                      },
                      undefined,
                      {
                        shallow: true,
                      }
                    ),
                }))
          }
        />
      </Box>
    </Container>
  );
};

export default VaultTable;
