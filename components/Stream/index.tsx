import { get } from 'lodash';
import ReactPlayer from 'react-player';
import { Box, Container } from '@chakra-ui/react';

import { Card, LiveBadge } from '@components/common';
import { ReloadStream } from './ReloadStream';

interface Props {
  data: {
    isActive: boolean;
    playbackId: string;
  };
  refetch: () => void;
}

export const Stream = ({ data, refetch }: Props) => (
  <Container maxW="4xl">
    <Card p="0" overflow="hidden">
      {data.isActive ? (
        <Box pos="relative">
          {data.isActive && <LiveBadge />}
          <ReactPlayer
            playing
            config={{
              file: {
                forceHLS: true,
                hlsOptions: {
                  appendErrorMaxRetry: 100,
                  manifestLoadingMaxRetry: 100,
                },
              },
            }}
            controls
            width="100%"
            height="100%"
            url={`https://livepeercdn.com/hls/${get(
              data,
              'playbackId'
            )}/index.m3u8`}
          />
        </Box>
      ) : (
        <ReloadStream refetch={refetch} />
      )}
    </Card>
  </Container>
);
