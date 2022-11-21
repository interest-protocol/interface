/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { GAAction } from '@/constants/google-analytics';
import { LogoSVG, ShieldSVG } from '@/svg';
import { capitalize } from '@/utils';
import { logException } from '@/utils/analytics';

import { Box, Button, Input, Typography } from '../../../../elements';

const Subscribe: FC = () => {
  const t = useTranslations();
  const handleSubscribe = async (event: Event) => {
    event.preventDefault();
    // @ts-ignore
    const email = event.target[0].value;
    toast.promise(
      fetch(`/api/v1/mail/subscribe?email=${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.httpStatus >= 400) throw data;
          if (data.httpStatus == 200) return data;
        })
        .catch((x) => {
          logException({
            action: GAAction.SubmitTransaction,
            label: propOr('code', 'email subscription error', x),
            trackerName: ['views\\home\\components\\subscribe\\index.tsx'],
          });
          throw x;
        }),
      {
        loading: t('landingPage.subscribeButton', { isLoading: 1 }),
        success: capitalize(t('common.success')),
        error: (error) =>
          capitalize(
            t(
              error.code == 1008
                ? 'landingPage.subscribeErrors.1008'
                : 'error.generic'
            )
          ),
      }
    );
  };

  return (
    <Box
      py="XXXL"
      as="section"
      display="flex"
      alignItems="center"
      flexDirection="column"
      bg="background"
    >
      <Box width="5rem">
        <LogoSVG width="100%" />
      </Box>
      <Typography
        mt="M"
        as="h2"
        maxWidth="40rem"
        variant="title2"
        textAlign="center"
        fontSize={['L', 'XXL']}
      >
        {t('landingPage.subscribeSectionTitle')}
      </Typography>
      <Box
        mt="XXL"
        as="form"
        display="flex"
        // @ts-ignore
        onSubmit={handleSubscribe}
        flexDirection={['column', 'row']}
        alignItems={['center', 'flex-start']}
      >
        <Input
          p="L"
          mr="S"
          type="email"
          bg="outline"
          width="15rem"
          border="none"
          outline="none"
          borderRadius="S"
          mb={['L', 'NONE']}
          placeholder={t('landingPage.subscribeInputDescription')}
        />
        <Box
          display="flex"
          mt={['L', 'NONE']}
          alignItems="stretch"
          flexDirection="column"
        >
          <Button ml="S" px="L" type="submit" variant="tertiary" effect="hover">
            {t('landingPage.subscribeButton', { isLoading: 0 })}
          </Button>
          <Box display="flex" alignItems="center" mt="M" px="L">
            <Box width="0.7rem">
              <ShieldSVG width="100%" />
            </Box>
            <Typography variant="normal" ml="S" fontSize="XS">
              {t('landingPage.subscribeDescription')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Subscribe;
