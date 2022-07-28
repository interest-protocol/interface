import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Typography } from '@/elements';

import { VaultData } from '../../vault.types';
import VaultCardItem from './vault-card-item';
import VaultName from './vault-name';

const VaultCard: FC<VaultData> = ({
  id,
  vault,
  apy,
  earn,
  type,
  tvl,
  isAuto,
  caption,
}) => {
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
            pathname: Routes[RoutesEnum.VaultFarm],
            query: {
              farm: id as string,
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
        <VaultName vault={vault} isAuto={isAuto} caption={caption} />
        <Box color="accent" display="flex" flexDirection="column">
          <Typography
            variant={'normal'}
            fontWeight="500"
            fontSize="0.85rem"
            lineHeight="1rem"
            textAlign="right"
          >
            APY
          </Typography>
          <Typography
            variant={'normal'}
            fontWeight="500"
            fontSize="0.85rem"
            lineHeight="1.313rem"
            textAlign="right"
          >
            {apy}
          </Typography>
        </Box>
      </Box>
      <Typography variant="normal" as="hr" color="#33373B" my="M" />
      <VaultCardItem title="Earn" content={earn} />
      <VaultCardItem title="Platform" content={type} />
      <VaultCardItem title="TVL" content={tvl} />
    </Box>
  );
};

export default VaultCard;
