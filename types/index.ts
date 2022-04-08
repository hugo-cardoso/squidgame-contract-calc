export type Player = {
  _id: string;
  price: string;
  nft_contract: string;
  deal_token: string;
  currency: string;
  nft_id: number;
  nft_db_id: string;
  user: string;
  offer_id: number;
  side: number;
  partner_db_id: string;
  collection_db_id: any;
  status: string;
  createdAt: string;
  nft: {
    _id: string;
    partner_db_id: string;
    collection_db_id: any;
    token_id: number;
    token_address: string;
    token_db_id: string;
    metadata: {
      name: string;
      description: string;
      image: string;
      attributes: {
        key: string;
        value: string;
      }[]
    }
  };
  partner: {
    _id: string;
    name: string;
    url: string;
    image: {
      big: string;
      middle: string;
      small: string;
    };
    order: number;
    partner: number;
    address: string;
    listingDate: string;
  };
  isFavorite: boolean;
  usdPrice: number;
}

export type SearchFilter = {
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
