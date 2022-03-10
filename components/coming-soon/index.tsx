import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '../../constants/routes';
import { Box, Typography } from '../../elements';
import ModalCard from '../modal-card';
import { DoorSVG } from '../svg';

const ComingSoon: FC = () => {
  const { push } = useRouter();

  const handleClose = () => push(Routes[RoutesEnum.Home]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundImage="linear-gradient(226.51deg, #D5E0FF 34.24%, #D5E0FF 34.24%, #E7EDFF 45.58%, #EBF0FF 76.14%);"
    >
      <ModalCard onClose={handleClose}>
        <DoorSVG width="3.5rem" />
        <Typography variant="normal" fontSize="XXL" mt="L">
          Coming Soon
        </Typography>
      </ModalCard>
    </Box>
  );
};

export default ComingSoon;
