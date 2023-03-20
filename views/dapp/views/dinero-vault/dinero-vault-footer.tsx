import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { animated, useSpring } from 'react-spring';
import { v4 } from 'uuid';

import { Box, RefBox, Typography } from '@/elements';
import { ArrowSVG } from '@/svg';

import { DineroVaultFooterProps } from './dinero-vault.types';
import DineroVaultFooterItem from './dinero-vault-footer-item';

const AnimatedBox = animated(Box);

const DineroVaultFooter: FC<DineroVaultFooterProps> = ({
  dineroVaultDetailsFooterItems,
  openDetailsState,
  detailRef,
}) => {
  const t = useTranslations();

  const { mHeight, arrowInvert } = useSpring({
    from: {
      mHeight: `0px`,
      arrowInvert: 'scaleY(1)',
    },
    to: {
      mHeight: `${
        openDetailsState.openDetails ? detailRef.current?.offsetHeight ?? 0 : 0
      }px`,
      arrowInvert: !openDetailsState.openDetails ? 'scaleY(1)' : 'scaleY(-1)',
    },
    config: {
      duration: 500,
    },
  });

  return (
    <>
      <Box
        height="4rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        onClick={() =>
          openDetailsState.setOpenDetails(!openDetailsState.openDetails)
        }
      >
        <Typography
          variant="normal"
          color="textSecondary"
          mr="M"
          fontSize="0.9rem"
        >
          {t('dineroVault.openButton', {
            isOpen: +!openDetailsState.openDetails,
          })}
        </Typography>
        <AnimatedBox style={{ transform: arrowInvert }}>
          <ArrowSVG width="0.5rem" maxHeight="0.5rem" maxWidth="0.5rem" />
        </AnimatedBox>
      </Box>
      <AnimatedBox style={{ height: mHeight }} overflow="hidden">
        <RefBox p="0 2rem 2rem" cursor="default" ref={detailRef}>
          <Box
            bg="background"
            px="1.5rem"
            height="4rem"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            borderRadius="0.5rem"
          >
            {dineroVaultDetailsFooterItems.map((item) => (
              <DineroVaultFooterItem
                {...item}
                fontSize="0.8rem"
                color="textSecondary"
                key={v4()}
              />
            ))}
          </Box>
        </RefBox>
      </AnimatedBox>
    </>
  );
};

export default DineroVaultFooter;
