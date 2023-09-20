import { Box, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { TTranslatedMessage } from '@/interface';
import { capitalize } from '@/utils';

import { AccordionItemProps } from '../sidebar.types';

const AccordionItem: FC<AccordionItemProps> = ({ name, path }) => {
  const t = useTranslations();
  const { push, asPath } = useRouter();

  const goToPath = () => {
    if (path.startsWith('https://'))
      return window.open(path, '_blank')?.focus();

    push(path);
  };

  return (
    <Box
      mx="auto"
      width="100%"
      display="flex"
      cursor="pointer"
      borderRadius="m"
      onClick={goToPath}
      nHover={{ color: 'primary' }}
      transition="all 350ms ease-in-out"
      color={asPath === path ? 'primary' : 'onSurface'}
    >
      <Typography
        ml="l"
        pl="xl"
        py="s"
        variant="small"
        borderLeft="1px solid"
        borderColor="outline.outlineVariant"
      >
        {capitalize(t(`common.v2.navbar.${name}` as TTranslatedMessage))}
      </Typography>
    </Box>
  );
};

export default AccordionItem;