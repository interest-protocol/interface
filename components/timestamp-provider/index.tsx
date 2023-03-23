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
  updateInterval = 20000,
  children,
}) => {
  const now = useNow({ updateInterval });

  const currentTime = new Date().getTime();

  return (
    <TimestampProviderContext.Provider
      value={{
        timestamp: currentTime > now.getTime() ? currentTime : now.getTime(),
      }}
    >
      {children}
    </TimestampProviderContext.Provider>
  );
};

export default TimestampProvider;
