import { FC } from 'react';

import Box from '../box';
import { DropdownTableCellProps } from './dropdown-table.types';

const DropdownTableCell: FC<DropdownTableCellProps> = ({
  as,
  tip,
  children,
}) => (
  <Box
    py="L"
    px="M"
    data-tip={tip}
    textAlign="left"
    fontWeight="400"
    {...(tip && { cursor: 'help' })}
    role={as == 'td' ? 'gridcell' : 'columnheader'}
  >
    {children}
  </Box>
);

export default DropdownTableCell;
