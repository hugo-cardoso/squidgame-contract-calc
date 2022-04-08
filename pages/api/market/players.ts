import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { SearchFilter } from '../../../types';

type Body = {
  filter: SearchFilter;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    page = 0,
    minPrice = 0,
    maxPrice = 9999,
  } = req.query;

  const body: Body = {
    filter: {
      levels: [],
      currencies: [],
      onlyBoosted: false,
      robiboost: {
        from: 0,
        to: 0,
      },
      usdRange: {
        from: Number(minPrice),
        to: Number(maxPrice),
      },
    }
  }

  const players = await axios({
    url: `https://marketplace.biswap.org/back/offers/sellings?sortBy=newest&userAddress=no-address&page=${ page }&partner=61be229e6b84d59feeb0366c`,
    method: 'POST',
    data: JSON.stringify(body),
    headers: {
      pragma: 'no-cache',
      "cache-control": 'no-cache',
      origin: "https://marketplace.biswap.org"
    }
  })
  res.status(200).json(players.data)
};
