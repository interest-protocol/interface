import { pathOr } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import Box from '../box';
import { DropdownTableProps } from './dropdown-table.types';
import DropdownTableCell from './dropdown-table-cell';
import DropdownTableRow from './dropdown-table-row';

const EmptyDropdown: FC = () => null;

const defaultDropdown = { Component: EmptyDropdown, args: undefined };

const DropdownTable: FC<DropdownTableProps> = ({
  data,
  headings,
  ordinate,
  isDesktop,
  backgroundColorMap,
}) =>
  isDesktop ? (
    <Box display={['none', 'none', 'none', 'block']} width="100%">
      <Box
        my="M"
        py="M"
        px="XL"
        width="100%"
        fontSize="S"
        display="grid"
        bg="foreground"
        borderRadius="L"
        alignItems="center"
        color="textSecondary"
        gridTemplateColumns={`1.5fr repeat(${
          headings.length + (ordinate ? 1 : 0)
        }, 1fr)`}
      >
        {ordinate && <DropdownTableCell as="th">Nº</DropdownTableCell>}
        {headings.map(({ item, tip }) => (
          <DropdownTableCell as="th" key={v4()} tip={tip}>
            {item}
          </DropdownTableCell>
        ))}
      </Box>
      <Box bg="foreground" borderRadius="L" my="M" overflow="hidden">
        {data.map(({ dropdown, items }, index) => (
          <DropdownTableRow
            key={v4()}
            isDesktop
            items={items}
            headings={headings}
            dropdown={dropdown ?? defaultDropdown}
            desktopBg={
              backgroundColorMap
                ? pathOr(
                    undefined,
                    [index.toString(), 'desktopBg'],
                    backgroundColorMap
                  )
                : undefined
            }
          />
        ))}
      </Box>
    </Box>
  ) : (
    <Box
      mx="M"
      my="XL"
      width="100%"
      borderRadius="M"
      overflow="hidden"
      display={['block', 'block', 'block', 'none']}
    >
      {data.map(({ dropdown, items, sideContent }, index) => (
        <DropdownTableRow
          key={v4()}
          items={items}
          index={index}
          headings={headings}
          ordinate={ordinate}
          sideContent={sideContent}
          dropdown={dropdown ?? defaultDropdown}
          desktopBg={
            backgroundColorMap
              ? pathOr(undefined, [index.toString(), 'bg'], backgroundColorMap)
              : undefined
          }
        />
      ))}
    </Box>
  );

export default DropdownTable;
