import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@helper/prisma.server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { address },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const exists = await prisma.user.findUnique({
          where: { address: address as string },
        });

        if (!exists) {
          return res.status(404).json({
            message: 'User not found',
          });
        }

        res.status(201).json(exists);
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    case 'POST':
      try {
        const exists = await prisma.user.findUnique({
          where: { address: address as string },
        });

        if (exists && exists.address !== address) {
          return res.status(400).json({
            message: 'User already exists',
          });
        }

        const user = await prisma.user.update({
          where: { address: address as string },
          data: body,
        });

        res.status(201).json({ user });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
