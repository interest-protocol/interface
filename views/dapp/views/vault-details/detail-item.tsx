import { useTranslations } from 'next-intl';
import { FC } from 'react';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';

import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';
import { capitalize } from '@/utils';

import { VaultDetailsItemProps } from './vault-details.types';

const VaultDetailsItem: FC<VaultDetailsItemProps> = ({
  title,
  content,
  tip,
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
          fontWeight="400"
        >
          {capitalize(
            t(title as MessageKeys<IntlMessages, keyof IntlMessages>)
          )}
        </Typography>
      </Typography>
      <Typography
        variant="normal"
        color={'text'}
        fontSize={'1rem'}
        fontWeight="500"
        pl={['XL', 'XL', 'XL', 'unset']}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default VaultDetailsItem;
