import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@helper/prisma.server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await prisma.user.findUnique({
          where: { id: id as string },
          include: { media: true },
          // select: { media: true },
        });

        res.status(201).json({ data });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
