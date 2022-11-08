import { useEffect, useState } from 'react';

import { useIsMounted } from '@/hooks';

export const useIsMountedTwice = (): boolean => {
  const [firstMount, setFirstMount] = useState(false);
  const [isMountedTwice, setIsMountedTwice] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted && !isMountedTwice) {
      if (firstMount) setIsMountedTwice(true);
      else setFirstMount(true);
    }
  }, [isMounted, firstMount]);

  return isMountedTwice;
};
