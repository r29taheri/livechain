import { NextApiRequest, NextApiResponse } from 'next';

import { includes } from 'lodash';

import { prisma } from '@helper/prisma.server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  switch (method) {
    case 'PATCH':
      try {
        const { followerId, followingId } = body;

        const followinUser = await prisma.user.findUnique({
          where: { id: followingId },
          select: { followedByIDs: true },
        });

        const allreadyFollow = includes(
          followinUser?.followedByIDs,
          followerId
        );

        const followerUser = await prisma.user.findUnique({
          where: { id: followerId },
          select: { followingIDs: true },
        });

        const follower = await prisma.user.update({
          where: { id: followerId },
          data: {
            followingIDs: allreadyFollow
              ? {
                  set: followerUser?.followingIDs.filter(
                    (id: string) => id !== followingId
                  ),
                }
              : { push: followingId },
          },
        });

        const following = await prisma.user.update({
          where: { id: followingId },
          data: {
            followedByIDs: allreadyFollow
              ? {
                  set: followinUser?.followedByIDs.filter(
                    (id: string) => id !== followerId
                  ),
                }
              : { push: followerId },
          },
        });

        res.status(201).json({ follower, following });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
