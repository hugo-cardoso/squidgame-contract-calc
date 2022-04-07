import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useEffect } from 'react';

import styles from '../styles/Market.module.css'
import { MarketContext, MarketContextProvider } from '../contexts/marketContext';
import Image from 'next/image';
import { Player } from '../types';
import { MarketPlayerCard } from '../components/MarketPlayerCard';
import { Button } from '../components/Button';

const Market: NextPage = () => {
  const { players, page, loading, setPage } = useContext(MarketContext);

  const handleClickPrevPageBtn = () => {
    if (page > 1) setPage(page - 1);
  }

  const handleClickNextPageBtn = () => {
    setPage(page + 1);
  }

  const buildShowroom = () => {
    if (loading) {
      return new Array(12)
        .fill(0)
        .map((_, index) => <MarketPlayerCard key={index} loading />)
    }

    return players.map(player => <MarketPlayerCard key={player._id} player={player} />);
  }

  return (
    <>
      <Head>
        <title>Squid NFT World - Market</title>
        <meta name="description" content="Market for Squid NFT World (Play to Earn) on BNB Chain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.showroom}>{ buildShowroom() }</div>
          <div className={styles.pagination}>
            <Button onClick={handleClickPrevPageBtn} label="Prev" disabled={page === 1}/>
            <p className={styles.pagination__number}>{ page }</p>
            <Button onClick={handleClickNextPageBtn} label="Next"/>
          </div>
        </div>
      </main>
    </>
  )
};

const MarketPage = () => (
  <MarketContextProvider>
    <Market />
  </MarketContextProvider>
);

export default MarketPage;