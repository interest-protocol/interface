import { useRouter } from 'next/router';
import { FC, SVGAttributes } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Table, Typography } from '@/elements';

import { VaultTableProps } from '../../vault.types';
import VaultCard from './vault-card';
import VaultName from './vault-name';
import { DesktopVaultSkeletonRow } from './vault-skeleton-row';

const VaultTable: FC<VaultTableProps> = ({ data, loading }) => {
  const { push } = useRouter();
  const HEADING = ['Vault Name', 'APY', 'Earn', 'Type', 'TVL'];
  return (
    <Container dapp px="M" width="100%">
      <Box display={['none', 'none', 'none', 'block']}>
        <Table
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
                    items: [
                      <VaultName
                        Icons={
                          item.items.vaultName[0] as FC<
                            SVGAttributes<SVGSVGElement>
                          >[]
                        }
                        isAuto={item.items.vaultName[1] as boolean}
                        caption={item.items.vaultName[2] as string}
                        name={item.items.vaultName[3] as string}
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
                        {item.items.apy}
                      </Typography>,
                      <Typography
                        variant={'normal'}
                        fontWeight="400"
                        fontSize="0.9rem"
                        lineHeight="1.313rem"
                        textAlign="center"
                        key={v4()}
                      >
                        {item.items.earn}
                      </Typography>,
                      <Typography
                        variant={'normal'}
                        fontWeight="400"
                        fontSize="0.9rem"
                        lineHeight="1.313rem"
                        textAlign="center"
                        key={v4()}
                      >
                        {item.items.type}
                      </Typography>,
                      <Typography
                        variant={'normal'}
                        fontWeight="400"
                        fontSize="0.9rem"
                        lineHeight="1.313rem"
                        textAlign="center"
                        key={v4()}
                      >
                        {item.items.tvl}
                      </Typography>,
                    ],
                    handleClick: () =>
                      push(
                        {
                          pathname: Routes[RoutesEnum.VaultFarm],
                          query: {
                            farm: item.items.id as string,
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
