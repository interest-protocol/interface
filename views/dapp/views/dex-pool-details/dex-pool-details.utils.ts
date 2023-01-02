export const processPairData = (data: { allowances: string | any[] }) => {
  const defaultERC20Metadata = {
    name: '???',
    symbol: '???',
    decimals: 18,
  };

  const defaultData = {
    token0Metadata: defaultERC20Metadata,
    token1Metadata: defaultERC20Metadata,
  };

  if (data.allowances.length === 0)
    return { ...defaultData, pairExists: false, loading: false };

  return null;
};
