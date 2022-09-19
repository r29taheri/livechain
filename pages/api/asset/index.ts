import { NextApiRequest, NextApiResponse } from 'next';

import formidable, { File } from 'formidable';

import { uploadFile } from '@helper/awsS3';

async function uploadForm(req: NextApiRequest) {
  const data = await new Promise(function (resolve, reject) {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  return data;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const files: any = await uploadForm(req);
        const file = files.files.file;
        console.info('file', file);
        const resFile = await uploadFile(file);
        console.info('resFile', resFile);

        res.status(201).json({ key: resFile.Key });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
