import axios, { AxiosPromise } from 'axios';
import { createContext, useEffect, useState, ReactNode } from 'react';
import type { Player } from '../types';

type FetchPlayersResponse = {
  data: Player[];
};

type MarketContextStates = {
  players: Player[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
};

type MarketContextProviderProps = {
  children: ReactNode;
};

const DEFAULT_STATE: MarketContextStates = {
  players: [],
  loading: true,
  page: 1,
  setPage: () => {},
};

export const MarketContext = createContext<MarketContextStates>(DEFAULT_STATE);

export const MarketContextProvider = ({ children }: MarketContextProviderProps) => {

  const [players, setPlayers] = useState<Player[]>(DEFAULT_STATE.players);
  const [loading, setLoading] = useState<boolean>(DEFAULT_STATE.loading);
  const [page, setPage] = useState<number>(DEFAULT_STATE.page);

  const fetchPlayers = (page: number): AxiosPromise<FetchPlayersResponse> => {
    return axios({
      url: '/api/market/players',
      params: {
        page,
      }
    });
  }

  useEffect(() => {
    const updatePlayers = async () => {
      setLoading(true);
      const { data: { data: players} } = await fetchPlayers(page);
      setPlayers(players);
      setLoading(false);
    };

    updatePlayers();
  }, [page]);

  return (
    <MarketContext.Provider value={{ players, loading, page, setPage }}>
      {children}
    </MarketContext.Provider>
  );
};
