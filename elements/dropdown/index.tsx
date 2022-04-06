import { FC, useState } from 'react';

import Box from '../box';
import Typography from '../typography';
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
  buttonMode,
  customTitle,
  customItems,
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
          cursor="pointer"
          alignItems="center"
          display="inline-flex"
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
      <DropdownList
        data={data}
        isOpen={isOpen}
        header={header}
        search={search}
        bottom={bottom}
        footer={footer}
        minWidth={minWidth}
        setIsOpen={setIsOpen}
        customItems={customItems}
        selectedIndex={selectedIndex}
        toggleDropdown={toggleDropdown}
        setSelectedIndex={setSelectedIndex}
        dropdownWrapperId={dropdownWrapperId}
      />
    </Box>
  );
};

export default Dropdown;
