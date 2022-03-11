import { FC, useState } from 'react';

import { ModalCard } from '../../../../components';
import Container from '../../../../components/container';
import { LogoSVG, ShieldSVG, SuccessSVG } from '../../../../components/svg';
import { Box, Button, Input, Modal, Typography } from '../../../../elements';

const Subscribe: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscribe = () => {
    // Subscription instructions
    setIsModalOpen(true);
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
        <ModalCard onClose={handleCloseModal}>
          <Box mt="XXXL">
            <SuccessSVG width="3rem" />
          </Box>
          <Typography variant="normal" fontSize="XL" my="L">
            Success!
          </Typography>
          <Typography
            color="text"
            variant="normal"
            maxWidth="12rem"
            textAlign="center"
          >
            We will get back to you as soon as possible
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
          display="flex"
          alignItems={['center', 'flex-start']}
          flexDirection={['column', 'row']}
        >
          <Input
            p="L"
            mb={['L', 'NONE']}
            mr="S"
            type="text"
            bg="outline"
            width="15rem"
            border="none"
            outline="none"
            borderRadius="S"
            placeholder="Drop your e-mail"
          />
          <Box display="flex" flexDirection="column" alignItems="stretch">
            <Button variant="tertiary" ml="S" px="L" onClick={handleSubscribe}>
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
