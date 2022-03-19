export const shortAccount = (account: string): string =>
  `${account.slice(0, 6)}...${account.slice(-5, -1)}`;
