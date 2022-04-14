import { FC, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { v4 } from 'uuid';

import { ArrowSVG } from '@/svg';

import Box from '../box';
import Button from '../button';
import Typography from '../typography';
import { DropdownTableRowProps } from './dropdown-table.types';
import DropdownTableCell from './dropdown-table-cell';

const DropdownTableRow: FC<DropdownTableRowProps> = ({
  items,
  index,
  headings,
  ordinate,
  dropdown,
  sideContent,
}) => {
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const AnimatedBox = animated(Box);

  const { mHeight, dHeight, arrowInvert } = useSpring({
    from: {
      dHeight: '0px',
      mHeight: '0px',
      arrowInvert: 'scaleY(1)',
    },
    to: {
      arrowInvert: !isOpenDropdown ? 'scaleY(1)' : 'scaleY(-1)',
      dHeight: `${
        isOpenDropdown ? desktopRef.current?.offsetHeight ?? 0 : 0
      }px`,
      mHeight: `${isOpenDropdown ? mobileRef.current?.offsetHeight ?? 0 : 0}px`,
    },
    config: {
      duration: 500,
    },
  });

  const toggleDropdown = () => setIsOpenDropdown((a) => !a);

  return (
    <>
      <Box display={['none', 'none', 'none', 'block']}>
        <Box
          py="M"
          px="XL"
          display="grid"
          gridTemplateColumns={`1.5fr repeat(${
            headings.length + (ordinate ? 1 : 0)
          }, 1fr)`}
        >
          {items.map((item) => (
            <DropdownTableCell as="td" key={v4()}>
              {item}
            </DropdownTableCell>
          ))}
          <Box textAlign="right">
            <Button
              py="L"
              width="3.3rem"
              variant="secondary"
              onClick={toggleDropdown}
              hover={{ bg: 'accentActive' }}
              bg={isOpenDropdown ? 'accent' : 'bottomBackground'}
            >
              <AnimatedBox style={{ transform: arrowInvert }}>
                <ArrowSVG width="0.5rem" />
              </AnimatedBox>
            </Button>
          </Box>
        </Box>
        <AnimatedBox style={{ height: dHeight }} overflow="hidden">
          <Box bg="foreground" p="M" ref={desktopRef}>
            {dropdown}
          </Box>
        </AnimatedBox>
      </Box>
      <Box display={['block', 'block', 'block', 'none']} mt="M">
        <Box
          p="M"
          display="grid"
          cursor="pointer"
          gridTemplateColumns="1fr 1.5fr"
        >
          <Box
            my="M"
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            {sideContent}
            <Button
              py="L"
              width="3.3rem"
              variant="secondary"
              onClick={toggleDropdown}
              hover={{ bg: 'accentActive' }}
              bg={isOpenDropdown ? 'accent' : 'bottomBackground'}
            >
              <AnimatedBox style={{ transform: arrowInvert }}>
                <ArrowSVG width="0.5rem" />
              </AnimatedBox>
            </Button>
          </Box>
          <Box
            display="grid"
            borderRadius="M"
            overflow="hidden"
            gridTemplateColumns="1fr 7rem"
          >
            {ordinate && (
              <>
                <Typography
                  py="M"
                  px="M"
                  fontSize="S"
                  variant="normal"
                  color="textSecondary"
                >
                  Nº
                </Typography>

                <Box
                  py="M"
                  px="M"
                  borderBottom="0.1rem solid"
                  borderColor="textDescriptionHigh"
                >
                  {index! + 1}
                </Box>
              </>
            )}
            {items.map((item, headingIndex) => (
              <>
                <Typography
                  py="M"
                  px="M"
                  key={v4()}
                  fontSize="S"
                  variant="normal"
                  color="textSecondary"
                >
                  {headings[headingIndex].item}
                </Typography>
                <Box py="M" px="M">
                  {item}
                </Box>
              </>
            ))}
          </Box>
        </Box>
        <AnimatedBox style={{ height: mHeight }} overflow="hidden">
          <Box bg="foreground" p="M" ref={mobileRef}>
            {dropdown}
          </Box>
        </AnimatedBox>
      </Box>
    </>
  );
};

export default DropdownTableRow;
