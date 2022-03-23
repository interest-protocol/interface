import { FC } from 'react';

import Box from '../box';
import Typography from '../typography';
import { DropdownItemProps } from './dropdown.types';

const DropdownItem: FC<DropdownItemProps> = ({
  setter,
  onSelect,
  isSelected,
  noSelectable,
  closeDropdown,
  displayOption,
}) => {
  const handleSelect = () => {
    if (!isSelected) {
      if (!noSelectable) setter();
      onSelect?.();
    } else closeDropdown?.();
  };

  return (
    <Box
      my="M"
      display="flex"
      minWidth="17rem"
      cursor="pointer"
      minHeight="3rem"
      borderRadius="M"
      overflow="hidden"
      alignItems="center"
      onClick={handleSelect}
      boxShadow="0px 5px 5px -5px rgba(0, 0, 0, 0.35)"
      bg={isSelected ? 'accentBackground' : 'bottomBackground'}
      {...(!isSelected && {
        hover: {
          bg: 'accent',
        },
        active: {
          bg: 'accentActive',
        },
      })}
    >
      {typeof displayOption == 'string' ? (
        <Typography px="L" variant="normal">
          {displayOption}
        </Typography>
      ) : (
        displayOption
      )}
    </Box>
  );
};

export default DropdownItem;
