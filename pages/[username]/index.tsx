import { useCallback, useEffect, useState } from 'react';

import Head from 'next/head';
import { findIndex, get } from 'lodash';
import { useToast } from '@chakra-ui/react';
import type { GetServerSideProps } from 'next';

import { FullscreenSpinner, UserProfile } from '@components/index';
import { mediaApi, streamApi, userApi } from '@services/index';
import { prisma } from '@helper/prisma.server';
import { Media, User } from '@prisma/client';

interface StreamData {
  isActive: boolean;
  playbackId: string;
}

interface Props {
  user: User;
  currentUser: User | null;
}

const Livestream = ({ user, currentUser }: Props) => {
  const toast = useToast();
  const [userData, setUserData] = useState<User>(user);
  const [currentUserData, setCurrentUserData] = useState<User | null>(
    currentUser
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [data, setData] = useState<StreamData>({
    isActive: false,
    playbackId: '',
  });

  const getStreamData = useCallback(() => {
    if (!user.stream) return;
    setIsLoading(true);
    streamApi
      .get(user.stream.id)
      .then((res) => {
        const data = get(res, 'data');
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        toast({
          duration: 5000,
          status: 'error',
          isClosable: true,
          title: 'Something went wrong.',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [toast, user.stream]);

  const handleFollowUser = () => {
    if (!currentUserData?.id) return;
    setIsFollowing(true);
    userApi
      .follow({ followerId: currentUserData.id, followingId: userData.id })
      .then((res) => {
        const data = get(res, 'data');
        setUserData(data.following);
        setCurrentUserData(data.follower);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsFollowing(false);
      });
  };

  const handleCreateNft = (media: Media) => {
    setIsLoading(true);
    mediaApi
      .createNft(media, media.key)
      .then((res) => {
        const data = get(res, 'data.media');
        const userMedia = get(user, 'media', []);
        const mediaIndex = findIndex(userMedia, ['id', data?.id]);
        if (mediaIndex >= 0) {
          userMedia[mediaIndex] = data;
          setUserData((prev) => ({ ...prev, media: userMedia }));
        }

        toast({
          duration: 5000,
          isClosable: true,
          status: 'success',
          title: 'NFT created.',
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          duration: 5000,
          status: 'error',
          isClosable: true,
          title: 'Something went wrong.',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getStreamData();
  }, [getStreamData]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    setCurrentUserData(currentUser);
  }, [currentUser]);

  if (isLoading) return <FullscreenSpinner />;

  return (
    <>
      <Head>
        <title>{`${user.username} Profile`}</title>
      </Head>
      <UserProfile
        data={data}
        user={userData}
        isLoading={isLoading}
        refetch={getStreamData}
        isFollowing={isFollowing}
        currentUser={currentUserData}
        handleCreateNft={handleCreateNft}
        handleFollowUser={handleFollowUser}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const username = get(params, 'username') as string;
  const address = get(req, 'cookies.address');

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      media: true,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }
  let currentUser: User | null = null;
  if (address) {
    if (address === user.address) currentUser = user;
    else {
      currentUser = await prisma.user.findUnique({
        where: {
          address,
        },
      });
    }
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      currentUser: JSON.parse(JSON.stringify(currentUser)),
    },
  };
};

export default Livestream;
