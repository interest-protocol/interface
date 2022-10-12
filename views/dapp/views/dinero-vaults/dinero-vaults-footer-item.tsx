import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';

import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';
import { capitalize } from '@/utils';

import { DineroVaultDetailsFooterItemProps } from './dinero-vaults.types';

const DineroVaultDetailsFooterItem: FC<DineroVaultDetailsFooterItemProps> = ({
  title,
  content,
  tip,
  isLoading,
}) => {
  const t = useTranslations();
  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
      justifyContent="space-between"
      mb="0.75rem"
    >
      <Typography variant="normal" display="flex" alignItems="center">
        {tip && (
          <Box
            mr="M"
            as="span"
            cursor="help"
            data-tip={t(tip as MessageKeys<IntlMessages, keyof IntlMessages>)}
            display="inline-block"
          >
            <InfoSVG width="1rem" height="1rem" />
          </Box>
        )}
        <Typography
          variant="normal"
          color="text"
          fontSize="1rem"
          fontWeight="500"
          as="span"
        >
          {capitalize(
            t(title as MessageKeys<IntlMessages, keyof IntlMessages>)
          )}
        </Typography>
      </Typography>
      {!isLoading ? (
        <Typography
          variant="normal"
          color="textSecondary"
          fontSize="1rem"
          fontWeight="200"
          pl={[tip ? 'XL' : 'M', tip ? 'XL' : 'M', tip ? 'XL' : 'M', 'unset']}
        >
          {content}
        </Typography>
      ) : (
        <Box as="span" width="5rem">
          <Skeleton />
        </Box>
      )}
    </Box>
  );
};

export default DineroVaultDetailsFooterItem;
