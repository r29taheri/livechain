import { get } from 'lodash';
import ReactPlayer from 'react-player';
import { isIOS } from 'react-device-detect';
import { Box, Container } from '@chakra-ui/react';

import { Card, LiveBadge } from '@components/common';

interface Props {
  data: {
    isActive: boolean;
    playbackId: string;
  };
}

export const Stream = ({ data }: Props) => (
  <Container maxW="4xl">
    <Card p="0" overflow="hidden">
      <Box pos="relative">
        {data.isActive && <LiveBadge />}
        <ReactPlayer
          playing
          config={
            !isIOS
              ? {
                  file: {
                    forceHLS: true,
                    hlsOptions: {
                      appendErrorMaxRetry: 100,
                      manifestLoadingMaxRetry: 100,
                    },
                  },
                }
              : {}
          }
          controls
          playsinline
          width="100%"
          height="100%"
          url={`https://livepeercdn.com/hls/${get(
            data,
            'playbackId'
          )}/index.m3u8`}
        />
      </Box>
    </Card>
  </Container>
);
