import { NextApiRequest, NextApiResponse } from 'next';

import { get } from 'lodash';
import FormData from 'form-data';

import { prisma } from '@helper/prisma.server';
import { getFileStream } from '@helper/awsS3';
import axios from './pinataAxios';

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

    case 'PATCH':
      try {
        if (!slug) {
          return res.status(400).json({ success: false, message: 'not found' });
        }

        const key = slug[0] + '/' + slug[1];
        const readStream = getFileStream(key);

        const formData = new FormData();
        formData.append('file', readStream, {
          filepath: body.key,
        });

        formData.append('pinataMetadata', `{"name": "${body.key}"}`);

        const response = await axios.post('/pinning/pinFileToIPFS', formData, {
          headers: {
            'Content-Type': `multipart/form-data`,
          },
        });
        const data = get(response, 'data');
        const ipfsHash = get(data, 'IpfsHash');

        const metadata = {
          name: body.title,
          description: body.description,
          image: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
          external_url: `http://livechain.vercel.app/nft/${body.id}`,
        };

        const result = await axios.post('/pinning/pinJSONToIPFS', metadata, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const metadataHash = get(result, 'data.IpfsHash');
        console.info('metadataHash', metadataHash);

        const nftData = {
          metadata,
          tokenURI: `https://gateway.pinata.cloud/ipfs/${metadataHash}`,
        };

        console.info('nftData', nftData);

        const media = await prisma.media.update({
          where: { id: body.id as string },
          data: { nftData },
        });

        res.status(200).json({ media });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
