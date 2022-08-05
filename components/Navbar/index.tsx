import { Button, Center, Box, Flex, Text } from '@chakra-ui/react';

import { MobileNav } from './MobileNav';
import { WalletAuth } from '..';
import { Nav } from './Nav';

export const Navbar = () => (
  <Flex
    w="100%"
    px="48px"
    h="100px"
    pos="relative"
    alignItems="center"
    justifyContent="space-between"
  >
    <Center>
      <Text></Text>
    </Center>
    <Box display={{ base: 'none', lg: 'block' }}>
      <Nav />
    </Box>
    <MobileNav />
    <Center display={{ base: 'none', lg: 'block' }}>
      <WalletAuth />
    </Center>
  </Flex>
);
