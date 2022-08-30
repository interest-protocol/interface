import { useContext } from 'react';

import i18nContext from '@/context/i18n';
import { II18nContext } from '@/context/i18n/i18n.types';

export const useI18n = (): II18nContext => useContext(i18nContext);
