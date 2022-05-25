import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Switch } from '@/components';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Modal, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { InterestTokenSVG, LoadingSVG, TimesSVG } from '@/svg';
import { formatDollars, formatMoney } from '@/utils';

import InputBalance from './input-balance';
import { getSwitchDefaultData } from './mail-market-pool-modal.data';
import {
  IMAILMarketPoolForm,
  MAILMarketPoolModalProps,
} from './mail-market-pool-modal.types';

const data = [
  {
    currency: {
      symbol: 'INT',
    },
    value: Math.random() * 10000,
  },
];

const MAILMarketPoolModal: FC<MAILMarketPoolModalProps> = ({
  type,
  isOpen,
  handleClose,
}) => {
  const [base, setBase] = useState(false);
  const [loading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    dataLoading &&
      setTimeout(() => {
        setDataLoading(!dataLoading);
      }, 3000);
  }, []);
  const SWITCH_DEFAULT_DATA = getSwitchDefaultData(setBase);

  const { register, getValues, setValue } = useForm<IMAILMarketPoolForm>({
    defaultValues: {
      currency: TOKEN_SYMBOL.BTC,
      value: 0,
    },
  });
  return (
    <Modal
      modalProps={{
        isOpen,
        shouldCloseOnEsc: true,
        onRequestClose: handleClose,
        shouldCloseOnOverlayClick: true,
      }}
      background="#0008"
    >
      <Box
        py="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="22rem"
        maxWidth="26rem"
        borderRadius="M"
        px={['L', 'XL']}
      >
        <Box display="flex" justifyContent="flex-end">
          <Box
            mt="-4.5rem"
            mr="-1em"
            display="flex"
            textAlign="right"
            position="absolute"
            justifyContent="flex-end"
          >
            <Button
              px="L"
              variant="primary"
              onClick={handleClose}
              hover={{
                bg: 'accentActive',
              }}
            >
              <TimesSVG width="1rem" height="1rem" />
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="title3"
            fontWeight="normal"
            textTransform="uppercase"
          >
            {type}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" my="L">
          <Switch
            defaultValue={base ? type : SWITCH_DEFAULT_DATA[type][1].value}
            options={SWITCH_DEFAULT_DATA[type]}
          />
        </Box>
        <Box my="XL" bg="background" p="L" borderRadius="M">
          <Typography variant="normal" textTransform="capitalize">
            {(base && type === 'borrow') || (!base && type === 'supply')
              ? `current ${type}ing`
              : 'your balance'}
            :
          </Typography>
          {data.map((x) => {
            const SVG = TOKENS_SVG_MAP[x.currency.symbol];

            return (
              <Box
                mt="L"
                key={v4()}
                display="flex"
                justifyContent="space-between"
              >
                <Box display="flex">
                  {SVG ? (
                    <SVG width="1rem" height="1rem" />
                  ) : (
                    <InterestTokenSVG width="1rem" />
                  )}
                  <Typography ml="M" variant="normal">
                    {formatMoney(x.value)}
                  </Typography>
                </Box>
                <Typography variant="normal" color="textSecondary">
                  {x.currency.symbol}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Box my="XL">
          <InputBalance
            name="value"
            register={register}
            label="Type quantity"
            setValue={setValue}
            getValues={getValues}
          />
        </Box>
        <Typography variant="normal" textTransform="capitalize">
          {type} Rates
        </Typography>
        <Box my="L" bg="background" p="L" borderRadius="M">
          <Box
            py="M"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              fontSize="S"
              variant="normal"
              color="textSecondary"
              textTransform="uppercase"
            >
              {type === 'borrow' ? 'Borrow Risk' : 'Supply APR'}
            </Typography>
            <Typography variant="normal">
              {dataLoading ? (
                <Skeleton width="3rem" />
              ) : type === 'borrow' ? (
                <>0% &rarr; 0%</>
              ) : (
                '3.09%'
              )}
            </Typography>
          </Box>
        </Box>
        <Typography variant="normal">Borrow Limit</Typography>
        <Box mt="L" mb="XL" bg="background" p="L" borderRadius="M">
          <Box
            py="M"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              fontSize="S"
              variant="normal"
              color="textSecondary"
              textTransform="uppercase"
            >
              {type === 'borrow' ? 'Borrow Risk' : 'limit'}
            </Typography>
            <Typography variant="normal">
              {type === 'borrow' ? (
                <>0% &rarr; 0%</>
              ) : (
                <>
                  {formatDollars(0)} &rarr; {formatDollars(0)}
                </>
              )}
            </Typography>
          </Box>
          <Box
            py="M"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              fontSize="S"
              variant="normal"
              color="textSecondary"
              textTransform="uppercase"
            >
              Limit used
            </Typography>
            <Typography variant="normal">0% &rarr; 0%</Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Button
            width="100%"
            variant="primary"
            disabled={loading}
            hover={{ bg: 'accentAlternativeActive' }}
            bg={loading ? 'accentAlternativeActive' : 'accentAlternative'}
          >
            {loading ? (
              <Box as="span" display="flex" justifyContent="center">
                <LoadingSVG width="1rem" height="1rem" />
                <Typography as="span" variant="normal" ml="M" fontSize="S">
                  {type === 'borrow' ? 'Borrowing...' : 'Supplying...'}
                </Typography>
              </Box>
            ) : type === 'borrow' ? (
              'Borrow'
            ) : (
              'Supply'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MAILMarketPoolModal;
