import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@helper/prisma.server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;
  const cookies = new Cookies(req, res);

  switch (method) {
    case 'POST':
      try {
        const { address } = body as { address: string };

        let user = await prisma.user.findUnique({ where: { address } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              address,
            },
          });
        }

        cookies.set('address', address, {
          httpOnly: true,
        });

        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
