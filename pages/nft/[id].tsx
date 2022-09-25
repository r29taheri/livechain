import Head from 'next/head';
import { get } from 'lodash';
import type { GetServerSideProps } from 'next';

import { prisma } from '@helper/prisma.server';
import { NftCard } from '@components/NftCard';
import { Media, User } from '@prisma/client';

interface MediaWithUser extends Media {
  owner: User;
}

interface Props {
  media: MediaWithUser;
}

const Livestream = ({ media }: Props) => (
  <>
    <Head>
      <title>{`${media.title} NFT`}</title>
    </Head>
    <NftCard data={media} />
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = get(params, 'id') as string;

  const media = await prisma.media.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
    },
  });

  if (!media) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      media: JSON.parse(JSON.stringify(media)),
    },
  };
};

export default Livestream;
