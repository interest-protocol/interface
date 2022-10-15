import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useAccount } from 'wagmi';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import ConnectWallet from '@/views/dapp/components/wallet/connect-wallet';

import { FarmCardProps } from './farm-card.types';

const FarmCard: FC<FarmCardProps> = ({
  title,
  amount,
  shadow,
  button,
  loading,
  amountUSD,
}) => {
  const { address } = useAccount();

  return (
    <Box
      p="L"
      display="flex"
      bg="background"
      borderRadius="L"
      alignItems="center"
      my={['S', 'S', 'S', 'NONE']}
      justifyContent="space-between"
      flexDirection={['row', 'row', 'row', 'column']}
      {...(shadow && {
        boxShadow: 'inset 0px -90px 45px -60px rgba(0, 203, 57, 0.3)',
      })}
    >
      <Box>
        <Typography
          variant="title4"
          fontWeight="400"
          mb={['L', 'L', 'L', 'XXL']}
          textAlign={['left', 'left', 'left', 'center']}
          maxWidth={['10rem', '10rem', '10rem', '14rem']}
          textTransform="capitalize"
        >
          {loading ? <Skeleton height="1.2rem" width="100%" /> : title}
        </Typography>
        <Box
          mb={['L', 'L', 'L', 'XL']}
          textAlign={['left', 'left', 'left', 'center']}
        >
          <Typography variant="normal" width="100%">
            {loading ? <Skeleton width="100%" /> : amount}
          </Typography>
          <Typography variant="normal" width="100%">
            {loading ? <Skeleton width="100%" /> : amountUSD}
          </Typography>
        </Box>
      </Box>
      <Box
        textAlign="center"
        display="inline-block"
        ml={['M', 'M', 'M', 'NONE']}
      >
        {loading ? (
          <Skeleton height="2.5rem" width="8rem" />
        ) : address ? (
          button
        ) : (
          <ConnectWallet />
        )}
      </Box>
    </Box>
  );
};
export default FarmCard;
