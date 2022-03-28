import { MutableRefObject, useEffect, useRef } from 'react';

export const useIsMounted = (): MutableRefObject<boolean> => {
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return ref;
};
