/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from 'react';
import toast from 'react-hot-toast';

import Container from '../../../../components/container';
import { LogoSVG, ShieldSVG } from '../../../../components/svg';
import { Box, Button, Input, Typography } from '../../../../elements';

const Subscribe: FC = () => {
  const handleSubscribe = async (event: Event) => {
    event.preventDefault();
    // @ts-ignore
    const email = event.target[0].value;
    toast.promise(
      fetch(`/api/v1/mail/subscribe?email=${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status >= 400) throw data;
          if (data.status == 200) return data;
        }),
      {
        loading: 'Subscribing',
        success: 'Success!',
        error: (error) => error.title,
      }
    );
  };

  return (
    <Container
      py="XXXL"
      as="section"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Box>
        <LogoSVG width="5rem" />
      </Box>
      <Typography
        mt="M"
        as="h2"
        maxWidth="30rem"
        variant="title2"
        textAlign="center"
        fontSize={['L', 'XXL']}
      >
        Subscribe for <br className="breakMobile" />
        Interest Protocol updates
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
          placeholder="Drop your e-mail"
        />
        <Box display="flex" flexDirection="column" alignItems="stretch">
          <Button ml="S" px="L" type="submit" variant="tertiary">
            Subscribe
          </Button>
          <Box display="flex" alignItems="center" mt="M" px="L">
            <ShieldSVG width="0.7rem" />
            <Typography variant="normal" ml="S" fontSize="XS">
              Your data is safe
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Subscribe;
