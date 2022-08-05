import { get } from 'lodash';
import type { GetServerSideProps } from 'next';

import { Broadcast as BroadcastUI } from '@components/index';
import { prisma } from '@helper/prisma.server';
import { User } from '@prisma/client';

interface Props {
  user: User;
}

const Broadcast = ({ user }: Props) => <BroadcastUI user={user} />;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const address = get(req, 'cookies.address');

  const user = await prisma.user.findUnique({
    where: {
      address,
    },
  });

  if (!user || !user.stream) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};

export default Broadcast;
