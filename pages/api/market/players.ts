import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  filter: {
    levels: [];
    currencies: [];
    onlyBoosted: boolean;
    robiboost: {
      from: number;
      to: number;
    };
    usdRange: {
      from: number;
      to: number;
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page } = req.query || 1;

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
        from: 0,
        to: 9999,
      },
    }
  }

  const players = await axios({
    url: `https://marketplace.biswap.org/back/offers/sellings?sortBy=newest&userAddress=no-address&page=${ Number(page) - 1 }&partner=61be229e6b84d59feeb0366c`,
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
