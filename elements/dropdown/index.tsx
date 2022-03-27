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
  search,
  bottom,
  suffix,
  footer,
  setOpen,
  minWidth,
  buttonMode,
  customTitle,
  customItems,
  defaultValue,
  isOpen: isExternalOpen,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [safeMarginLeft, setSafeMarginLeft] = useState<boolean>(false);
  const [safeMarginRight, setSafeMarginRight] = useState<boolean>(false);
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
    const domRect = dropdownContainerRef.current?.getBoundingClientRect();
    const screenWidth = document.documentElement.clientWidth;

    setSafeMarginLeft(!!domRect && domRect.left < 0);
    setSafeMarginRight(!!domRect && screenWidth - domRect.right < 0);
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
    <Box display="flex" id={dropdownWrapperId} position="relative">
      {mode === 'select' && selectedIndex !== -1 && customTitle ? (
        <Box display="inline-flex" onClick={toggleDropdown} cursor="pointer">
          {data[selectedIndex].displayTitle ||
            data[selectedIndex].displayOption}
          {suffix}
        </Box>
      ) : buttonMode ? (
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
          {mode === 'select' && selectedIndex !== -1
            ? data[selectedIndex].displayTitle ||
              data[selectedIndex].displayOption
            : title}
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
          boxShadow="0 0 1rem rgba(0,0,0,.3)"
          left={safeMarginLeft ? '1rem' : 'unset'}
          right={safeMarginRight ? '1rem' : 'unset'}
          {...(bottom
            ? { bottom: '5rem' }
            : { top: customTitle ? '2rem' : '4rem' })}
        >
          {header &&
            (typeof header === 'string' ? (
              <Typography
                variant="normal"
                p="L"
                fontSize="S"
                textAlign="center"
              >
                {header}
              </Typography>
            ) : (
              header
            ))}
          {data
            .filter(({ value }) =>
              value
                .toLocaleLowerCase()
                .match(`^${search?.toLocaleLowerCase() ?? ''}`)
            )
            .map((item, index) => (
              <DropdownItem
                key={v4()}
                minWidth={minWidth}
                setter={handleSelect(index)}
                customItem={customItems}
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
