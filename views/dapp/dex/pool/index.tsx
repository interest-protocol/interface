import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';

import RecommendPools from './recommended-pools';

const Pool: FC = () => {
  const t = useTranslations();

  const { push } = useRouter();

  return (
    <>
      <Box color="text" width="100%" minWidth={['100%', '40rem']}>
        <Box
          py="L"
          my="L"
          px="L"
          display="flex"
          bg="foreground"
          borderRadius="M"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="normal"
            mr={['unset', 'auto']}
            textTransform="capitalize"
          >
            {t('dexPool.title')}
          </Typography>
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
        <RecommendPools />
      </Box>
    </>
  );
};

export default Pool;
