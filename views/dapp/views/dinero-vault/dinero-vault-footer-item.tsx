import { useTranslations } from 'next-intl';
import { FC } from 'react';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';

import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';
import { capitalize } from '@/utils';

import { DineroVaultDetailsFooterItemProps } from './dinero-vault.types';

const DineroVaultFooterItem: FC<DineroVaultDetailsFooterItemProps> = ({
  title,
  content,
  tip,
}) => {
  const t = useTranslations();
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
      justifyContent="space-between"
      alignItems={['unset', 'unset', 'unset', 'center']}
    >
      <Typography variant="normal">
        {tip && (
          <Box
            mr="M"
            as="span"
            cursor="help"
            data-tip={t(tip as MessageKeys<IntlMessages, keyof IntlMessages>)}
            display="inline-block"
          >
            <InfoSVG
              width="1rem"
              height="1rem"
              maxHeight="1rem"
              maxWidth="1rem"
            />
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
      <Typography
        variant="normal"
        color="textSecondary"
        fontSize="1rem"
        fontWeight="200"
        pl={[tip ? 'XL' : 'M', tip ? 'XL' : 'M', tip ? 'XL' : 'M', 'unset']}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default DineroVaultFooterItem;
