import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { get, identity, pickBy } from 'lodash';
import type { GetServerSideProps } from 'next';

import { Dashboard as DashboardUI } from '@components/index';
import { streamApi, userApi } from '@services/index';
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

  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <>
      <DashboardUI
        user={userData}
        isLoading={isLoading}
        handleUpdateUser={updateUser}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const address = get(req, 'cookies.address');

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
