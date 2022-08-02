import { FC, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { v4 } from 'uuid';

import { useDebounce } from '@/hooks';
import { ArrowSVG } from '@/svg';

import Box from '../box';
import Button from '../button';
import Typography from '../typography';
import { DropdownTableRowProps } from './dropdown-table.types';
import DropdownTableCell from './dropdown-table-cell';

const AnimatedBox = animated(Box);

const DropdownTableRow: FC<DropdownTableRowProps> = ({
  items,
  index,
  headings,
  ordinate,
  dropdown,
  isDesktop,
  sideContent,
}) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { Component: DropdownComponent, args: dropdownArgs } = dropdown;

  const { mHeight, dHeight, arrowInvert } = useSpring({
    from: {
      dHeight: '0%',
      mHeight: '0%',
      arrowInvert: 'scaleY(1)',
    },
    to: {
      dHeight: `${isOpenDropdown ? 16 : 0}rem`,
      mHeight: `${isOpenDropdown ? 26 : 0}rem`,
      arrowInvert: !isOpenDropdown ? 'scaleY(1)' : 'scaleY(-1)',
    },
    config: {
      duration: 500,
    },
  });

  const debouncedDropdownValue = useDebounce(isOpenDropdown, 500);

  const toggleDropdown = () => setIsOpenDropdown((a) => !a);

  return isDesktop ? (
    <Box display={['none', 'none', 'none', 'block']}>
      <Box
        py="M"
        px="XL"
        display="grid"
        alignItems="center"
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
          {!!dropdown && (
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
          )}
        </Box>
      </Box>
      <AnimatedBox style={{ maxHeight: dHeight }} overflow="hidden">
        <Box
          p="M"
          height="16rem"
          bg="foreground"
          transition="height 500ms ease-in-out"
        >
          {(debouncedDropdownValue || isOpenDropdown) && (
            <DropdownComponent {...dropdownArgs} />
          )}
        </Box>
      </AnimatedBox>
    </Box>
  ) : (
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
          {!!dropdown && (
            <Button
              py="M"
              width="2.5rem"
              height="2.5rem"
              variant="secondary"
              onClick={toggleDropdown}
              hover={{ bg: 'accentActive' }}
              bg={isOpenDropdown ? 'accent' : 'bottomBackground'}
            >
              <AnimatedBox style={{ transform: arrowInvert }}>
                <ArrowSVG width="0.5rem" />
              </AnimatedBox>
            </Button>
          )}
        </Box>
        <Box
          display="grid"
          borderRadius="M"
          overflow="hidden"
          gridAutoFlow="column"
          gridTemplateColumns="1fr 7rem"
          gridTemplateRows={`repeat(${
            headings.length + (ordinate ? 1 : 0)
          }, 1fr)`}
        >
          {ordinate && (
            <Typography
              py="M"
              px="M"
              fontSize="S"
              variant="normal"
              color="textSecondary"
            >
              Nº
            </Typography>
          )}
          {headings.map(({ item }) => (
            <Typography
              py="M"
              px="M"
              key={v4()}
              fontSize="S"
              variant="normal"
              color="textSecondary"
            >
              {item}
            </Typography>
          ))}
          {ordinate && (
            <Box
              py="M"
              px="M"
              borderBottom="0.1rem solid"
              borderColor="textDescriptionHigh"
            >
              {index! + 1}
            </Box>
          )}
          {items.map((item) => (
            <Box py="M" px="M" key={v4()}>
              {item}
            </Box>
          ))}
        </Box>
      </Box>
      <AnimatedBox style={{ maxHeight: mHeight }} overflow="hidden">
        <Box bg="foreground" p="M" height="26rem">
          {(debouncedDropdownValue || isOpenDropdown) && (
            <DropdownComponent {...dropdownArgs} />
          )}
        </Box>
      </AnimatedBox>
    </Box>
  );
};

export default DropdownTableRow;
