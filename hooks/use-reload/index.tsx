import { useState } from 'react';

import { IEmptyObject } from '@/interface';

import { UseReload } from './use-reload.types';

const useReload: UseReload = () => {
  const [reload, setReload] = useState<IEmptyObject>({});

  const reloader = () => setReload({});

  return {
    reload,
    reloader,
  };
};

export default useReload;
