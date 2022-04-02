export const shortAccount = (account: string): string =>
  `${account.slice(0, 6)}...${account.slice(-5, -1)}`;

export const formatDollars = (value: number): string => {
  const valueInDollars = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

  const decimals = valueInDollars.split(',');

  return decimals.length > 3
    ? `${decimals.slice(0, decimals.length - 3).join(',')}B`
    : decimals.length === 3
    ? `${decimals[0]}M`
    : decimals.join(',');
};

export const formatMoney = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
    .format(value)
    .slice(1);

export const parseToStringNumber = (x: string): string => {
  if (isNaN(+x)) return '0';
  if (0 > +x) return '0';
  return x;
};
