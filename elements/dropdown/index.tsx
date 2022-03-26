/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import Box from '../box';
import Typography from '../typography';
import { DropdownProps } from './dropdown.types';
import DropdownItem from './dropdown-item';

const dropdownWrapperId = 'dropdown-wrapper';

const Dropdown: FC<DropdownProps> = ({
  data,
  mode,
  title,
  header,
  bottom,
  suffix,
  footer,
  setOpen,
  minWidth,
  buttonMode,
  defaultValue,
  isOpen: isExternalOpen,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [safeMarginLeft, setSafeMarginLeft] = useState(true);
  const [safeMarginRight, setSafeMarginRight] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    data.findIndex(({ value }) => value === defaultValue)
  );

  const closeDropdown = useCallback((event: any) => {
    if (event?.path?.some((node: any) => node?.id == dropdownWrapperId)) {
      return;
    }
    setIsOpen(false);
  }, []);

  const dropdownContainerRef =
    useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  useEffect(() => {
    if (dropdownContainerRef.current) {
      const leftPosition = dropdownContainerRef.current.offsetLeft;
      const boxWidth = dropdownContainerRef.current.offsetWidth;
      const screenWidth = document.documentElement.clientWidth;

      const safeDistanceRight = screenWidth - (leftPosition + boxWidth);

      safeDistanceRight < 0 && setSafeMarginRight(false);
      leftPosition < 0 && setSafeMarginLeft(false);
    }
  }, [isExternalOpen, isOpen]);

  const toggleDropdown = () => {
    if (isExternalOpen === undefined) setIsOpen(!isOpen);
    setOpen?.(!isExternalOpen);
  };

  const handleSelect = (index: number) => () => {
    setSelectedIndex(index);
    toggleDropdown();
  };

  return (
    <Box display="flex" id={dropdownWrapperId}>
      {buttonMode ? (
        <Box
          mx="S"
          px="0.7rem"
          py="0.7rem"
          cursor="pointer"
          borderRadius="M"
          maxHeight="2.8rem"
          alignItems="center"
          display="inline-flex"
          onClick={toggleDropdown}
          bg={isOpen ? 'accentActive' : 'bottomBackground'}
          hover={{
            bg: 'accent',
          }}
          active={{
            bg: 'accentActive',
          }}
        >
          {mode === 'select' && selectedIndex !== -1
            ? data[selectedIndex].displayTitle ||
              data[selectedIndex].displayOption
            : title}
          {suffix}
        </Box>
      ) : (
        <Typography
          variant="normal"
          cursor="pointer"
          onClick={toggleDropdown}
          color={isOpen ? 'accent' : 'text'}
        >
          {title}
          {suffix}
        </Typography>
      )}
      {(isExternalOpen ?? isOpen) && (
        <Box
          p="M"
          zIndex={1}
          bg="foreground"
          borderRadius="M"
          position="absolute"
          ref={dropdownContainerRef}
          left={safeMarginLeft ? 'unset' : '1rem'}
          right={safeMarginRight ? 'unset' : '1rem'}
          boxShadow="0 0 1rem rgba(0,0,0,.3)"
          {...(bottom ? { bottom: '5rem' } : { top: '4rem' })}
        >
          {header && (
            <Typography variant="normal" p="L" fontSize="S" textAlign="center">
              {header}
            </Typography>
          )}
          {data.map((item, index) => (
            <DropdownItem
              key={v4()}
              minWidth={minWidth}
              setter={handleSelect(index)}
              isSelected={index === selectedIndex}
              {...(index === selectedIndex && {
                closeDropdown: toggleDropdown,
              })}
              {...item}
            />
          ))}
          {footer && (
            <Typography
              p="L"
              fontSize="XS"
              variant="normal"
              textAlign="center"
              whiteSpace="nowrap"
            >
              {footer}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Dropdown;
