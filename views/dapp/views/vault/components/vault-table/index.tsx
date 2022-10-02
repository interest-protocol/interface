import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';

import { VaultTableProps } from '../../vault.types';
import VaultCard from './vault-card';
import VaultName from './vault-name';
import { DesktopVaultSkeletonRow } from './vault-skeleton-row';

const VaultTable: FC<VaultTableProps> = ({ data, loading }) => {
  const { push } = useRouter();
  const HEADING = ['Vaults Name', 'APR', 'Earn', 'Type', 'TVL'];
  return (
    <Container dapp px="M" width="100%">
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
              : data.map((item) => {
                  return {
                    button: (
                      <Button
                        variant="primary"
                        hover={{ bg: 'accentActive' }}
                        onClick={() =>
                          push(
                            {
                              pathname: Routes[RoutesEnum.VaultFarm],
                              query: {
                                farm: item.id as string,
                              },
                            },
                            undefined,
                            {
                              shallow: true,
                            }
                          )
                        }
                      >
                        Enter
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
                          pathname: Routes[RoutesEnum.VaultFarm],
                          query: {
                            farm: item.id as string,
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
        {data.map((item) => (
          <VaultCard {...item} key={v4()} />
        ))}
      </Box>
    </Container>
  );
};

export default VaultTable;
