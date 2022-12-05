import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { ApproveButton } from '@/components';
import { StakeState } from '@/constants';
import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { TOKEN_SYMBOL } from '@/sdk';
import { capitalize, formatMoney } from '@/utils';
import { GAPage } from '@/utils/analytics';

import { WalletGuardButton } from '../../../components';
import { DineroVaultFormProps, IVaultForm } from '../dinero-vault.types';
import InputBalance from '../input-balance';
import DepositButton from './deposit-button';
import WithdrawButton from './withdraw-button';

const DineroVaultForm: FC<DineroVaultFormProps> = ({
  data,
  refetch,
  stakeState,
}) => {
  const t = useTranslations();
  const { register, setValue, control } = useForm<IVaultForm>({
    defaultValues: {
      value: '',
    },
  });

  const isStake = stakeState === StakeState.Stake;

  return (
    <Box p="0 2rem 0rem">
      <Box display="flex" justifyContent="space-between" color="textSecondary">
        <Typography
          variant="normal"
          fontSize={['0.65rem', '0.65rem', '0.85rem', '0.85rem']}
          fontWeight="500"
          color="textSecondary"
          ml="M"
          textAlign="right"
          width="100%"
          as="p"
          display="flex"
          justifyContent="flex-end"
        >
          {capitalize(t('common.balance')) + ': '}
          {formatMoney(
            FixedPointMath.toNumber(
              isStake ? data.underlyingBalance : data.dineroBalance,
              isStake ? data.depositTokenDecimals : data.dineroDecimals
            )
          )}
        </Typography>
      </Box>
      <InputBalance
        name="value"
        max={FixedPointMath.toNumber(
          isStake
            ? data.underlyingBalance
            : data.depositAmount.gt(data.dineroBalance)
            ? data.dineroBalance
            : data.depositAmount,
          isStake ? data.depositTokenDecimals : data.dineroDecimals
        )}
        register={register}
        setValue={setValue}
        symbol={isStake ? data.depositTokenSymbol : TOKEN_SYMBOL.DNR}
        address={isStake ? data.depositTokenAddress : data.dineroAddress}
      />

      <WalletGuardButton>
        {data.underlyingAllowance.isZero() ? (
          <ApproveButton
            buttonProps={{
              variant: 'primary',
              width: '100%',
              py: 'L',
              mb: '1.5rem',
            }}
            refetch={refetch}
            chainId={data.chainId}
            contract={data.depositTokenAddress}
            spender={data.vaultAddress}
            enabled={data.underlyingAllowance.isZero()}
            pageName={GAPage.DineroVault}
          />
        ) : isStake ? (
          <DepositButton data={data} refetch={refetch} control={control} />
        ) : (
          <WithdrawButton data={data} refetch={refetch} control={control} />
        )}
      </WalletGuardButton>
    </Box>
  );
};

export default DineroVaultForm;
