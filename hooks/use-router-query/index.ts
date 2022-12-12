import { useRouter } from 'next/router';

import { MaybeArray } from '@/interface';

type TUseRouteQuery = (param: string) => {
  value: MaybeArray<string>;
  isReady: boolean;
};

export const useRouterQuery: TUseRouteQuery = (param) => {
  const { query, asPath, isReady } = useRouter();

  const queryParams = new URLSearchParams(asPath);

  return {
    value: query[param] || queryParams.get(param) || '',
    isReady,
  };
};
