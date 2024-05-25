import { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const response = await fetch('https://v2.base-borderless.com/api/transactions', {
      headers: {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching data from external API' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
