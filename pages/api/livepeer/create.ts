import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@helper/prisma.server';
import axios from './axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, method } = req;

  switch (method) {
    case 'POST':
      try {
        const response = await axios.post('/stream', body);

        const data = response.data;

        const streamData = {
          id: data.id,
          key: data.streamKey,
        };

        const user = await prisma.user.update({
          where: { username: body.name },
          data: { stream: streamData },
        });

        res.status(201).json({ data, user });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
