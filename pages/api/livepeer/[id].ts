import { NextApiRequest, NextApiResponse } from 'next';

import axios from './axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const response = await axios.get(`/stream/${id}`);
        const data = response.data;

        res
          .status(200)
          .json({ isActive: data.isActive, playbackId: data.playbackId });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
