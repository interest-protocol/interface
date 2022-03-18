import { FC } from 'react';

import { Dropdown, Typography } from '../../../../elements';
import useWallet from '../../../../hooks/use-wallet';
import { walletOptions } from './header.data';
import { walletOptionsMapToDropdown } from './header.helpers';
import { Anchor } from './header.styles';

export const HeaderAccount: FC = () => {
  const { accountData } = useWallet();

  return (
    <Typography ml="M" variant="normal">
      {accountData?.accountNumber || 'Account Number'}
    </Typography>
  );
};

const HeaderWalletDropdown: FC = () => {
  const { accountData, setAccountData } = useWallet();

  return (
    <Dropdown
      buttonMode
      mode="select"
      title="Connect Wallet"
      header="Connect your Wallet:"
      defaultValue={accountData ? accountData.wallet : undefined}
      footer={
        <>
          ✓ Accept{' '}
          <Anchor href="https://no-where.com/terms">Terms of Use</Anchor> and{' '}
          <Anchor href="https://no-where.com/privacy-policy">
            Privacy Policy
          </Anchor>
        </>
      }
      data={walletOptionsMapToDropdown(walletOptions, setAccountData)}
    />
  );
};

export default HeaderWalletDropdown;
