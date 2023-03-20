import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Web3Manager } from '@/components';
import { NextPageWithProps } from '@/interface';
import Farms from '@/views/dapp/views/farms';
import {
  FarmSortByFilter,
  FarmTypeFilter,
  IFarmsForm,
} from '@/views/dapp/views/farms/farms.types';

const FarmsPage: NextPageWithProps = ({ pageTitle }) => {
  const { pathname } = useRouter();

  const [isDesktop, setDesktop] = useState(false);

  const formFarm = useForm<IFarmsForm>({
    defaultValues: {
      search: '',
      sortBy: FarmSortByFilter.Default,
      typeFilter: FarmTypeFilter.All,
      onlyFinished: false,
      onlyStaked: false,
    },
  });

  return (
    <Web3Manager pageTitle={pageTitle} pathname={pathname}>
      <Farms desktopState={{ isDesktop, setDesktop }} formFarm={formFarm} />
    </Web3Manager>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [commonMessages, farmsMessages] = await Promise.all([
    import(`../../../assets/messages/common/${locale}.json`),
    import(`../../../assets/messages/farms/${locale}.json`),
  ]);

  const messages = mergeDeepRight(
    commonMessages.default,
    farmsMessages.default
  );

  return {
    props: {
      messages,
      now: Date.now(),
      pageTitle: 'farms.pageTitle',
    },
  };
};

export default FarmsPage;
