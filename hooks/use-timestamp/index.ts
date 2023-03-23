import { useContext } from 'react';

import { TimestampProviderContext } from '@/components/timestamp-provider';

export const useTimestamp = () => useContext(TimestampProviderContext);
