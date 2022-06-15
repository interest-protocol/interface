import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { MAIL_FAUCET_TOKENS } from '@/constants';
import { Box } from '@/elements';
import { CogsSVG } from '@/svg';

import Settings from '../components/settings';
import SwapForm from '../components/swap-form';
import { ISwapForm } from '../dex.types';

const Swap: FC = () => {
  const { register, setValue, getValues } = useForm<ISwapForm>({
    defaultValues: {
      origin: {
        address: MAIL_FAUCET_TOKENS[4][0].address,
        value: 0,
      },
      target: {
        address: MAIL_FAUCET_TOKENS[4][1].address,
        value: 0,
      },
      slippage: 0.1,
      deadline: 30,
    },
  });

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(!showSettings);

  return (
    <>
      <Box
        my="L"
        px="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="40rem"
        borderRadius="M"
      >
        <Box
          pt="L"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Box
              display="flex"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              transform="rotate(0deg)"
              onClick={toggleSettings}
              transition="all 300ms ease-in-out"
              hover={{
                color: 'accent',
                transform: 'rotate(90deg)',
              }}
            >
              <CogsSVG width="1.5rem" />
            </Box>
            {showSettings && (
              <Settings toggle={toggleSettings} register={register} />
            )}
          </Box>
        </Box>
        <SwapForm
          setValue={setValue}
          register={register}
          getValues={getValues}
          tokens={MAIL_FAUCET_TOKENS[4]}
        />
      </Box>
    </>
  );
};

export default Swap;
