import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useToast } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import type { GetServerSideProps } from 'next';
import { get, identity, omit, pickBy } from 'lodash';

import { assetApi, mediaApi, streamApi, userApi } from '@services/index';
import { Dashboard as DashboardUI } from '@components/index';
import { getFileType } from '@helper/getFileType';
import getVideoCover from '@helper/getVideoCover';
import { prisma } from '@helper/prisma.server';
import { User } from '@prisma/client';

interface Props {
  user: User;
}

const Dashboard = ({ user }: Props) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<Partial<User>>({});

  const updateUser = async (data: Partial<User>) => {
    setIsLoading(true);
    try {
      const notEmptyData = pickBy(data, identity);
      const response = await userApi.update(notEmptyData, user.address);
      let updatedData = get(response, 'data.user', {});
      if (!user.stream?.key) {
        const streamRes = await streamApi.create({
          name: updatedData.username,
        });
        updatedData = get(streamRes, 'data.user', {});
      }
      setUserData(updatedData);
      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        title: 'Account updated.',
      });
    } catch (err) {
      console.error(err);
      toast({
        duration: 5000,
        status: 'error',
        isClosable: true,
        title: 'Something went wrong.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (data: FieldValues) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', data.file);
    const type = getFileType(data.file.type);
    let thumbnailKey: string;

    // If type is video then generate a thumbnail and store it
    if (type === 'video') {
      const thumbnail = await getVideoCover(data.file);
      const formData = new FormData();
      formData.append('file', thumbnail as Blob);
      const res = await assetApi.create(formData);
      thumbnailKey = res?.data?.key;
    }

    try {
      const assetRes = await assetApi.create(formData);
      const key = assetRes?.data?.key;
      if (key) {
        await mediaApi.create({
          ...omit(data, 'file'),
          key,
          type,
          ownerId: user.id,
          thumbnail: thumbnailKey,
        });
      }

      toast({
        duration: 5000,
        isClosable: true,
        status: 'success',
        title: 'Media uploaded successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        duration: 5000,
        status: 'error',
        isClosable: true,
        title: 'Something went wrong.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardUI
        user={userData}
        isLoading={isLoading}
        handleUpload={handleUpload}
        handleUpdateUser={updateUser}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const address = get(req, 'cookies.address');

  if (!address) {
    return {
      notFound: true,
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};

export default Dashboard;
