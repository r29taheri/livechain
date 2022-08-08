import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  Divider,
  Container,
  AvatarBadge,
} from '@chakra-ui/react';
import { BiUserPlus, BiUserMinus } from 'react-icons/bi';

import { ReloadStream } from './Stream/ReloadStream';
import { Card } from '@components/common';
import { Stream } from './Stream/index';
import { User } from '@prisma/client';

interface Props {
  user: User;
  currentUser: User | null;
  data: {
    isActive: boolean;
    playbackId: string;
  };
  refetch: () => void;
  isFollowing: boolean;
  handleFollowUser: () => void;
}

export const UserProfile = ({
  data,
  user,
  refetch,
  currentUser,
  isFollowing,
  handleFollowUser,
}: Props) => {
  const isFollowed = currentUser
    ? user.followedByIDs.includes(currentUser.id)
    : false;

  return (
    <Container maxW="4xl">
      <Card overflow="hidden">
        <Box mb="10px" textAlign="center">
          <Avatar mb="10px">
            {data.isActive && <AvatarBadge boxSize="1.25em" bg="green.500" />}
          </Avatar>
          <Text fontSize="2xl" fontWeight="bold">
            @{user.username}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {user.name}
          </Text>
          <Divider />
          <Flex my="10px" w="full" justifyContent="center">
            <Text mr="20px">{user.followedByIDs.length} Followers</Text>
            <Text>{user.followingIDs.length} Following</Text>
          </Flex>
          {currentUser && currentUser?.id !== user.id && (
            <Button
              isLoading={isFollowing}
              disabled={!currentUser}
              onClick={handleFollowUser}
              leftIcon={isFollowed ? <BiUserMinus /> : <BiUserPlus />}
            >
              {isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </Box>
        {data.isActive ? (
          <Stream data={data} />
        ) : (
          <ReloadStream refetch={refetch} />
        )}
      </Card>
    </Container>
  );
};
