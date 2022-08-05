import React, { useEffect } from 'react';

import {
  Box,
  Drawer,
  Center,
  DrawerBody,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { HiMenuAlt4 } from 'react-icons/hi';

import { Nav } from '../Nav';
import { WalletAuth } from '@components/WalletAuth';

export const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => window.innerWidth >= 992 && onClose();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <Box display={{ base: 'flex', lg: 'none' }} alignItems="center">
      <Box
        color="white"
        fontSize="3xl"
        as={HiMenuAlt4}
        cursor="pointer"
        onClick={onOpen}
      />
      <Drawer size="full" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            color="white"
            zIndex="docked"
            _focus={{ outline: 'none' }}
          />
          <DrawerBody bg="black">
            <Box py="4" />
            <Box>
              <Nav onClick={onClose} />
            </Box>
            <Box py="4" />
            <Center>
              <WalletAuth />
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
