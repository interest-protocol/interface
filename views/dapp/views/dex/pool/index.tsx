import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Switch } from '@/components';
import { PoolType, Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { capitalize } from '@/utils';

import RecommendPools from './recommended-pools';

const Pool: FC = () => {
  const t = useTranslations();
  const [poolType, setPoolType] = useState<PoolType>(PoolType.Volatile);

  const { push } = useRouter();

  return (
    <>
      <Box color="text" width="100%" minWidth={['100%', '40rem']}>
        <Box
          py="L"
          my="L"
          px="L"
          display="grid"
          gridGap="1rem"
          bg="foreground"
          borderRadius="M"
          alignItems="center"
          justifyItems="center"
          gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
        >
          <Typography
            variant="normal"
            mr={['unset', 'auto']}
            textTransform="capitalize"
          >
            {t('dexPool.title')}
          </Typography>
          <Switch
            defaultValue={poolType}
            options={[
              {
                value: PoolType.Volatile,
                displayValue: capitalize(
                  capitalize(t('common.volatile', { count: 2 }))
                ),
                onSelect: () => setPoolType(PoolType.Volatile),
              },
              {
                value: PoolType.Stable,
                displayValue: capitalize(t('common.stable', { count: 2 })),
                onSelect: () => setPoolType(PoolType.Stable),
              },
            ]}
          />
          <Button
            px="XL"
            type="button"
            variant="primary"
            onClick={() => push(Routes[RoutesEnum.DEXFindPool])}
            ml={['unset', 'auto']}
          >
            {t('dexPool.button')}
          </Button>
        </Box>
        <RecommendPools type={poolType} />
      </Box>
    </>
  );
};

export default Pool;
