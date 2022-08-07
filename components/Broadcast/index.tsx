import ReactPlayer from 'react-player';
import { Box, Button, Center, Container } from '@chakra-ui/react';

import { useStream } from '@hooks/useStream';
import { User } from '@prisma/client';
import { Card, LiveBadge } from '../';

interface Props {
  user: User;
}

export const Broadcast = ({ user }: Props) => {
  const { isLive, handleStopBroadCast, handleBroadcast, videoStream } =
    useStream(user.stream!.key);

  return (
    <Container maxW="4xl">
      <Card p="0" overflow="hidden">
        <Box pos="relative">
          {isLive && <LiveBadge />}
          <ReactPlayer
            playing
            playsinline
            width="100%"
            height="100%"
            controls={false}
            url={videoStream}
          />
        </Box>
        <Center py="15px">
          <Button
            colorScheme={isLive ? 'blue' : 'red'}
            onClick={isLive ? handleStopBroadCast : handleBroadcast}
          >
            {isLive ? 'Stop Stream' : 'Start Stream'}
          </Button>
        </Center>
      </Card>
    </Container>
  );
};
