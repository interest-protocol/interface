import { not } from 'ramda';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';

import { SwitchingNetworkModal } from './wallet-modal';

const SwitchingNetwork: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal(not);

  return (
    <>
      <Button
        py="M"
        px="XL"
        type="button"
        display="flex"
        alignItems="center"
        variant="secondary"
        onClick={toggleModal}
      >
        <Box my="S">
          <LoadingSVG width="1rem" />
        </Box>
        <Typography variant="normal" ml="M" my="S">
          Switching Network
        </Typography>
      </Button>
      <SwitchingNetworkModal isOpen={isOpenModal} handleClose={toggleModal} />
    </>
  );
};

export default SwitchingNetwork;
