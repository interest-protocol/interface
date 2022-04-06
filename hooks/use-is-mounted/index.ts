import { MutableRefObject, useEffect, useRef } from 'react';

export const useIsMounted = (): MutableRefObject<boolean> => {
  const ref = useRef(true);

  useEffect(() => {
    return () => {
      ref.current = false;
    };
  }, []);

  return ref;
};
