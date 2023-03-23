import { createContext, FC } from 'react';
import { useNow } from 'use-intl';

import {
  TimestampProviderProps,
  TimestampProviderState,
} from './timestamp-provider.types';

const CONTEXT_DEFAULT_STATE = {
  timestamp: 0,
};

export const TimestampProviderContext = createContext<TimestampProviderState>(
  CONTEXT_DEFAULT_STATE
);

const TimestampProvider: FC<TimestampProviderProps> = ({
  updateInterval = 15000,
  children,
}) => {
  const now = useNow({ updateInterval });

  return (
    <TimestampProviderContext.Provider value={{ timestamp: now.getTime() }}>
      {children}
    </TimestampProviderContext.Provider>
  );
};

export default TimestampProvider;
