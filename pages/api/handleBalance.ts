// pages/api/handleBalance.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import fetch from 'node-fetch';

const agent = new https.Agent({
  rejectUnauthorized: false, // To ignore SSL certificate errors for debugging
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Request received:', req.method, req.url);

  try {
    console.log('Fetching data from external API...');
    const response = await fetch('https://v2.base-borderless.com/api/transactions', {
      method: 'GET',
      agent: agent, // The agent to ignore SSL errors
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error occurred during fetch:', error);

    if (error instanceof Error) {
      console.error('Error details:', error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } else {
      console.error('Unknown error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error', details: 'An unknown error occurred' });
    }
  }
};

export default handler;
