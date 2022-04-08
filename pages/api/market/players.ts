import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { SearchFilter } from '../../../types';

type Body = {
  filter: SearchFilter;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    page,
    minPrice,
    maxPrice,
  } = req.query;

  const body: Body = {
    filter: {
      levels: [],
      onlyBoosted: false,
      robiBoost: {from: 0, to: 0},
      currencies: [],
      usdRange: {from: Number(minPrice) || 0, to: Number(maxPrice) || 9999 }
    }
  }

  const players = await axios({
    url: 'https://marketplace.biswap.org/back/offers/sellings',
    params: {
      sortBy: 'newest',
      userAddress: 'no-address',
      page: page,
      partner: '61be229e6b84d59feeb0366c'
    },
    method: 'POST',
    data: body,
  })
  res.status(200).json(players.data)
};
