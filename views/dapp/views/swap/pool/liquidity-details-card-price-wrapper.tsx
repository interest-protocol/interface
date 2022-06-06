import { FC, ReactNode } from 'react';

import { Box } from '@/elements';

const LiquidityDetailsCardPriceWrapper: FC<{
  size: string;
  children: ReactNode;
}> = ({ size, children }) => {
  return (
    <Box
      width={size}
      mt="L"
      bg="bottomBackground"
      px="M"
      py="L"
      textAlign="center"
      borderRadius="M"
    >
      {children}
    </Box>
  );
};

export default LiquidityDetailsCardPriceWrapper;
