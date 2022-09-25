import Cookies from 'cookies';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const cookies = new Cookies(req, res);

  switch (method) {
    case 'GET':
      try {
        cookies.set('address', '', {
          httpOnly: false,
        });

        res.status(201).json({ message: 'logged out successfully' });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
