import { useRouter } from 'next/router';

import { MaybeArray } from '@/interface';

export const useRouterQuery = (param: string): MaybeArray<string> => {
  const { query, asPath } = useRouter();

  const queryParams = new URLSearchParams(asPath);

  return query[param] || queryParams.get(param) || '';
};
