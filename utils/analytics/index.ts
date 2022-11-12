import {
  event,
  exception,
  initialize,
  modalview,
  pageview,
  set,
} from 'react-ga';

export const initGA = (): void => {
  initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY ?? 'UA-4107603268-1');
};

export const logPageView = (): void => {
  set({ page: window.location.pathname });
  pageview(window.location.pathname);
};

export const logModalView = (modalName = ''): void => {
  if (modalName) modalview(modalName);
};

export const logEvent = (category = '', action = '', label: string): void => {
  if (category && action) event({ category, action, label });
};

export const logException = (
  description = '',
  trackerName: string[],
  fatal = false
): void => {
  if (description) exception({ description, fatal }, trackerName);
};
