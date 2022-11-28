import { useTranslations } from 'next-intl';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';

import { SwitchingNetworkModal } from './wallet-modal';

const SwitchingNetwork: FC = () => {
  const t = useTranslations();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => setIsOpenModal(not);

  return (
    <>
      <Button
        py="M"
        type="button"
        display="flex"
        alignItems="center"
        variant="secondary"
        onClick={toggleModal}
        px={['L', 'L', 'L', 'XL']}
      >
        <Box my="S" width="1rem">
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
        </Box>
        <Typography variant="normal" ml="M" my="S" whiteSpace="nowrap">
          {t('wallet.switchNetwork.title')}
        </Typography>
      </Button>
      <SwitchingNetworkModal isOpen={isOpenModal} handleClose={toggleModal} />
    </>
  );
};

export default SwitchingNetwork;
