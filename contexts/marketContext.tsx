import axios, { AxiosPromise } from 'axios';
import { createContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { Player } from '../types';

type FetchPlayersResponse = {
  data: Player[];
};

type MarketContextStates = {
  players: Player[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  updatePlayers: (page: number) => void,
  error: boolean;
};

type MarketContextProviderProps = {
  children: ReactNode;
};

const DEFAULT_STATE: MarketContextStates = {
  players: [],
  loading: true,
  page: 1,
  setPage: () => {},
  updatePlayers: () => {},
  error: false,
};

export const MarketContext = createContext<MarketContextStates>(DEFAULT_STATE);

export const MarketContextProvider = ({ children }: MarketContextProviderProps) => {

  const [players, setPlayers] = useState<Player[]>(DEFAULT_STATE.players);
  const [loading, setLoading] = useState<boolean>(DEFAULT_STATE.loading);
  const [error, setError] = useState<boolean>(DEFAULT_STATE.error);
  const [page, setPage] = useState<number>(DEFAULT_STATE.page);

  const fetchPlayers = (page: number): AxiosPromise<FetchPlayersResponse> => {
    return axios({
      url: '/api/market/players',
      params: {
        page: page - 1,
      }
    });
  };

  const updatePlayers = useCallback(async (page: number) => {
    setLoading(false);
    setLoading(true);
    try {
      const { data: { data: players} } = await fetchPlayers(page);
      setPlayers(players);
      setLoading(false);
    } catch(e) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    updatePlayers(page);
  }, [updatePlayers, page]);

  return (
    <MarketContext.Provider value={{ players, error, loading, page, setPage, updatePlayers }}>
      {children}
    </MarketContext.Provider>
  );
};
