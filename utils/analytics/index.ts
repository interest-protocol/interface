import ReactGA from 'react-ga4';

export const initGA = (): void => {
  ReactGA.initialize(
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? 'G-3M99P49E9B'
  );
};

export const logPageView = (): void => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logModalView = (modalName = ''): void => {
  if (modalName) console.log(modalName);
};

export const logEvent = (category = '', action = '', label: string): void => {
  if (category && action) ReactGA.event({ category, action, label });
};

export const logException = (
  description = '',
  trackerName: string[],
  fatal = false
): void => {
  if (description) console.log({ description, fatal }, trackerName);
};
