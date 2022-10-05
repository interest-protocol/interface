import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';
import { capitalize } from '@/utils';

import { VaultTableProps } from '../../vault.types';
import { handleFilterVaults } from '../../vault.utils';
import VaultCard from './vault-card';
import VaultName from './vault-name';
import { DesktopVaultSkeletonRow } from './vault-skeleton-row';

const VaultTable: FC<VaultTableProps> = ({ data, loading, control }) => {
  const { push } = useRouter();
  const t = useTranslations();
  const HEADING = [
    t('vault.column1'),
    'APR',
    t('vault.column3'),
    capitalize(t('common.type')),
    'TVL',
  ];
  const typeFilter = useWatch({ control, name: 'type' });
  const search = useWatch({ control, name: 'search' });
  const filteredVaults = handleFilterVaults(data, search, typeFilter);

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
                                address: item.id as string,
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
                        vault={item.vault}
                        caption={item.caption}
                        key={v4()}
                      />,
                      <Typography
                        variant={'normal'}
                        fontWeight="500"
                        fontSize="1.1rem"
                        lineHeight="1.313rem"
                        color="accent"
                        textAlign="center"
                        key={v4()}
                      >
                        {item.apr}
                      </Typography>,
                      <Typography
                        variant={'normal'}
                        fontWeight="400"
                        fontSize="0.9rem"
                        lineHeight="1.313rem"
                        textAlign="center"
                        key={v4()}
                      >
                        {item.earn}
                      </Typography>,
                      <Typography
                        variant={'normal'}
                        fontWeight="400"
                        fontSize="0.9rem"
                        lineHeight="1.313rem"
                        textAlign="center"
                        key={v4()}
                      >
                        {item.type}
                      </Typography>,
                      <Typography
                        variant={'normal'}
                        fontWeight="400"
                        fontSize="0.9rem"
                        lineHeight="1.313rem"
                        textAlign="center"
                        key={v4()}
                      >
                        {item.tvl}
                      </Typography>,
                    ],
                    handleClick: () =>
                      push(
                        {
                          pathname: Routes[RoutesEnum.VaultDetails],
                          query: {
                            address: item.id as string,
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
        {filteredVaults.map((item) => (
          <VaultCard {...item} key={v4()} />
        ))}
      </Box>
    </Container>
  );
};

export default VaultTable;
