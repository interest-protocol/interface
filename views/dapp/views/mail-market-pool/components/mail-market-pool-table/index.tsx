import { prepend, take } from 'ramda';
import { FC, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Table, Typography } from '@/elements';
import { IntMath } from '@/sdk';
import { UnknownCoinSVG } from '@/svg';
import { formatDollars, formatMoney } from '@/utils';

import {
  ACTIVE_MARKET_POOL_HEADINGS,
  MAIL_MARKET_POOL_HEADINGS,
} from '../../mail-market-pool.data';
import MAILMarketPoolModal from './mail-market-pool-modal';
import { MAILMarketPoolTableProps } from './mail-market-pool-table.types';

const MAILMarketTable: FC<MAILMarketPoolTableProps> = ({
  type,
  active,
  loading,
  markets,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalAddress, setModalAddress] = useState('');

  const toggleModal = () => setShowModal(!showModal);

  const organizedData = useMemo(
    () =>
      markets.length
        ? prepend(
            markets[markets.length - 1],
            take(markets.length - 1, markets)
          )
        : [],
    [markets]
  );

  return (
    <>
      <Box mt="XL">
        <Typography pt="L" variant="normal" textTransform="capitalize">
          {active && 'Active '}
          {type} Market
        </Typography>
        <Table
          headings={
            (active ? ACTIVE_MARKET_POOL_HEADINGS : MAIL_MARKET_POOL_HEADINGS)[
              type
            ]
          }
          data={organizedData.map(
            ({
              tokenAddress,
              symbol,
              borrowRate,
              supplyRate,
              borrow,
              supply,
              usdPrice,
            }) => {
              const Icon = TOKENS_SVG_MAP[symbol]
                ? TOKENS_SVG_MAP[symbol]
                : UnknownCoinSVG;

              const apr =
                IntMath.toNumber(type === 'borrow' ? borrowRate : supplyRate) *
                100;

              const balance = IntMath.toNumber(
                type === 'borrow' ? borrow : supply
              );

              const balanceInUSD = IntMath.from(
                type === 'borrow' ? borrow : supply
              )
                .mul(usdPrice)
                .toNumber();

              return {
                handleClick: () => {
                  toggleModal();
                  setModalAddress(tokenAddress);
                },
                items: [
                  <Box key={v4()} display="flex" alignItems="center">
                    <Box as="span" mr="M" display="inline-block" width="1.5rem">
                      <Icon width="100%" />
                    </Box>
                    <Typography variant="normal" fontWeight="500">
                      {symbol}
                    </Typography>
                  </Box>,
                  loading ? (
                    <Skeleton width="3rem" />
                  ) : (
                    `${type == 'borrow' ? '-' : ''} ${apr}%`
                  ),
                  ...(active
                    ? [
                        <Box key={v4()}>
                          <Typography variant="normal">
                            {formatMoney(balance)}
                          </Typography>
                          <Typography
                            mt="S"
                            fontSize="S"
                            color="success"
                            fontWeight="500"
                            variant="normal"
                          >
                            {formatDollars(balanceInUSD)}
                          </Typography>
                        </Box>,
                      ]
                    : []),
                  ...(type == 'borrow' && !active ? [0] : []),
                ],
              };
            }
          )}
        />
      </Box>
      <MAILMarketPoolModal
        type={type}
        isOpen={showModal}
        address={modalAddress}
        handleClose={toggleModal}
      />
    </>
  );
};

export default MAILMarketTable;
