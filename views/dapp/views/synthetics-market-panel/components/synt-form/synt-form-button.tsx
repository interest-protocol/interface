import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { ApproveButton } from '@/components';
import { Box } from '@/elements';
import { isValidAccount, isZeroAddress } from '@/utils';
import { GAPage } from '@/utils/analytics';

import { SyntFormButtonProps } from './synt-form.types';

const SyntFormButton: FC<SyntFormButtonProps> = ({
  data,
  form,
  isMint,
  refetch,
  mintButton,
  burnButton,
}) => {
  const t = useTranslations();
  const burnSynt = useWatch({ control: form.control, name: 'burn.synt' });

  const burnCollateral = useWatch({
    control: form.control,
    name: 'burn.collateral',
  });

  const mintSynt = useWatch({ control: form.control, name: 'mint.synt' });

  const mintCollateral = useWatch({
    control: form.control,
    name: 'mint.collateral',
  });

  return (
    <Box display="flex" justifyContent="center" mt="XXL">
      {isMint ? (
        data.collateralAllowance.isZero() ? (
          <ApproveButton
            enabled={
              data.collateralAllowance.isZero() &&
              isValidAccount(data.account) &&
              !isZeroAddress(data.marketAddress)
            }
            refetch={refetch}
            chainId={data.chainId}
            contract={data.collateralAddress}
            spender={data.marketAddress}
            buttonProps={{
              display: 'flex',
              variant: 'primary',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            pageName={GAPage.SyntheticsMarketPanel}
          />
        ) : (!mintSynt && !mintCollateral) ||
          (+mintCollateral === 0 && +mintSynt === 0) ? (
          <Box
            py="L"
            px="XL"
            fontSize="S"
            bg="disabled"
            borderRadius="M"
            cursor="not-allowed"
          >
            {t('syntheticsMarketAddress.button.default')}
          </Box>
        ) : (
          mintButton
        )
      ) : !+burnSynt && !+burnCollateral ? (
        <Box
          py="L"
          px="XL"
          fontSize="S"
          bg="disabled"
          borderRadius="M"
          cursor="not-allowed"
        >
          {t('syntheticsMarketAddress.button.default')}
        </Box>
      ) : (
        burnButton
      )}
    </Box>
  );
};

export default SyntFormButton;
