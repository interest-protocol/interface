import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { WalletGuardButton } from '@/views/dapp/components';

import InputMoney from '../input-money';
import { SyntFormProps } from './synt-form.types';
import SyntFormButton from './synt-form-button';
import SyntFormSelectLtv from './synt-form-select-ltv';
import SyntFormSyntInfo from './synt-form-synt-info';

const SyntForm: FC<SyntFormProps> = ({
  data,
  fields,
  isMint,
  refetch,
  isGettingData,
  form,
}) => (
  <Box
    p="XL"
    order={2}
    gridArea="a"
    height="100%"
    bg="foreground"
    borderRadius="L"
  >
    {fields.map((input) =>
      isGettingData ? (
        <Box mb="L" key={v4()}>
          <Typography variant="normal" width="10rem" fontSize="S" mt="M" mb="L">
            <Skeleton />
          </Typography>
          <Skeleton style={{ height: '2.3rem' }} />
        </Box>
      ) : (
        <InputMoney
          key={v4()}
          data={data}
          errors={form.formState.errors}
          control={form.control}
          isMint={isMint}
          register={form.register}
          setValue={form.setValue}
          {...input}
        />
      )
    )}
    <SyntFormSelectLtv
      data={data}
      control={form.control}
      setValue={form.setValue}
      isMint={!!isMint}
    />
    <SyntFormSyntInfo control={form.control} data={data} isMint={!!isMint} />
    <WalletGuardButton>
      <SyntFormButton
        isMint={!!isMint}
        data={data}
        form={form}
        refetch={refetch}
      />
    </WalletGuardButton>
  </Box>
);

export default SyntForm;
