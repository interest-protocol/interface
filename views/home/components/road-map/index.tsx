import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Container from '../../../../components/container';
import { RoadMapLogoSVG } from '../../../../components/svg';
import { Box, Typography } from '../../../../elements';
import { ROAD_MAP_DATA } from './road-map.data';
import RoadMapItem from './road-map-item';

const RoadMap: FC = () => {
  const [step, setStep] = useState(0);

  const handleBack = () => setStep((i) => i - 1);
  const handleForward = () => setStep((i) => i + 1);

  return (
    <Box as="section" bg="bottomBackground">
      <Container py="XXXL">
        <Typography variant="title2" as="h2">
          Our Roadmap
        </Typography>
        <Box
          mt="XXL"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="30rem"
          position="relative"
        >
          <Box
            bottom="0"
            right="5rem"
            position="absolute"
            display={['none', 'none', 'block']}
          >
            <RoadMapLogoSVG width="23rem" />
          </Box>
          {ROAD_MAP_DATA.map((roadMapItem, index) => (
            <RoadMapItem
              key={v4()}
              step={step}
              length={ROAD_MAP_DATA.length}
              position={index}
              {...roadMapItem}
              onNext={handleForward}
              onBack={handleBack}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RoadMap;
