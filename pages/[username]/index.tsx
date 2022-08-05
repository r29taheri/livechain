import { useCallback, useEffect, useState } from 'react';

import { get } from 'lodash';
import type { GetServerSideProps } from 'next';

import { Stream, Spinner } from '@components/index';
import { prisma } from '@helper/prisma.server';
import { streamApi } from '@services/index';
import { User } from '@prisma/client';

interface StreamData {
  isActive: boolean;
  playbackId: string;
}

interface Props {
  user: User;
}

const Livestream = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    getStreamData();
  }, [getStreamData]);

  if (isLoading) return <Spinner />;

  return <Stream data={data} refetch={getStreamData} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const username = get(params, 'username') as string;

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

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};

export default Livestream;
