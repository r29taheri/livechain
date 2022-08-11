import { useCallback, useEffect, useRef } from 'react';

import { find } from 'lodash';
import {
  Box,
  List,
  Modal,
  Button,
  ListItem,
  useToast,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react';
import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import { Connector, useAccount, useConnect } from 'wagmi';

import { userApi } from '@services/index';

interface Props {
  handleLoading: (isLoading: boolean) => void;
}

export const ConnectWallet = ({ handleLoading }: Props) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { error, connectors, connectAsync, pendingConnector } = useConnect();
  const { isConnected, isConnecting } = useAccount();
  const askedToConnect = useRef(false);

  const handleConnectWallet = useCallback(
    async (connector: Connector) => {
      handleLoading(true);
      try {
        const result = await connectAsync({ connector });
        await userApi.login({ address: result.account });
      } catch (error) {
        console.error(error);
        toast({
          duration: 5000,
          status: 'error',
          isClosable: true,
          title: 'Something went wrong.',
        });
      } finally {
        onClose();
        handleLoading(false);
      }
    },
    [connectAsync, handleLoading, onClose, toast]
  );

  useEffect(() => {
    if (!isMobile || isConnected || askedToConnect.current) return;
    const injected = find(connectors, ['id', 'injected']);

    if (injected && injected.ready) {
      handleConnectWallet(injected);
    }
    askedToConnect.current = true;
  }, [connectors, handleConnectWallet, isConnected]);

  return (
    <>
      <Button onClick={onOpen}>Connect to your wallet</Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect to wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <List spacing={3}>
                {connectors
                  .filter((item) =>
                    item.ready && !isMobile ? item.id !== 'injected' : true
                  )
                  .map((connector) => (
                    <ListItem
                      rounded="8px"
                      display="flex"
                      padding="10px"
                      cursor="pointer"
                      key={connector.id}
                      bgColor="gray.300"
                      transition="300ms"
                      _hover={{ bgColor: 'gray.400' }}
                      justifyContent="space-between"
                      onClick={() => handleConnectWallet(connector)}
                    >
                      <span>
                        {connector.name}
                        {!connector.ready && ' (unsupported)'}
                        {isConnecting &&
                          connector.id === pendingConnector?.id &&
                          ' (connecting)'}
                      </span>
                      <Image
                        width={24}
                        height={24}
                        src={`/icons/${connector.id}.svg`}
                        alt={`Connect to ${connector.name}`}
                      />
                    </ListItem>
                  ))}
              </List>
              {error && <Box>{error.message}</Box>}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
