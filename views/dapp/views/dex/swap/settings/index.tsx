import { ChangeEvent, FC, useEffect, useRef } from 'react';

import { Box, Button, Typography } from '@/elements';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';
import { TimesSVG } from '@/svg';
import { parseInputEventToNumberString } from '@/utils';

import AutoFetch from './auto-fetch';
import Field from './field';
import { SwapSettingsProps } from './settings.types';

const SettingsModal: FC<SwapSettingsProps> = ({
  toggle,
  register,
  setValue,
  setLocalSettings,
  localSettings,
}) => {
  const dropdownContainerRef =
    useClickOutsideListenerRef<HTMLDivElement>(toggle);

  const newSlippage = useRef<string | null>(null);
  const newDeadline = useRef<number | null>(null);
  const autoFetch = useRef<boolean>(localSettings.autoFetch ?? true);

  useEffect(() => {
    return () => {
      const deadline =
        !!newDeadline.current && newDeadline.current !== localSettings.deadline
          ? newDeadline.current
          : localSettings.deadline;

      const slippage =
        !!newSlippage.current && newSlippage.current !== localSettings.slippage
          ? newSlippage.current
          : localSettings.slippage;

      setLocalSettings({
        slippage,
        deadline,
        autoFetch: autoFetch.current,
      });
    };
  }, []);

  return (
    <Box
      pb="L"
      zIndex={1}
      color="text"
      bg="foreground"
      width={['80%', '80%', '80%', 'unset']}
      minWidth="20rem"
      borderRadius="M"
      position="absolute"
      ref={dropdownContainerRef}
      boxShadow="0 0 0.5rem #0006"
    >
      <Box display="flex" justifyContent="space-between" p="S">
        <Typography
          m="M"
          pt="S"
          fontSize="S"
          variant="normal"
          color="textSecondary"
          textTransform="uppercase"
        >
          Transaction Settings
        </Typography>
        <Button
          p="S"
          display="flex"
          bg="transparent"
          onClick={toggle}
          variant="secondary"
          alignItems="center"
          justifyContent="center"
          hover={{
            bg: 'background',
          }}
        >
          <TimesSVG width="1.5rem" />
        </Button>
      </Box>
      <Box px="L">
        <Field
          type="string"
          max="30"
          placeholder="0.5"
          label="Slippage tolerance?"
          setRegister={() =>
            register('slippage', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                const slippage = parseInputEventToNumberString(v);
                const safeSlippage = +slippage >= 30 ? '30' : slippage;
                setValue('slippage', safeSlippage);
                newSlippage.current = safeSlippage;
              },
            })
          }
          prefix={
            <Button
              px="M"
              fontSize="S"
              height="100%"
              variant="secondary"
              bg="accent"
              hover={{ bg: 'accent' }}
              active={{ bg: 'accentActive' }}
              onClick={() => {
                setValue('slippage', '0.1');
                newSlippage.current = '0.1';
              }}
            >
              Auto
            </Button>
          }
          suffix={<Typography variant="normal">%</Typography>}
        />
        <Field
          type="number"
          placeholder="5"
          max="30"
          setRegister={() =>
            register('deadline', {
              onChange: (v: ChangeEvent<HTMLInputElement>) => {
                const deadline = isNaN(+v.target.value) ? 0 : +v.target.value;
                setValue('deadline', deadline);
                newDeadline.current = deadline;
              },
            })
          }
          label="Transaction deadline"
          suffix={<Typography variant="normal">minutes</Typography>}
        />
      </Box>
      <Box p="S">
        <Typography
          m="M"
          pt="M"
          pb="L"
          fontSize="S"
          variant="normal"
          color="textSecondary"
          textTransform="uppercase"
        >
          Panel Settings
        </Typography>
        <AutoFetch
          value={autoFetch.current}
          setter={(value: boolean) => (autoFetch.current = value)}
        />
      </Box>
    </Box>
  );
};

export default SettingsModal;
