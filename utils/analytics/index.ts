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

export const logEvent = (category = '', action = '', label: string): void => {
  if (category && action) ReactGA.event({ category, action, label });
};

interface ParamsException {
  category: string;
  action: string;
  label: string;
  trackerName: string[];
}
export const logException = ({
  category = 'Error',
  action,
  label,
  trackerName,
}: ParamsException): void => {
  if (category && action)
    ReactGA.event({ category, action, label }, trackerName);
};
