import { FC, useState } from 'react';

import Box from '../box';
import { DropdownProps } from './dropdown.types';
import DropdownList from './dropdown-list';

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
  relative,
  minWidth,
  fromRight,
  buttonMode,
  customTitle,
  customItems,
  emptyMessage,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(
    data.findIndex(({ value }) => value === defaultValue)
  );

  const toggleDropdown = () => setIsOpen((state) => !state);

  return (
    <Box
      display="flex"
      id={dropdownWrapperId}
      position={relative ? 'relative' : 'static'}
    >
      {mode === 'select' && selectedIndex !== -1 && customTitle ? (
        <Box
          width="100%"
          cursor="pointer"
          alignItems="center"
          display="inline-flex"
          whiteSpace="nowrap"
          onClick={toggleDropdown}
        >
          {data[selectedIndex].displayTitle ||
            data[selectedIndex].displayOption}
          {suffix}
        </Box>
      ) : buttonMode ? (
        <Box
          mx="S"
          px="0.7rem"
          py="0.7rem"
          width="100%"
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
        <Box
          width="100%"
          cursor="pointer"
          whiteSpace="nowrap"
          onClick={toggleDropdown}
          color={isOpen ? 'accent' : 'text'}
        >
          {mode === 'select' && selectedIndex !== -1
            ? data[selectedIndex].displayTitle ||
              data[selectedIndex].displayOption
            : title}
          {suffix}
        </Box>
      )}
      <DropdownList
        data={data}
        isOpen={isOpen}
        header={header}
        search={search}
        bottom={bottom}
        footer={footer}
        minWidth={minWidth}
        fromRight={fromRight}
        setIsOpen={setIsOpen}
        customItems={customItems}
        emptyMessage={emptyMessage}
        selectedIndex={selectedIndex}
        toggleDropdown={toggleDropdown}
        setSelectedIndex={setSelectedIndex}
        dropdownWrapperId={dropdownWrapperId}
      />
    </Box>
  );
};

export default Dropdown;
