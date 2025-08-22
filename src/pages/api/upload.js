import { create as ipfsHttpClient } from 'ipfs-http-client';

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfsClient = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: { authorization: auth },
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const file = req.body; // JSON payload
      const added = await ipfsClient.add(JSON.stringify(file));
      res.status(200).json({ cid: added.cid.toString() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
