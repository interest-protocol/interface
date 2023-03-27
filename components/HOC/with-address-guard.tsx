import { curryN } from 'ramda';
import { FC } from 'react';

import { NextPagePropsWithAddress } from '@/interface';

import withParamsGuard from './with-params-guard';

type TWithAddressGuard = (Component: NextPagePropsWithAddress) => FC;

const withAddressGuard: TWithAddressGuard = curryN(
  2,
  withParamsGuard
)(['address']);

export default withAddressGuard;
