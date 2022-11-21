import { useRouter } from 'next/router';

import { MaybeArray } from '@/interface';

export const useRouterQuery = (param: string): MaybeArray<string> => {
  const { query, asPath } = useRouter();

  return (
    query[param] || asPath.match(new RegExp(`[&?]${param}=(.*)(&|$)`)) || ''
  );
};
