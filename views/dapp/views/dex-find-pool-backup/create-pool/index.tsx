import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Input, Typography } from '@/elements';
import { formatMoney } from '@/utils';

import { CreatePoolProps } from '../dex-find-pool.types';

const CreatePool: FC<CreatePoolProps> = ({ register }) => {
  const address = useWatch({ control, name: `${name}.address` });

  const balance = Math.random() * 9782;

  const SVG = TOKENS_SVG_MAP[symbol] || TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    
  );
};

export default CreatePool;
