import { curryN } from 'ramda';
import { FC } from 'react';

import { NextPageWithAddress } from '@/interface';

import withParamsGuard from './with-params-guard';

type TWithAddressGuard = (Component: NextPageWithAddress) => FC;

const withAddressGuard: TWithAddressGuard = curryN(
  2,
  withParamsGuard
)(['address']);

export default withAddressGuard;
