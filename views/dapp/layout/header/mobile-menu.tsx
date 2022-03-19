import { FC, useState } from 'react';

import { BarsSVG } from '@svg';
import { Box, Dropdown } from '../../../../elements';

const MobileMenu: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showLoans, setShowLoans] = useState<boolean>(false);

  const toggleShowMenu = () => setShowMenu(!showMenu);

  const toggleLoans = () => setShowLoans(!showLoans);

  return (
    <Box display={['block', 'none']}>
      <Dropdown
        buttonMode
        mode="menu"
        isOpen={showMenu}
        setOpen={setShowMenu}
        title={
          <Box
            width="1.6rem"
            height="1.6rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <BarsSVG width="1rem" />
          </Box>
        }
        data={[
          {
            value: 'borrow',
            displayOption: 'Borrow',
            onSelect: toggleShowMenu,
          },
          {
            value: 'loans',
            noAction: true,
            onSelect: toggleLoans,
            displayOption: 'NFTLoans',
          },
          ...(showLoans
            ? [
                {
                  value: 'borrow',
                  displayOption: 'Borrow',
                  onSelect: toggleShowMenu,
                },
                {
                  value: 'lend',
                  displayOption: 'Lend',
                  onSelect: toggleShowMenu,
                },
              ]
            : []),
        ]}
      />
    </Box>
  );
};

export default MobileMenu;
