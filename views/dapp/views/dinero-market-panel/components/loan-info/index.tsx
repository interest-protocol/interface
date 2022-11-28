import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import MessageKeys from 'use-intl/dist/utils/MessageKeys';
import { v4 } from 'uuid';

import { DineroMarketKind } from '@/constants';
import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';
import { capitalize } from '@/utils';

import { LoanInfoProps } from './loan-info.types';

const CustomInfo = [1, 2, 3].map((index) => ({
  tip: 'dineroMarketAddress.loanInfoCustomTip' + index,
  name: 'dineroMarketAddress.loanInfoCustomName' + index,
}));

const LOAN_INFO_MAP = {
  [DineroMarketKind.LpFreeMarket]: CustomInfo.concat(
    [1, 2, 3].map((index) => ({
      tip: 'dineroMarketAddress.loanInfoLpFreeMarketTip' + index,
      name: 'dineroMarketAddress.loanInfoLpFreeMarketName' + index,
    }))
  ),
  [DineroMarketKind.ERC20]: CustomInfo,
  [DineroMarketKind.Native]: CustomInfo,
};

const LoanInfo: FC<LoanInfoProps> = ({ kind, isLoading, loanInfoData }) => {
  const t = useTranslations();

  return (
    <Box p="XL" order={4} gridArea="d" bg="foreground" borderRadius="L">
      {propOr<
        typeof LOAN_INFO_MAP[keyof typeof LOAN_INFO_MAP],
        typeof LOAN_INFO_MAP,
        typeof LOAN_INFO_MAP[keyof typeof LOAN_INFO_MAP]
      >([], kind.toString(), LOAN_INFO_MAP).map(({ name, tip }, i) => (
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
              data-tip={capitalize(t(tip as MessageKeys<IntlMessages, any>))}
              display="inline-block"
            >
              <InfoSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
            </Box>
            {capitalize(t(name as MessageKeys<IntlMessages, any>))}
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
