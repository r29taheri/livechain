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
        const { field, value, address } = body;
        const exists = await prisma.user.findUnique({
          where: { [field]: value as string },
        });

        if (exists && exists.address !== address) {
          return res.status(400).json({
            message: `a user is already exists with that ${field}`,
          });
        }

        res.status(201).json({ valid: true });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
