import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { ApproveButton } from '@/components';
import { Box } from '@/elements';
import { isValidAccount, isZeroAddress } from '@/utils';

import BurnButton from './burn-button';
import MintButton from './mint-button';
import { SyntFormButtonProps } from './synt-form.types';

const SyntFormButton: FC<SyntFormButtonProps> = ({
  data,
  isMint,
  refetch,
  form,
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
          <MintButton
            mintSynt={mintSynt}
            mintCollateral={mintCollateral}
            refetch={refetch}
            form={form}
            data={data}
          />
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
        <BurnButton
          burnSynt={burnSynt}
          burnCollateral={burnCollateral}
          refetch={refetch}
          form={form}
          data={data}
        />
      )}
    </Box>
  );
};

export default SyntFormButton;
