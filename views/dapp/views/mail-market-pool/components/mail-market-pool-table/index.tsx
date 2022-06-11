import { useRouter } from 'next/router';
import { find, prepend, propEq, take } from 'ramda';
import { FC, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Modal, Table, Typography } from '@/elements';
import { IntMath } from '@/sdk';
import { UnknownCoinSVG } from '@/svg';
import {
  formatDollars,
  formatMoney,
  principalToElastic,
  toFixedToPrecision,
} from '@/utils';

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
  refreshData,
  showOnDesktop,
  totalBorrowsInUSDRecord,
}) => {
  const {
    push,
    pathname,
    query: { modal, pool, token },
  } = useRouter();

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

  const modalData = useMemo(
    () =>
      organizedData
        ? find(propEq('tokenAddress', token), organizedData) ?? null
        : null,
    [organizedData, token]
  );

  const closeModal = () =>
    push(
      {
        pathname,
      },
      {
        pathname: pathname.replace('[pool]', pool as string),
      },
      {
        shallow: true,
      }
    );

  const openModal = (token: string) =>
    push(
      {
        pathname,
        query: {
          modal: type,
          token: token,
        },
      },
      {
        pathname: pathname.replace('[pool]', pool as string),
        query: {
          modal: type,
          token: token,
        },
      }
    );

  const activeMobileDisplay = !active || markets.length ? 'block' : 'none';

  const activeDesktopDisplay =
    !active || showOnDesktop || markets.length ? 'block' : 'none';

  return (
    <>
      <Box
        mt="XL"
        display={[
          activeMobileDisplay,
          activeMobileDisplay,
          activeMobileDisplay,
          activeDesktopDisplay,
        ]}
      >
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
          data={organizedData.map((marketData) => {
            const {
              tokenAddress,
              symbol,
              borrowRate,
              supplyRate,
              borrow,
              supply,
              usdPrice,
              totalElastic,
              totalBase,
              cash,
              ltv,
            } = marketData;

            const Icon = TOKENS_SVG_MAP[symbol]
              ? TOKENS_SVG_MAP[symbol]
              : UnknownCoinSVG;

            const isBorrow = type === 'borrow';

            const apr =
              IntMath.toNumber(isBorrow ? borrowRate : supplyRate) * 100;

            const borrowElastic = principalToElastic(
              totalElastic,
              totalBase,
              borrow
            );

            const balance = IntMath.toNumber(isBorrow ? borrowElastic : supply);

            const balanceInUSD = IntMath.from(isBorrow ? borrowElastic : supply)
              .mul(usdPrice)
              .toNumber();

            return {
              handleClick: () => openModal(tokenAddress),
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
                  `${isBorrow ? '-' : ''}${toFixedToPrecision(apr)}%`
                ),
                ...(active
                  ? [
                      ...(!isBorrow
                        ? [`${toFixedToPrecision(IntMath.toNumber(ltv, 16))}%`]
                        : []),
                      <Box key={v4()}>
                        <Typography variant="normal">
                          {`${isBorrow ? '-' : ''}${formatMoney(balance)}`}
                        </Typography>
                        <Typography
                          mt="S"
                          fontSize="S"
                          color="success"
                          fontWeight="500"
                          variant="normal"
                        >
                          {`${isBorrow ? '-' : ''}${formatDollars(
                            balanceInUSD
                          )}`}
                        </Typography>
                      </Box>,
                      ...(isBorrow
                        ? [formatMoney(IntMath.toNumber(cash))]
                        : []),
                    ]
                  : isBorrow
                  ? [formatMoney(IntMath.toNumber(cash))]
                  : [`${toFixedToPrecision(IntMath.toNumber(ltv, 16))}%`]),
              ],
            };
          })}
        />
      </Box>
      <Modal
        modalProps={{
          shouldCloseOnEsc: true,
          onRequestClose: closeModal,
          shouldCloseOnOverlayClick: true,
          isOpen:
            !!modal &&
            (modal as string) === type &&
            modalData?.tokenAddress === token,
        }}
        background="#0008"
      >
        <MAILMarketPoolModal
          type={type}
          data={modalData}
          handleClose={closeModal}
          refreshData={refreshData}
          pool={pool as string}
          totalBorrowsInUSDRecord={totalBorrowsInUSDRecord}
        />
      </Modal>
    </>
  );
};

export default MAILMarketTable;
