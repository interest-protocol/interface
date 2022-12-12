import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';

import { CreatePoolProps, DexFindPoolForm } from '../dex-find-pool.types';
import CreatePoolField from './create-pool-field';
import Price from './price';

const TOKEN_NAMES = ['tokenA', 'tokenB'] as ReadonlyArray<
  keyof Omit<DexFindPoolForm, 'isStable'>
>;

const CreatePool: FC<CreatePoolProps> = ({
  control,
  register,
  needAllowance,
  setValue,
  tokenBalances,
  getValues,
  refetch,
}) => {
  const t = useTranslations();
  return (
    <Box
      p="L"
      my="L"
      color="text"
      width="100%"
      bg="foreground"
      maxWidth="30rem"
      borderRadius="M"
    >
      <Typography variant="normal" textTransform="uppercase" mb="L">
        {t('dexPoolFind.createPoolTitle', {
          isStable: Number(getValues('isStable')),
        })}
      </Typography>
      <Typography
        p="L"
        variant="normal"
        borderRadius="M"
        border="1px solid"
        bg="bottomBackground"
        borderColor="textSoft"
      >
        {t('dexPoolFind.createPoolAdvice')}
      </Typography>
      <Price control={control} />
      {TOKEN_NAMES.map((name, index) => (
        <CreatePoolField
          getValues={getValues}
          setValue={setValue}
          key={v4()}
          name={name}
          register={register}
          needAllowance={needAllowance[index]}
          tokenBalance={tokenBalances[index]}
          refetch={refetch}
        />
      ))}
      <Box
        p="L"
        mt="L"
        display="grid"
        borderRadius="M"
        border="1px solid"
        alignItems="center"
        bg="bottomBackground"
        borderColor="textSoft"
        gridTemplateColumns="3rem auto"
      >
        <Box as="span" width="1.5rem" display="inline-block">
          <InfoSVG width="100%" maxHeight="1.5rem" maxWidth="1.5rem" />
        </Box>
        <Typography variant="normal" fontSize="0.85rem">
          {t(
            `dexPoolFind.createPoolInfo.${
              getValues('isStable') ? 'stable' : 'volatile'
            }`
          )}
        </Typography>
      </Box>
    </Box>
  );
};
export default CreatePool;
