import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

import { Switch } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { capitalize } from '@/utils';

import RecommendPools from './recommended-pools';

const Pool: FC = () => {
  const t = useTranslations();
  const [poolType, setPoolType] = useState('1');

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
          borderRadius="2.5rem"
          alignItems="center"
          justifyItems="center"
          gridTemplateColumns={['1fr', '1fr 1fr 1fr']}
        >
          <Typography
            variant="normal"
            mr={['unset', 'auto']}
            textTransform="capitalize"
            color="textSecondary"
          >
            {t('dexPool.title')}
          </Typography>
          <Switch
            defaultValue={poolType}
            options={[
              {
                value: '1',
                displayValue: capitalize(
                  capitalize(t('common.volatile', { count: 2 }))
                ),
                onSelect: () => setPoolType('1'),
              },
              {
                value: '1',
                displayValue: capitalize(t('common.stable', { count: 2 })),
                onSelect: () => setPoolType('1'),
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
