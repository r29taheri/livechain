import { Center, Container, Heading, Stack } from '@chakra-ui/react';

export const Header = () => (
  <Container maxW="100%">
    <Center h="calc(100vh - 100px)">
      <Stack>
        <Heading color="white" size="4xl">
          Live on blockchain
        </Heading>
      </Stack>
    </Center>
  </Container>
);
