import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box } from '@/elements';

import { BorrowTable } from '../../components';

const DApp: FC = () => {
  const { locale } = useRouter();
  console.log(locale, 'seessd');

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <BorrowTable />
    </Box>
  );
};
export default DApp;
