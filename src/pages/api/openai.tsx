//src/pages/api/openai.tsx
import type { NextApiRequest, NextApiResponse } from 'next';

type ChatbotResponse = {
  reply: string;
};

type ChatbotError = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatbotResponse | ChatbotError>,
) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body as { message: string };

      const response = await callOpenAI(message);
      res.status(200).json({ reply: response });
    } catch (error) {
      res.status(500).json({ error: 'Error processing your request' });
    }
  } else {
    res.status(405).end();
  }
}

async function callOpenAI(message: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
