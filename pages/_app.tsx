import type { AppProps } from 'next/app';

import { WagmiConfig } from 'wagmi';
import { Box, ChakraProvider, Container } from '@chakra-ui/react';

import { client } from '@helper/wagmiConfiguration';
import { Navbar } from '@components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <Box
          minH="100vh"
          bgGradient="linear-gradient(90deg, hsla(191, 88%, 81%, 1) 0%, 
          hsla(260, 72%, 82%, 1) 50%, hsla(247, 73%, 69%, 1) 100%)"
        >
          <Navbar />
          <Container maxW="100%" py="20px">
            <Component {...pageProps} />
          </Container>
        </Box>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
