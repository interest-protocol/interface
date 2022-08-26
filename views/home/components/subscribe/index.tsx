/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { LogoSVG, ShieldSVG } from '@/svg';

import { Box, Button, Input, Typography } from '../../../../elements';

const Subscribe: FC = () => {
  const tIndex = useTranslations('index');
  const tCommon = useTranslations('common');
  const handleSubscribe = async (event: Event) => {
    event.preventDefault();
    // @ts-ignore
    const email = event.target[0].value;
    toast
      .promise(
        fetch(`/api/v1/mail/subscribe?email=${email}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.httpStatus >= 400) throw data;
            if (data.httpStatus == 200) return data;
          }),
        {
          loading: tIndex('subscribeLoading'),
          success: tCommon('success'),
          error: (error) => `${error.code} - ${error.message}`,
        }
      )
      .catch(console.log);
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
        maxWidth="45rem"
        variant="title2"
        textAlign="center"
        fontSize={['L', 'XXL']}
      >
        {tIndex('subscribeTitle')} <br className="breakMobile" />
        {tIndex('subscribeSubtitle')}
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
          placeholder={tIndex('subscribeInputPlaceholder')}
        />
        <Box
          display="flex"
          mt={['L', 'NONE']}
          alignItems="stretch"
          flexDirection="column"
        >
          <Button ml="S" px="L" type="submit" variant="tertiary" effect="hover">
            {tIndex('subscribeButton')}
          </Button>
          <Box display="flex" alignItems="center" mt="M" px="L">
            <Box width="0.7rem">
              <ShieldSVG width="100%" />
            </Box>
            <Typography variant="normal" ml="S" fontSize="XS">
              {tIndex('subscribeSafeData')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Subscribe;
