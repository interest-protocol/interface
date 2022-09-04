import { useTranslations } from 'next-intl';
import { propOr } from 'ramda';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { DineroMarketKind } from '@/constants';
import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';

import { LoanInfoProps } from './loan-info.types';

const LoanInfo: FC<LoanInfoProps> = ({ kind, isLoading, loanInfoData }) => {
  const t = useTranslations();
  const LOAN_INFO_MAP = {
    [DineroMarketKind.LpFreeMarket]: [1, 2, 3, 4, 5, 6].map((index) => ({
      tip: t('dinero-market-address.loanInfoLpFreeMarketTip' + index),
      name: t('dinero-market-address.loanInfoLpFreeMarketName' + index),
    })),
    [DineroMarketKind.ERC20]: [1, 2, 3].map((index) => ({
      tip: t('dinero-market-address.loanInfoERC20Tip' + index),
      name: t('dinero-market-address.loanInfoERC20Name' + index),
    })),
    [DineroMarketKind.Native]: [1, 2, 3].map((index) => ({
      tip: t('dinero-market-address.loanInfoNativeTip' + index),
      name: t('dinero-market-address.loanInfoNativeName' + index),
    })),
  };

  return (
    <Box p="XL" order={4} gridArea="d" bg="foreground" borderRadius="L">
      {propOr<
        typeof LOAN_INFO_MAP[keyof typeof LOAN_INFO_MAP],
        typeof LOAN_INFO_MAP,
        typeof LOAN_INFO_MAP[keyof typeof LOAN_INFO_MAP]
      >([], kind.toString(), LOAN_INFO_MAP).map(({ name, tip }, i) => (
        <Box my="L" key={v4()} display="flex" justifyContent="space-between">
          <Typography variant="normal" display="flex" alignItems="center">
            <Box
              mr="L"
              as="span"
              width="1rem"
              cursor="help"
              data-tip={tip}
              display="inline-block"
            >
              <InfoSVG width="100%" />
            </Box>
            {name}
          </Typography>
          <Typography
            as="div"
            variant="normal"
            textAlign="right"
            whiteSpace="nowrap"
            color="textSecondary"
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
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default LoanInfo;
