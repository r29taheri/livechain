import { useCallback, useEffect, useState } from 'react';

import Head from 'next/head';
import { get } from 'lodash';
import type { GetServerSideProps } from 'next';

import { Spinner, UserProfile } from '@components/index';
import { prisma } from '@helper/prisma.server';
import { streamApi, userApi } from '@services/index';
import { User } from '@prisma/client';

interface StreamData {
  isActive: boolean;
  playbackId: string;
}

interface Props {
  user: User;
  currentUser: User | null;
}

const Livestream = ({ user, currentUser }: Props) => {
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
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

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

  useEffect(() => {
    getStreamData();
  }, [getStreamData]);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    setCurrentUserData(currentUser);
  }, [currentUser]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Head>
        <title>{`${user.username} Profile`}</title>
      </Head>
      <UserProfile
        data={data}
        user={userData}
        refetch={getStreamData}
        isFollowing={isFollowing}
        currentUser={currentUserData}
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
