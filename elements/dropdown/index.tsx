import { FC, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import Box from '../box';
import Typography from '../typography';
import { DropdownProps } from './dropdown.types';
import DropdownItem from './dropdown-item';

const Dropdown: FC<DropdownProps> = ({
  data,
  mode,
  title,
  header,
  suffix,
  footer,
  buttonMode,
  defaultValue,
  setOpen,
  isOpen: isExternalOpen,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [safeMarginLeft, setSafeMarginLeft] = useState(true);
  const [safeMarginRight, setSafeMarginRight] = useState(true);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    data.findIndex(({ value }) => value === defaultValue)
  );

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
    <Box display="flex" justifyContent="center">
      {buttonMode ? (
        <Box
          mx="S"
          py="M"
          px={['M', 'L']}
          cursor="pointer"
          borderRadius="L"
          alignItems="center"
          display="inline-flex"
          onClick={toggleDropdown}
          bg={isOpen ? 'accent' : 'bottomBackground'}
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
          top="4rem"
          bg="foreground"
          borderRadius="M"
          position="absolute"
          ref={dropdownContainerRef}
          left={safeMarginLeft ? 'unset' : '1rem'}
          right={safeMarginRight ? 'unset' : '1rem'}
        >
          {header && (
            <Typography variant="normal" p="L" fontSize="S" textAlign="center">
              {header}
            </Typography>
          )}
          {data.map((item, index) => (
            <DropdownItem
              key={v4()}
              setter={handleSelect(index)}
              isSelected={index === selectedIndex}
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
