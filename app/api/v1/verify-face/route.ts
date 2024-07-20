import { NextApiRequest, NextApiResponse } from 'next';
import { FaceClient } from '@azure/cognitiveservices-face';
import { ApiKeyCredentials } from '@azure/ms-rest-js';

const key = process.env.NEXT_PUBLIC_AZURE_FACE_API_KEY as string;
const endpoint = process.env.NEXT_PUBLIC_AZURE_FACE_API_ENDPOINT as string;

const credentials = new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new FaceClient(credentials, endpoint);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("REQUEST BODY", req.body.imageSrc);

  const { imageSrc } = req.body;

  if (!imageSrc) {
    console.log("Unauthorized: imageSrc is required");
    return res.status(401).json({ error: 'Unauthorized: imageSrc is required' });
  }

  try {
    const imageBuffer = Buffer.from(imageSrc.split(',')[1], 'base64');
    const detectedFaces = await client.face.detectWithStream(imageBuffer);
    res.status(200).json({ isFace: detectedFaces.length > 0 });
  } catch (error) {
    console.error('Error detecting face:', error);
    res.status(500).json({ error: 'Error detecting face, please try again' });
  }
}
