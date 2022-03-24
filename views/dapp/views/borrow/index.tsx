import Progress from 'components/svg/progress';
import { ISwitchOption } from 'components/switch/switch.types';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

import { Container, Switch } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Typography } from '@/elements';
import { useGetUserCurrency } from '@/hooks/use-get-user-currency';
import { BinanceSVG, DineroSVG, InfoSVG } from '@/svg';
import { formatMoney } from '@/utils';

import GoBack from '../../components/go-back';
import Layout from '../../layout';
import { borrowFees, myOpenPosition } from './borrow.data';
import { BorrowProps, IBorrowForm } from './borrow.types';
import BorrowForm from './components/borrow-form';

const Borrow: FC<BorrowProps> = ({ currency, mode }) => {
  const { push } = useRouter();
  const { amount } = useGetUserCurrency();
  const form = useForm<IBorrowForm>({
    defaultValues: {
      borrow: {
        collateral: 0,
        loan: null,
      },
      repay: {
        collateral: 0,
        loan: null,
      },
    },
    mode: 'onBlur',
  });

  const switchTo = (targetMode: 'borrow' | 'repay') => () =>
    push(
      `${Routes[RoutesEnum.Borrow]}?mode=${targetMode}&currency=${currency}`,
      undefined,
      {
        shallow: true,
      }
    );

  const options: [ISwitchOption, ISwitchOption] = useMemo(
    () => [
      {
        value: 'borrow',
        onSelect: switchTo('borrow'),
      },
      {
        value: 'repay',
        onSelect: switchTo('repay'),
      },
    ],
    [currency, mode]
  );

  const onSubmitBorrow = (data: IBorrowForm) => {
    console.log(data);
  };
  const onSubmitRepay = (data: IBorrowForm) => {
    console.log(data);
  };

  return (
    <Layout>
      <Container
        dapp
        my="XL"
        display="flex"
        position="relative"
        flexDirection="column"
      >
        <Box
          textAlign={['center', 'center', 'center', 'left']}
          left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
          position={['static', 'static', 'absolute', 'static', 'absolute']}
        >
          <GoBack />
        </Box>
        <Box>
          <Box bg="foreground" textAlign="center" p="L" borderRadius="L">
            <Switch defaultValue={mode} options={options} />
          </Box>
          <Box
            my="L"
            rowGap="0.7rem"
            columnGap="0.7rem"
            display={['flex', 'flex', 'flex', 'grid']}
            alignItems={['stretch', 'stretch', 'stretch', 'start']}
            flexDirection={['column', 'column', 'column', 'unset']}
            gridTemplateAreas="'a b''a b''a c''a d''a d''a d''e d''e d''e d''f d'"
          >
            {mode === 'borrow' && (
              <BorrowForm
                isBorrow
                buttonText="Add collateral and Borrow"
                fields={[
                  {
                    currency,
                    CurrencySVG: BinanceSVG,
                    name: 'borrow.collateral',
                    label: 'Deposit Collateral:',
                    max: +amount.toSignificant(4),
                    amount: amount.toSignificant(4),
                    amountUSD: +amount.toSignificant(4),
                  },
                  {
                    currency: 'DNR',
                    name: 'borrow.loan',
                    CurrencySVG: DineroSVG,
                    label: 'Borrow Dinero:',
                    amount: amount.toSignificant(4),
                    amountUSD: +amount.toSignificant(4),
                  },
                ]}
                onSubmit={onSubmitBorrow}
                {...form}
              />
            )}
            {mode === 'repay' && (
              <BorrowForm
                buttonText="Remove collateral and Repay loan"
                fields={[
                  {
                    currency,
                    CurrencySVG: BinanceSVG,
                    name: 'borrow.collateral',
                    label: 'Deposit Collateral',
                    max: +amount.toSignificant(4),
                    amount: amount.toSignificant(4),
                    amountUSD: +amount.toSignificant(4),
                  },
                  {
                    currency: 'DNR',
                    name: 'borrow.loan',
                    CurrencySVG: DineroSVG,
                    label: 'Borrow Dinero',
                    amount: amount.toSignificant(4),
                    amountUSD: +amount.toSignificant(4),
                  },
                ]}
                onSubmit={onSubmitRepay}
                {...form}
              />
            )}
            <Box
              py="XL"
              px="XXL"
              order={1}
              bg="foreground"
              borderRadius="L"
              gridArea="b"
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="normal" display="flex" alignItems="center">
                  <Box as="span" display="inline-block" mr="M">
                    <InfoSVG width="1rem" />
                  </Box>
                  LTV
                </Typography>
                <Typography variant="normal" color="textSecondary">
                  {25}% of 100%
                </Typography>
              </Box>
              <Box color="accent" mt="L">
                <Progress progress={0.25} />
              </Box>
            </Box>
            <Box
              py="XL"
              px="XXL"
              order={4}
              gridArea="c"
              bg="foreground"
              borderRadius="L"
            >
              {borrowFees.map(({ name, fee, tip }) => (
                <Box
                  my="L"
                  key={v4()}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="normal"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      mr="M"
                      as="span"
                      cursor="help"
                      data-tip={tip}
                      display="inline-block"
                    >
                      <InfoSVG width="1rem" />
                    </Box>
                    {name}
                  </Typography>
                  <Typography variant="normal" color="textSecondary">
                    {fee}%
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              py="XL"
              px="XXL"
              order={5}
              gridArea="d"
              bg="foreground"
              borderRadius="L"
            >
              <Typography variant="normal" textTransform="uppercase" mt="L">
                My open position:
              </Typography>
              {myOpenPosition.map(({ name, value, tip }) => (
                <Box
                  my="L"
                  key={v4()}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="normal"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      mr="M"
                      as="span"
                      cursor="help"
                      data-tip={tip}
                      display="inline-block"
                    >
                      <InfoSVG width="1rem" />
                    </Box>
                    {name}
                  </Typography>
                  <Typography variant="normal" color="textSecondary">
                    {value}
                  </Typography>
                </Box>
              ))}
              <Box mt="XL">
                <Typography variant="normal" textAlign="center" mb="M">
                  1DNR = 1USD
                </Typography>
                <Typography variant="normal" textAlign="center" mb="M">
                  1BNB = 3234USD
                </Typography>
              </Box>
            </Box>
            <Box
              py="XL"
              px="XXL"
              order={3}
              gridArea="e"
              bg="foreground"
              borderRadius="L"
            >
              <Typography variant="normal" textTransform="uppercase" mt="L">
                Your balance:
              </Typography>
              <Box display="flex" justifyContent="space-between" my="L">
                <Box display="flex">
                  <BinanceSVG width="1rem" />
                  <Typography ml="M" variant="normal">
                    Binance Coin
                  </Typography>
                </Box>
                <Typography variant="normal" color="textSecondary">
                  {formatMoney(+amount.toSignificant(4))}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" my="L">
                <Box display="flex">
                  <DineroSVG width="1rem" />
                  <Typography ml="M" variant="normal">
                    Dinero
                  </Typography>
                </Box>
                <Typography variant="normal" color="textSecondary">
                  {formatMoney(0)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Borrow;
