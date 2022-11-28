import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import Box from '@/elements/box';
import Typography from '@/elements/typography';
import { TTranslatedMessage } from '@/interface';
import { InfoSVG } from '@/svg';
import { capitalize } from '@/utils';

import { TInfo } from '../../synthetics-market.types';
import {
  getBurnPositionHealthData,
  getMintPositionHealthData,
} from '../../synthetics-market.utils';
import { SyntFormSyntInfoProps } from './synt-form.types';

const INFO: TInfo = [1, 2, 3].map((item) => ({
  name: ('syntheticsMarketAddress.formSyntInfoText' +
    item) as TTranslatedMessage,
  tip: ('syntheticsMarketAddress.formSyntInfoTip' + item) as TTranslatedMessage,
}));

const SyntFormSyntInfo: FC<SyntFormSyntInfoProps> = ({
  control,
  data,
  isMint,
}) => {
  const t = useTranslations();

  const mintSynt = useWatch({ control, name: 'mint.synt' });

  const mintCollateral = useWatch({
    control,
    name: 'mint.collateral',
  });

  const burnSynt = useWatch({ control, name: 'burn.synt' });

  const burnCollateral = useWatch({
    control,
    name: 'burn.collateral',
  });

  const loanData = isMint
    ? getMintPositionHealthData(data, {
        collateral: mintCollateral || '0',
        synt: mintSynt || '0',
      })
    : getBurnPositionHealthData(data, {
        collateral: burnCollateral || '0',
        synt: burnSynt || '0',
      });

  const translationValues = {
    syntheticSymbol: data.syntSymbol,
  };

  return (
    <Box mt="XXL">
      {INFO.map(({ name, tip }, i) => (
        <Box
          p="M"
          key={v4()}
          display={['block', 'block', 'block', 'flex']}
          justifyContent={['unset', 'unset', 'unset', 'space-between']}
        >
          <Box display="flex" alignItems="center">
            <Box
              mr="M"
              width="1rem"
              cursor="help"
              display="flex"
              data-tip={capitalize(t(tip, translationValues))}
              minWidth="1rem"
              alignItems="center"
            >
              <InfoSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
            </Box>
            <Typography variant="normal" as="span">
              {capitalize(t(name, translationValues))}
            </Typography>
          </Box>
          <Typography
            as="span"
            variant="normal"
            whiteSpace="nowrap"
            color="textSecondary"
            display="inline-block"
            ml={['XL', 'XL', 'XL', 'S']}
            mt={['M', 'M', 'M', 'unset']}
            textAlign={['unset', 'unset', 'unset', 'right']}
          >
            {loanData[i]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SyntFormSyntInfo;
