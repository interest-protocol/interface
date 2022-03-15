import { Controls, Player } from '@lottiefiles/react-lottie-player';
import { FC } from 'react';

import { Box } from '../../elements';
import Header from '../../layout/header';

const ComingSoon: FC = () => (
  <Box height="100vh">
    <Header empty />
    <Box
      width="100vw"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundImage="linear-gradient(226.51deg, #D5E0FF 34.24%, #D5E0FF 34.24%, #E7EDFF 45.58%, #EBF0FF 76.14%);"
    >
      <Player
        autoplay
        loop
        src="https://assets3.lottiefiles.com/packages/lf20_ypjdfhjl.json"
        style={{ height: '300px', width: '300px' }}
      >
        <Controls visible={false} />
      </Player>
    </Box>
  </Box>
);

export default ComingSoon;
