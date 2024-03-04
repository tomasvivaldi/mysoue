// pages/api/graphql.js

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Forward the request to the GraphQL server

  console.log(`***`);
  console.log(`API Key: ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`);
  console.log(`***`);
  const response = await fetch(
    "https://pertuis.stepzen.net/api/getting-started/__graphql",
    {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    }
  );

  const data = await response.json();
  res.status(response.status).json(data);
}
