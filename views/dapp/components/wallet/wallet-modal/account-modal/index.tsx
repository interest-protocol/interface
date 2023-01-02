import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import { CopyToClipboard } from '@/components';
import { Box, Button, Modal, Typography } from '@/elements';
import { LinkSVG, TimesSVG, UserSVG } from '@/svg';
import { capitalize, shortAccount } from '@/utils';

import { AccountModalProps } from '../../wallet.types';

const AccountModal: FC<AccountModalProps> = ({
  account,
  showModal,
  toggleModal,
}) => {
  const t = useTranslations();
  const { connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  return (
    <Modal
      modalProps={{
        isOpen: showModal,
        shouldCloseOnEsc: true,
        onRequestClose: toggleModal,
        shouldCloseOnOverlayClick: true,
      }}
      background="#0008"
    >
      <Box p="L" width="100%" bg="foreground" maxWidth="23rem" borderRadius="L">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            as="h3"
            color="text"
            variant="normal"
            fontWeight="normal"
            textTransform="capitalize"
          >
            {t('common.account')}
          </Typography>
          <Box
            color="text"
            cursor="pointer"
            onClick={toggleModal}
            hover={{ color: 'text' }}
          >
            <TimesSVG
              width="1.8rem"
              height="1.8rem"
              maxHeight="1.8rem"
              maxWidth="1.8rem"
            />
          </Box>
        </Box>
        <Box
          p="L"
          mt="L"
          borderRadius="L"
          border="1px solid"
          borderColor="textSoft"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize="S" variant="normal" color="textSecondary">
              {capitalize(t('common.connected'))} {connector?.name}
            </Typography>
            <Button
              ml="L"
              variant="tertiary"
              onClick={() => disconnect()}
              hover={{ color: 'text', bg: 'accent' }}
            >
              {capitalize(t('common.disconnect'))}
            </Button>
          </Box>
          <Box display="flex" my="L">
            <Box
              width="1.5rem"
              height="1.5rem"
              overflow="hidden"
              borderRadius="50%"
            >
              <UserSVG
                height="100%"
                width="100%"
                maxHeight="1.5rem"
                maxWidth="1.5rem"
              />
            </Box>
            <Typography variant="normal" fontSize="L" color="text" ml="L">
              {shortAccount(account || '')}
            </Typography>
          </Box>
          <Box display="flex" color="textSecondary" mb="L" mt="XL">
            <CopyToClipboard
              display="flex"
              address={account}
              hover={{ color: 'text' }}
            >
              <Typography variant="normal" ml="M" fontSize="S">
                {capitalize(t('common.copy'))}
              </Typography>
            </CopyToClipboard>
            <a
              target="__blank"
              rel="noopener noreferrer"
              href={`${chain?.blockExplorers?.default.url}/address/${account}`}
            >
              <Box
                mx="M"
                fontSize="XS"
                display="flex"
                cursor="pointer"
                hover={{ color: 'text' }}
              >
                <Box as="span" display="inline-block" width="1rem">
                  <LinkSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
                </Box>
                <Typography variant="normal" ml="M" fontSize="S">
                  {capitalize(t('common.explorer'))}
                </Typography>
              </Box>
            </a>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AccountModal;
