import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
} from '@/utils';

import { isFormRepayEmpty } from '../../synthetics-market.utils';
import { BurnButtonProps } from './synt-form.types';

const BurnButton: FC<BurnButtonProps> = ({
  data,
  form,
  burnSynt,
  burnCollateral,
  refetch,
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  return <button>burn</button>;

  // const { writeAsync: repay } = useRepay(
  //   data,
  //   account,
  //   repayCollateral,
  //   repayLoan
  // );
  //
  // const handleRepay = async () => {
  //   try {
  //     setLoading(true);
  //     const tx = await repay?.();
  //
  //     await showTXSuccessToast(tx, data.chainId);
  //     form.reset();
  //   } catch (e: unknown) {
  //     throwContractCallError(e);
  //   } finally {
  //     setLoading(false);
  //     await refetch();
  //   }
  // };
  //
  // const onSubmitRepay = async () => {
  //   if (isFormRepayEmpty(form)) {
  //     toast.error(t('syntheticsMarketAddress.toastError'));
  //     return;
  //   }
  //
  //   if (!data.chainId || !account || !data) return;
  //
  //   await showToast(handleRepay(), {
  //     success: capitalize(t('common.success')),
  //     error: prop('message'),
  //     loading: capitalize(t('common.submit', { isLoading: 1 })),
  //   });
  // };

  // return (
  //   <Button
  //     display="flex"
  //     variant="primary"
  //     alignItems="center"
  //     disabled={loading || !repay}
  //     justifyContent="center"
  //     onClick={onSubmitRepay}
  //     hover={{ bg: !repay ? 'disabled' : 'accentActive' }}
  //     bg={!repay ? 'disabled' : loading ? 'accentActive' : 'accent'}
  //     cursor={loading || !repay ? 'not-allowed' : 'pointer'}
  //   >
  {
    /*{loading && (*/
  }
  {
    /*  <Box as="span" display="inline-block" width="1rem">*/
  }
  {
    /*    <LoadingSVG width="100%" />*/
  }
  {
    /*  </Box>*/
  }
  {
    /*)}*/
  }
  {
    /*<Typography*/
  }
  {
    /*  as="span"*/
  }
  {
    /*  fontSize="S"*/
  }
  {
    /*  variant="normal"*/
  }
  {
    /*  ml={loading ? 'L' : 'NONE'}*/
  }
  {
    /*>*/
  }
  {
    /*  {t(*/
  }
  {
    /*    !!+repayLoan && !!+repayCollateral*/
  }
  {
    /*      ? 'syntheticsMarketAddress.button.removeCollateralRepay'*/
  }
  {
    /*      : +repayCollateral*/
  }
  {
    /*      ? 'syntheticsMarketAddress.button.removeCollateral'*/
  }
  {
    /*      : 'syntheticsMarketAddress.button.repay'*/
  }
  {
    /*  )}*/
  }
  {
    /*</Typography>*/
  }
  // </Button>
  // );
};

export default BurnButton;
