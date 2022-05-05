import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import Box from '@/elements/box';
import Typography from '@/elements/typography';

import { EarnCardProps } from './earn-table.types';

const EarnCard: FC<EarnCardProps> = ({
  title,
  amount,
  shadow,
  button,
  loading,
  amountUSD,
}) => (
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
        width={['10rem', '10rem', '10rem', '14rem']}
        variant="title4"
        fontWeight="400"
        mb={['L', 'L', 'L', 'XXL']}
        textAlign={['left', 'left', 'left', 'center']}
      >
        {loading ? <Skeleton height="1.2rem" width="100%" /> : title}
      </Typography>
      <Box
        mb={['L', 'L', 'L', 'XL']}
        textAlign={['left', 'left', 'left', 'center']}
      >
        <Typography variant="normal" width="100%">
          {loading ? <Skeleton height="1rem" width="100%" /> : amount}
        </Typography>
        <Typography variant="normal" width="100%">
          {loading ? <Skeleton height="1rem" width="100%" /> : amountUSD}
        </Typography>
      </Box>
    </Box>
    <Box textAlign="center" display="inline-block" ml={['M', 'M', 'M', 'NONE']}>
      {loading ? <Skeleton height="2.5rem" width="8rem" /> : button}
    </Box>
  </Box>
);

export default EarnCard;
