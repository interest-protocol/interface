/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { Container } from '@/components';
import { capitalize } from '@/utils';
import { logGenericEvent } from '@/utils/analytics';

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
          logGenericEvent(propOr('code', 'email subscription error', x));
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
    <Box bg="text">
      <Container
        py="XXXL"
        as="section"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <Typography
          mt="M"
          as="h2"
          variant="title1"
          maxWidth="40rem"
          color="textInverted"
          textTransform="capitalize"
          fontSize={['1.9rem', 'XXXL']}
          textAlign={['center', 'center', 'center', 'left']}
        >
          {t('landingPage.subscribeSectionText')}
        </Typography>
        <Box
          as="form"
          width="100%"
          display="flex"
          alignItems="stretch"
          // @ts-ignore
          onSubmit={handleSubscribe}
          mt={['XL', 'XL', 'XL', 'NONE']}
          flexDirection={['column', 'row']}
          justifyContent={['center', 'center', 'center', 'flex-end']}
        >
          <Input
            p="L"
            type="email"
            bg="outline"
            border="none"
            outline="none"
            borderRadius="S"
            mr={['NONE', 'S']}
            color="textInverted"
            width={['100%', '20rem']}
            backgroundColor="#262626"
            placeholder={t('landingPage.subscribeInputPlaceholder')}
          />
          <Button
            p="L"
            type="submit"
            effect="hover"
            variant="tertiary"
            fontWeight="bold"
            mt={['M', 'NONE']}
            ml={['NONE', 'S']}
            lineHeight="1.7rem"
            letterSpacing={1.09}
            width={['100%', '10rem']}
            textTransform="uppercase"
          >
            {t('landingPage.subscribeButton', { isLoading: 0 })}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Subscribe;
