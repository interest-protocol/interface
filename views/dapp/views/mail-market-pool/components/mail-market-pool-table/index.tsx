import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Table, Typography } from '@/elements';
import { USDCoinSVG } from '@/svg';
import { formatDollars, formatMoney } from '@/utils';

import {
  MAIL_MARKET_POOL_DATA,
  MAIL_MARKET_POOL_HEADINGS,
  MY_MAIL_MARKET_POOL_HEADINGS,
} from '../../mail-market-pool.data';
import MAILMarketPoolModal from './mail-market-pool-modal';
import { MAILMarketPoolTableProps } from './mail-market-pool-table.types';

const MAILMarketTable: FC<MAILMarketPoolTableProps> = ({
  type,
  favorite,
  loading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalAddress, setModalAddress] = useState('');

  const toggleModal = () => setShowModal(!showModal);

  const changeModalAddress = (address: string) => setModalAddress(address);

  const data = favorite
    ? type === 'borrow'
      ? [
          {
            apr: 75,
            symbol: 'INT',
            Icon: USDCoinSVG,
            name: 'Interest Protocol',
            address: '0x4d224452801aced8b2f0aebe155379bb5d594381',
          },
        ]
      : []
    : MAIL_MARKET_POOL_DATA[type];

  return (
    <>
      <Box mt="XL">
        <Typography pt="L" variant="normal" textTransform="capitalize">
          {favorite && 'My '}
          {type} Market
        </Typography>
        <Table
          headings={
            (favorite
              ? MY_MAIL_MARKET_POOL_HEADINGS
              : MAIL_MARKET_POOL_HEADINGS)[type]
          }
          data={data.map(({ Icon, address, symbol, apr }) => ({
            handleClick: () => {
              toggleModal();
              changeModalAddress(address);
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
              ...(favorite
                ? [
                    <Box key={v4()}>
                      <Typography variant="normal">
                        {formatMoney(653178)}
                      </Typography>
                      <Typography
                        mt="S"
                        fontSize="S"
                        color="success"
                        fontWeight="500"
                        variant="normal"
                      >
                        {formatDollars(872)}
                      </Typography>
                    </Box>,
                  ]
                : []),
              ...(type === 'borrow'
                ? [favorite ? '15%' : formatMoney(45543).split('.')[0]]
                : []),
            ],
          }))}
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
