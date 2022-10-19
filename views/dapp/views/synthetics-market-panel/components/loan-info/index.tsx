import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { TTranslatedMessage } from '@/interface';
import { InfoSVG } from '@/svg';
import { capitalize } from '@/utils';

import { LoanInfoProps, TLoanInfo } from './loan-info.types';

const CustomInfo = [1, 2].map((index) => ({
  tip: ('syntheticsMarketAddress.loanInfoCustomTip' +
    index) as TTranslatedMessage,
  name: ('syntheticsMarketAddress.loanInfoCustomName' +
    index) as TTranslatedMessage,
})) as TLoanInfo;

const LOAN_INFO_MAP = CustomInfo.concat(
  [1, 2, 3].map((index) => ({
    tip: ('syntheticsMarketAddress.loanInfoLpFreeMarketTip' +
      index) as TTranslatedMessage,
    name: ('syntheticsMarketAddress.loanInfoLpFreeMarketName' +
      index) as TTranslatedMessage,
  }))
) as TLoanInfo;

const LoanInfo: FC<LoanInfoProps> = ({ isLoading, loanInfoData }) => {
  const t = useTranslations();

  return (
    <Box p="XL" order={4} gridArea="d" bg="foreground" borderRadius="L">
      {LOAN_INFO_MAP.map(({ name, tip }, i) => (
        <Box
          my="L"
          key={v4()}
          display={['block', 'block', 'block', 'flex']}
          justifyContent={['unset', 'unset', 'unset', 'space-between']}
        >
          <Typography variant="normal" display="flex" alignItems="center">
            <Box
              mr="L"
              as="span"
              width="1rem"
              cursor="help"
              data-tip={capitalize(t(tip))}
              display="inline-block"
            >
              <InfoSVG width="100%" />
            </Box>
            {capitalize(t(name))}
          </Typography>
          <Box
            whiteSpace="nowrap"
            color="textSecondary"
            ml={['XL', 'XL', 'XL', 'M']}
            mt={['M', 'M', 'M', 'unset']}
            textAlign={['unset', 'unset', 'unset', 'right']}
          >
            {isLoading ? (
              <Typography
                as="span"
                width="3rem"
                variant="normal"
                display="inline-block"
              >
                <Skeleton />
              </Typography>
            ) : (
              loanInfoData[i]
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
export default LoanInfo;
