import 'dotenv/config';

const apiKey = process.env.API_ACCESS_TOKEN;
const clientId = process.env.API_CLIENT_ID;
const baseUrl = 'https://api.igdb.com/v4/';

export const fetchFromApi = async (endpoint, body) => {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Client-ID': clientId,
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });

  return await response.json();
};
