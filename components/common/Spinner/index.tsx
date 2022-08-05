import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react';

export const Spinner = () => (
  <Center
    top={0}
    left={0}
    pos="fixed"
    boxSize="full"
    zIndex="docked"
    bgColor="#00000094"
  >
    <ChakraSpinner />
  </Center>
);
