import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query;

  const players = await axios({
    url: `https://marketplace.biswap.org/back/offers/sellings?sortBy=newest&userAddress=no-address&page=${ page }&partner=61be229e6b84d59feeb0366c`,
    method: 'POST',
    data: JSON.stringify({filter: null})
  })
  res.status(200).json(players.data)
};
