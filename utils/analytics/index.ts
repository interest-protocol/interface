import { event, exception, initialize, pageview, set } from 'react-ga';

export const initGA = (): void => {
  console.log('GA init');
  initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY ?? 'UA-4107603268-1');
};

export const logPageView = (): void => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  set({ page: window.location.pathname });
  pageview(window.location.pathname);
};

export const logEvent = (category = '', action = ''): void => {
  if (category && action) event({ category, action });
};

export const logException = (description = '', fatal = false): void => {
  if (description) exception({ description, fatal });
};
