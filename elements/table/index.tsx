import dynamic from 'next/dynamic';
import React, { FC, useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { animated, useSpring } from 'react-spring';
import { v4 } from 'uuid';

import { useIsMounted } from '@/hooks/use-is-mounted';
import { ArrowSVG } from '@/svg';

import Box from '../box';
import Button from '../button';
import Typography from '../typography';
import { ResponsiveTableProps, TableLoadingProps } from './table.types';

const Cell: FC<{ as: 'td' | 'th'; tip?: string }> = ({ as, tip, children }) => (
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

const TableLoading: FC<TableLoadingProps> = ({ columns }) => (
  <Box
    py="M"
    px="XL"
    role="row"
    key={v4()}
    display="grid"
    alignItems="center"
    gridTemplateColumns={`repeat(${columns}, 1fr)`}
  >
    {Array.from({ length: columns }).map(() => (
      <Cell as="td" key={v4()}>
        <Skeleton />
      </Cell>
    ))}
  </Box>
);

const Table: FC<ResponsiveTableProps> = ({
  data,
  loading,
  ordinate,
  headings,
  hasButton,
}) => {
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const Tooltip = dynamic(() => import('react-tooltip'));
  const isMounted = useIsMounted();
  const AnimatedBox = animated(Box);

  const [animate, setAnimate] = useState(false);

  const { dHeight, mHeight } = useSpring({
    from: {
      dHeight: '0px',
      mHeight: '0px',
    },
    to: {
      dHeight: `${
        animate ? desktopDropdownRef.current?.offsetHeight ?? 0 : 0
      }px`,
      mHeight: `${
        animate ? mobileDropdownRef.current?.offsetHeight ?? 0 : 0
      }px`,
    },
    config: {
      duration: 500,
    },
  });
  useEffect(() => {
    setAnimate(true);
  }, []);

  const toggleDropdown = (fn: () => void) => () => {
    setAnimate((a) => !a);
    setTimeout(fn, 500);
  };

  return (
    <>
      <Box
        my="L"
        width="100%"
        overflow="hidden"
        borderColor="textDescription"
        display={['none', 'none', 'none', 'block']}
      >
        <Box role="table" width="100%" overflowX="auto" overflowY="hidden">
          <Box
            my="M"
            py="M"
            px="XL"
            role="row"
            fontSize="S"
            display="grid"
            bg="foreground"
            borderRadius="L"
            alignItems="center"
            color="textSecondary"
            gridTemplateColumns={`1.5fr repeat(${
              headings.length + (ordinate ? 1 : 0) + (hasButton ? 1 : 0) - 1
            }, 1fr)`}
          >
            {ordinate && <Cell as="th">Nº</Cell>}
            {headings.map(({ item, tip }) => (
              <Cell as="th" key={v4()} tip={tip}>
                {item}
              </Cell>
            ))}
            {hasButton && <Cell as="th" />}
          </Box>
          <Box bg="foreground" borderRadius="L" my="M">
            {loading ? (
              <TableLoading
                columns={
                  headings.length + (ordinate ? 1 : 0) + (hasButton ? 1 : 0)
                }
              />
            ) : (
              data.map(({ items, button, dropdown }, index) => {
                const {
                  node: Dropdown,
                  isOpen: dropdownOpen,
                  onClose: closeDropdown,
                  onOpen: handleOpenDropdown,
                } = dropdown!;

                return (
                  <Box key={v4()}>
                    <Box
                      py="M"
                      px="XL"
                      role="row"
                      display="grid"
                      alignItems="center"
                      gridTemplateColumns={`1.5fr repeat(${
                        headings.length +
                        (ordinate ? 1 : 0) +
                        (hasButton ? 1 : 0) -
                        1
                      }, 1fr)`}
                    >
                      {ordinate && (
                        <Cell as="td" key={v4()}>
                          {index + 1}
                        </Cell>
                      )}
                      {items.map((item) => (
                        <Cell as="td" key={v4()}>
                          {item}
                        </Cell>
                      ))}
                      {(button || Dropdown) && (
                        <Cell as="td">
                          {Dropdown ? (
                            <Box textAlign="right">
                              <Button
                                py="L"
                                width="3.3rem"
                                variant="secondary"
                                onClick={toggleDropdown(
                                  dropdownOpen
                                    ? closeDropdown
                                    : handleOpenDropdown
                                )}
                                bg={
                                  dropdownOpen ? 'accent' : 'bottomBackground'
                                }
                                hover={{ bg: 'accentActive' }}
                              >
                                <Box
                                  transition="transform 250ms ease-in-out"
                                  transform={`rotate(${
                                    dropdownOpen ? '180deg' : '0deg'
                                  })`}
                                >
                                  <ArrowSVG width="0.5rem" />
                                </Box>
                              </Button>
                            </Box>
                          ) : (
                            button
                          )}
                        </Cell>
                      )}
                    </Box>
                    {dropdownOpen && (
                      <AnimatedBox
                        style={{ height: dHeight }}
                        overflow="hidden"
                      >
                        <Box ref={desktopDropdownRef}>{Dropdown}</Box>
                      </AnimatedBox>
                    )}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Box>
      <Box
        mx="M"
        my="XL"
        width="100%"
        bg="foreground"
        borderRadius="M"
        display={['block', 'block', 'block', 'none']}
      >
        {data.map(({ items, button, mobileSide, dropdown }, index) => {
          const {
            isOpen: dropdownOpen,
            node: Dropdown,
            onOpen: handleOpenDropdown,
            onClose: closeDropdown,
          } = dropdown!;

          return (
            <Box key={v4()}>
              <Box display="flex" p="L">
                <Box
                  my="L"
                  mx="M"
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="space-evenly"
                >
                  {mobileSide}
                  {(button || Dropdown) && Dropdown ? (
                    <Box textAlign="right" mt="L">
                      <Button
                        py="L"
                        width="3.3rem"
                        variant="secondary"
                        onClick={toggleDropdown(
                          dropdownOpen ? closeDropdown : handleOpenDropdown
                        )}
                        bg={dropdownOpen ? 'accent' : 'bottomBackground'}
                        hover={{ bg: 'accentActive' }}
                      >
                        <Box
                          transform={`rotate(${
                            dropdownOpen ? '180deg' : '0deg'
                          })`}
                        >
                          <ArrowSVG width="0.5rem" />
                        </Box>
                      </Button>
                    </Box>
                  ) : (
                    button
                  )}
                </Box>
                <Box
                  key={v4()}
                  display="grid"
                  borderRadius="M"
                  overflow="hidden"
                  gridAutoFlow="column"
                  gridTemplateRows={`repeat(${
                    headings.length + (ordinate ? 1 : 0)
                  }, 1fr)`}
                >
                  {ordinate && (
                    <Typography
                      py="M"
                      px="M"
                      fontSize="S"
                      variant="normal"
                      color="textSecondary"
                    >
                      Nº
                    </Typography>
                  )}
                  {headings.map(({ item }) => (
                    <Typography
                      py="M"
                      px="M"
                      key={v4()}
                      fontSize="S"
                      variant="normal"
                      color="textSecondary"
                    >
                      {item}
                    </Typography>
                  ))}
                  {ordinate && (
                    <Box
                      py="M"
                      px="M"
                      borderBottom="0.1rem solid"
                      borderColor="textDescriptionHigh"
                    >
                      {index + 1}
                    </Box>
                  )}
                  {items.map((item) => (
                    <Box key={v4()} display="flex">
                      <Box py="M" px="M">
                        {item}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              {dropdownOpen && (
                <AnimatedBox style={{ height: mHeight }} overflow="hidden">
                  <Box ref={mobileDropdownRef}>{Dropdown}</Box>
                </AnimatedBox>
              )}
            </Box>
          );
        })}
      </Box>
      {isMounted.current && (
        <Tooltip place="top" type="dark" effect="solid" multiline />
      )}
    </>
  );
};

export default Table;
