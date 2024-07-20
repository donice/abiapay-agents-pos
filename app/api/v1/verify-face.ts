import { NextApiRequest, NextApiResponse } from 'next';
import { FaceClient } from '@azure/cognitiveservices-face';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

const key = process.env.AZURE_FACE_API_KEY as string;
const endpoint = process.env.AZURE_FACE_API_ENDPOINT as string;

const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new FaceClient(credentials, endpoint);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { imageSrc } = req.body;

    const imageBuffer = Buffer.from(imageSrc.split(',')[1], 'base64');

    try {
      const detectedFaces = await client.face.detectWithStream(imageBuffer);
      res.status(200).json({ isFace: detectedFaces.length > 0 });
    } catch (error) {
      console.error('Error detecting face:', error);
      res.status(500).json({ error: 'Error detecting face' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
