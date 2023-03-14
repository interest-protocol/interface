import { FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { InputBalance } from '@/elements';

import { CreatePoolFieldProps } from '../dex-find-pool.types';

const CreatePoolField: FC<CreatePoolFieldProps> = ({
  name,
  register,
  setValue,
  getValues,
}) => {
  const token = getValues(name);

  const SVG = TOKENS_SVG_MAP[token.type] ?? TOKENS_SVG_MAP.default;

  return (
    <InputBalance
      balance={''}
      disabled={!token.type}
      name={undefined}
      register={register}
      setValue={setValue}
      isLarge={false}
      buttonMaxPosition="left"
      Suffix={<SVG maxWidth="1rem" maxHeight="1rem" width="100%" />}
    />
  );
};

export default CreatePoolField;
