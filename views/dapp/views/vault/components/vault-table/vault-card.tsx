import { FC, SVGAttributes } from 'react';

import { Box, Typography } from '@/elements';

import { VaultData } from '../../vault.types';
import VaultCardItem from './vault-card-item';
import VaultName from './vault-name';

const VaultCard: FC<VaultData> = ({ items, handleClick }) => {
  return (
    <Box
      width="100%"
      borderRadius="L"
      bg="foreground"
      py="M"
      my="M"
      onClick={handleClick}
    >
      <Box
        px="L"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <VaultName
          Icons={items.vaultName[0] as FC<SVGAttributes<SVGSVGElement>>[]}
          isAuto={items.vaultName[1] as boolean}
          caption={items.vaultName[2] as string}
          name={items.vaultName[3] as string}
        />
        <Box color="accent" display="flex" flexDirection="column">
          <Typography
            variant={'normal'}
            fontWeight="500"
            fontSize="1.1rem"
            lineHeight="1.313rem"
            textAlign="right"
          >
            APY
          </Typography>
          <Typography
            variant={'normal'}
            fontWeight="500"
            fontSize="1.1rem"
            lineHeight="1.313rem"
            textAlign="right"
          >
            {items.apy}
          </Typography>
        </Box>
      </Box>
      <Typography variant="normal" as="hr" color="#33373B" mb="M" />
      <VaultCardItem title="Earn" content={items.earn} />
      <VaultCardItem title="Platform" content={items.platform} />
      <VaultCardItem title="TVL" content={items.tvl} />
    </Box>
  );
};

export default VaultCard;
