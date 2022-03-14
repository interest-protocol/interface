import { animated, useSpring } from '@react-spring/web';
import { FC } from 'react';
import { v4 } from 'uuid';

import { RoadMapSVG } from '../../../../components/svg';
import { Box, Button, Typography } from '../../../../elements';
import { RoadMapItemProps } from './road-map.types';

const states = ['done', 'in development', 'soon'];
const stateColor = ['accent', 'success', 'warning'];

const AnimatedBox = animated(Box);

const RoadMapItem: FC<RoadMapItemProps> = ({
  status,
  list,
  title,
  next,
  onBack,
  length,
  onNext,
  step,
  position,
}) => {
  const { x } = useSpring({
    from: { x: 0 },
    x: step === position ? 1 : 0,
    config: { duration: 500 },
  });

  const { y } = useSpring({
    from: { y: 0 },
    y: step === position ? 1 : 0,
    config: { duration: 0 },
  });

  return (
    <>
      <AnimatedBox
        left="8rem"
        right="8rem"
        position="absolute"
        display={['none', 'none', 'block']}
        style={{
          opacity: y,
        }}
      >
        <RoadMapSVG height="100%" next={next.split(' ')} />
      </AnimatedBox>
      <AnimatedBox
        p="XL"
        width="100%"
        bg="foreground"
        maxWidth="21rem"
        borderRadius="L"
        minHeight="28rem"
        position="absolute"
        flexDirection="column"
        justifyContent="space-between"
        display="flex"
        boxShadow="0px 5px 10px -5px #AEC0EA"
        style={{
          scale: x,
          opacity: x,
        }}
      >
        <Box>
          <Box textAlign="right">
            <Typography
              py="M"
              px="L"
              as="span"
              variant="normal"
              borderRadius="L"
              display="inline-block"
              color={stateColor[status]}
              bg={`${stateColor[status]}Background`}
            >
              {states[status]}
            </Typography>
          </Box>
          <Typography variant="title2" as="h3" my="XL">
            {title}
          </Typography>
          <Box as="ul">
            {list.map((listItem) => (
              <Typography my="L" as="li" variant="normal" key={v4()}>
                {listItem}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button variant="neutral" onClick={onBack} disabled={step === 0}>
            &larr;
          </Button>
          {position !== length - 1 && (
            <Button variant="tertiary" onClick={onNext}>
              Next
            </Button>
          )}
        </Box>
      </AnimatedBox>
    </>
  );
};

export default RoadMapItem;
