import { FC } from 'react';

import Box from '../box';
import Typography from '../typography';
import { DropdownItemProps } from './dropdown.types';

const DropdownItem: FC<DropdownItemProps> = ({
  setter,
  onSelect,
  minWidth,
  isSelected,
  customItem,
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
      {...(!customItem && {
        m: 'M',
        display: 'flex',
        minHeight: '3rem',
        borderRadius: 'M',
        alignItems: 'center',
        overflow: 'hidden',
        minWidth: minWidth || '17rem',
        boxShadow: '0px 5px 5px -5px rgba(0, 0, 0, 0.35)',
        bg: isSelected ? 'accentBackground' : 'bottomBackground',
        ...(!isSelected && {
          hover: {
            bg: 'accent',
          },
          active: {
            bg: 'accentActive',
          },
        }),
      })}
      cursor="pointer"
      onClick={handleSelect}
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
