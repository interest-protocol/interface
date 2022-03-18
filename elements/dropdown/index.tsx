import { FC, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';

import Box from '../box';
import Typography from '../typography';
import { DropdownProps } from './dropdown.types';
import DropdownItem from './dropdown-item';

const Dropdown: FC<DropdownProps> = ({
  defaultValue,
  data,
  mode,
  title,
  header,
  suffix,
  footer,
  buttonMode,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [safeMarginLeft, setSafeMarginLeft] = useState(0);
  const [safeMarginRight, setSafeMarginRight] = useState(0);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    data.findIndex(({ value }) => value === defaultValue)
  );

  useEffect(() => {
    if (dropdownContainerRef.current) {
      const leftPosition = dropdownContainerRef.current.offsetLeft;
      const boxWidth = dropdownContainerRef.current.offsetWidth;
      const screenWidth = window.outerWidth;

      const safeDistanceRight = screenWidth - (leftPosition + boxWidth);

      safeDistanceRight < 0 && setSafeMarginRight(-safeDistanceRight + 32);
      leftPosition < 0 && setSafeMarginLeft(-leftPosition + 32);
    }
  }, [isOpen]);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleSelect = (index: number) => () => {
    setSelectedIndex(index);
    toggleDropdown();
  };

  return (
    <Box display="flex" justifyContent="center">
      {buttonMode ? (
        <Box
          py="M"
          px={['L', 'XL']}
          cursor="pointer"
          borderRadius="M"
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
      {isOpen && (
        <Box
          p="M"
          top="4.5rem"
          bg="foreground"
          borderRadius="M"
          position="absolute"
          ml={`-${safeMarginLeft}px`}
          mr={`${safeMarginRight}px`}
          ref={dropdownContainerRef}
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
