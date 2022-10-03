import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { capitalize } from '@/utils';

import { VaultData } from '../../vault.types';
import VaultCardItem from './vault-card-item';
import VaultName from './vault-name';

const VaultCard: FC<VaultData> = ({
  id,
  vault,
  apr,
  earn,
  type,
  tvl,
  caption,
}) => {
  const t = useTranslations();
  const { push } = useRouter();

  return (
    <Box
      width="100%"
      borderRadius="L"
      bg="foreground"
      py="M"
      my="M"
      onClick={() =>
        push(
          {
            pathname: Routes[RoutesEnum.VaultDetails],
            query: {
              address: id as string,
            },
          },
          undefined,
          {
            shallow: true,
          }
        )
      }
    >
      <Box
        px="L"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <VaultName vault={vault} caption={caption} />
        <Box color="accent" display="flex" flexDirection="column">
          <Typography
            variant={'normal'}
            fontWeight="500"
            fontSize="0.85rem"
            lineHeight="1rem"
            textAlign="right"
          >
            APR
          </Typography>
          <Typography
            variant={'normal'}
            fontWeight="500"
            fontSize="0.85rem"
            lineHeight="1.313rem"
            textAlign="right"
          >
            {apr}
          </Typography>
        </Box>
      </Box>
      <Typography variant="normal" as="hr" color="#33373B" my="M" />
      <VaultCardItem title={t('vault.column3')} content={earn} />
      <VaultCardItem title={t('common.type')} content={type} />
      <VaultCardItem title="TVL" content={tvl} />
      <Box mx="auto" px="L" py="M">
        <Button
          variant="primary"
          width="100%"
          hover={{ bg: 'accentActive' }}
          onClick={() =>
            push(
              {
                pathname: Routes[RoutesEnum.VaultDetails],
                query: {
                  address: id as string,
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
      </Box>
    </Box>
  );
};

export default VaultCard;
