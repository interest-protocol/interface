/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { Container } from '@/components';
import { LoadingSVG } from '@/svg';
import { capitalize } from '@/utils';
import { logGenericEvent } from '@/utils/analytics';

import { Box, Button, Input, Typography } from '../../../../elements';

const Subscribe: FC = () => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (event: Event) => {
    event.preventDefault();
    // @ts-ignore
    const email = event.target[0].value;
    setLoading(true);
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
        })
        .finally(() => setLoading(false)),
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
          fontSize={['1.9rem', '2.75rem']}
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
            display="flex"
            disabled={loading}
            variant="primary"
            fontWeight="bold"
            mt={['M', 'NONE']}
            ml={['NONE', 'S']}
            lineHeight="1.7rem"
            letterSpacing={1.09}
            justifyContent="center"
            minWidth={['100%', '10rem']}
            textTransform="uppercase"
            alignItems="center"
          >
            {t('landingPage.subscribeButton', { isLoading: loading ? 1 : 0 })}
            {loading && (
              <Box
                ml="L"
                display="inline-flex"
                position="relative"
                height="1rem"
                width="1rem"
              >
                <LoadingSVG
                  maxHeight="1rem"
                  maxWidth="1rem"
                  height="100%"
                  width="100%"
                />
              </Box>
            )}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Subscribe;
