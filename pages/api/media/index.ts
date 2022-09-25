import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@helper/prisma.server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  switch (method) {
    case 'POST':
      try {
        const media = await prisma.media.create({
          data: body,
        });

        res.status(201).json({ media });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
