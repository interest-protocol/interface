import { FC } from 'react';

import Box from '@/elements/box';
import Typography from '@/elements/typography';

import { EarnCardProps } from './earn-table.types';

const EarnCard: FC<EarnCardProps> = ({
  title,
  amount,
  shadow,
  button,
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
        variant="title4"
        fontWeight="400"
        mb={['L', 'L', 'L', 'XXL']}
        textAlign={['left', 'left', 'left', 'center']}
      >
        {title}
      </Typography>
      <Box
        mb={['L', 'L', 'L', 'XL']}
        textAlign={['left', 'left', 'left', 'center']}
      >
        <Typography variant="normal">{amount}</Typography>
        <Typography variant="normal">{amountUSD}</Typography>
      </Box>
    </Box>
    <Box textAlign="center" display="inline-block" ml={['M', 'M', 'M', 'NONE']}>
      {button}
    </Box>
  </Box>
);

export default EarnCard;
