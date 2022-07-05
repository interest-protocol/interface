import { not } from 'ramda';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ERC_20_DATA } from '@/constants';
import { Box } from '@/elements';
import { useIdAccount, useLocalStorage } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { CogsSVG } from '@/svg';

import Settings from './components/settings';
import SwapForm from './components/swap-form';
import { ISwapForm, LocalSwapSettings, Volatility } from './dex.types';

const Swap: FC = () => {
  const { chainId } = useIdAccount();
  const [localSettings, setLocalSettings] = useLocalStorage<LocalSwapSettings>(
    'interest-swap-settings',
    { slippage: 1, deadline: 5, volatility: Volatility.Auto }
  );

  const { register, control, setValue } = useForm<ISwapForm>({
    defaultValues: {
      tokenIn: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.INT].address,
        value: '0',
      },
      tokenOut: {
        address: ERC_20_DATA[chainId][TOKEN_SYMBOL.BTC].address,
        value: '0',
      },
      slippage: localSettings.slippage,
      deadline: localSettings.deadline,
      volatility: localSettings.volatility,
    },
  });

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings(not);

  const setVolatility = (x: Volatility) => {
    setValue('volatility', x);
    setLocalSettings({ ...localSettings, volatility: x });
  };

  const setDeadline = (x: number) => {
    setValue('deadline', x);
    setLocalSettings({ ...localSettings, deadline: x });
  };

  const setSlippage = (x: number) => {
    setValue('slippage', x);
    setLocalSettings({ ...localSettings, slippage: x });
  };

  return (
    <>
      <Box
        my="L"
        px="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth={['20rem', '40rem']}
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
              transition="all 300ms ease-in-out"
              hover={{
                color: 'accent',
                transform: 'rotate(90deg)',
              }}
            >
              <CogsSVG width="1.5rem" />
            </Box>
            {showSettings && (
              <Settings
                toggle={toggleSettings}
                control={control}
                register={register}
                setDeadline={setDeadline}
                setSlippage={setSlippage}
                setVolatility={setVolatility}
              />
            )}
          </Box>
        </Box>
        <SwapForm control={control} setValue={setValue} register={register} />
      </Box>
    </>
  );
};

export default Swap;
