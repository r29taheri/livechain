import { NextApiRequest, NextApiResponse } from 'next';

import { getFileStream } from '@helper/awsS3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { key },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const readStream = getFileStream(key as string);

        readStream.pipe(res);
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
