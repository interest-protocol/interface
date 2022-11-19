import ReactGA from 'react-ga4';

import { GAAction, GACategory } from '@/constants/google-analytics';

export const initGA = (): void => {
  ReactGA.initialize(
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? 'G-3M99P49E9B'
  );
};

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (category = '', action = '', label: string): void => {
  if (category && action) ReactGA.event({ category, action, label });
};

export const logException = (
  category = '',
  action = '',
  label = '',
  trackerName: string[]
): void => {
  if (category && action)
    ReactGA.event({ category, action, label }, trackerName);
};
