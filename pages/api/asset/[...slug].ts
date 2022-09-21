import { NextApiRequest, NextApiResponse } from 'next';

import { getFileStream } from '@helper/awsS3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { slug },
  } = req;

  switch (method) {
    case 'GET':
      try {
        if (!slug) {
          return res.status(400).json({ success: false, message: 'not found' });
        }
        const key = slug[0] + '/' + slug[1];
        const readStream = getFileStream(key);

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
