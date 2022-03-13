/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useState } from 'react';

import { ModalCard } from '../../../../components';
import Container from '../../../../components/container';
import {
  FailSVG,
  LogoSVG,
  ShieldSVG,
  SuccessSVG,
} from '../../../../components/svg';
import { Box, Button, Input, Modal, Typography } from '../../../../elements';

const Subscribe: FC = () => {
  const [error, setError] = useState<unknown | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribe = (event: Event) => {
    event.preventDefault();
    setError(undefined);
    // @ts-ignore
    const email = event.target[0].value;
    fetch(`/api/v1/mail/subscribe?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status >= 400) throw data;
        if (data.status == 200) return data;
      })
      .catch(setError)
      .finally(() => setIsModalOpen(true));
  };
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <>
      <Modal
        shouldCloseOnEsc
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <ModalCard
          onClose={handleCloseModal}
          color={error ? 'error' : undefined}
        >
          <Box mt="XXXL">
            {error ? <FailSVG width="3rem" /> : <SuccessSVG width="3rem" />}
          </Box>
          <Typography variant="normal" fontSize="XL" my="L">
            {error ? 'Failed!' : 'Success!'}
          </Typography>
          <Typography
            color="text"
            variant="normal"
            maxWidth="12rem"
            textAlign="center"
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(error as any)?.title ||
              'We will get back to you as soon as possible'}
            {console.log(error)}
          </Typography>
        </ModalCard>
      </Modal>
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
    </>
  );
};
export default Subscribe;
