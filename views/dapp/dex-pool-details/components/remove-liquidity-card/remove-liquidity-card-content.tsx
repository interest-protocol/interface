import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Button } from '@/elements';
import { capitalize } from '@/utils';

import ApproveButton from './approve-button';
import LinearLoader from './linear-loader';
import RemoveLiquidityButton from './remove-liquidity-button';
import { RemoveLiquidityCardContentProps } from './remove-liquidity-card.types';
import TokenAmount from './token-amount';

const RemoveLiquidityCardContent: FC<RemoveLiquidityCardContentProps> = ({
  tokens,
  isStable,
  lpAllowance,
  lpBalance,
  pairAddress,
  isFetchingInitialData,
  setValue,
  control,
}) => {
  const t = useTranslations();

  const handleApproveToken = async () => {
    console.log('approveToken');

    // showToast(approveToken(), {
    //   loading: `${capitalize(t('common.approve', { isLoading: 1 }))}`,
    //   success: capitalize(t('common.success')),
    //   error: prop('message'),
    // });
  };

  const handleRemoveLiquidity = async () => {
    console.log('remove');

    // showToast(remove(), {
    //   loading: capitalize(`${t('common.remove', { isLoading: 1 })}`),
    //   success: capitalize(t('common.success')),
    //   error: prop('message'),
    // });
  };

  return (
    <>
      <LinearLoader control={control} />
      <Box
        my="L"
        rowGap="1rem"
        display="grid"
        gridTemplateColumns="auto auto 1fr"
      >
        <TokenAmount
          Icon={tokens[0].Icon}
          symbol={tokens[0].symbol}
          control={control}
          name="token0Amount"
          isFetchingInitialData={isFetchingInitialData}
        />
        <TokenAmount
          Icon={tokens[1].Icon}
          symbol={tokens[1].symbol}
          control={control}
          name="token1Amount"
          isFetchingInitialData={isFetchingInitialData}
        />
      </Box>
      <Box
        mt="L"
        display="grid"
        gridColumnGap="1rem"
        gridTemplateColumns={lpAllowance === 0 ? '1fr' : '1fr 1fr'}
      >
        {lpAllowance === 0 ? (
          <ApproveButton
            disabled={false}
            control={control}
            onClick={handleApproveToken}
            symbol0={tokens[0].symbol}
            symbol1={tokens[1].symbol}
          />
        ) : (
          <>
            <Button
              width="100%"
              variant="primary"
              bg="bottomBackground"
              hover={{ bg: 'disabled' }}
              onClick={() => {
                setValue('lpAmount', '0.0');
              }}
            >
              {capitalize(t('common.reset'))}
            </Button>
            <RemoveLiquidityButton
              control={control}
              onClick={handleRemoveLiquidity}
              disabled={false}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default RemoveLiquidityCardContent;
