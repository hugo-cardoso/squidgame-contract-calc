import type { NextPage } from 'next';
import Head from 'next/head';
import { FormEvent, MouseEvent, useContext, useRef, useState } from 'react';

import styles from '../styles/Market.module.css'
import { MarketContext, MarketContextProvider } from '../contexts/marketContext';
import Image from 'next/image';
import { Player } from '../types';
import { MarketPlayerCard } from '../components/MarketPlayerCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const Market: NextPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { players, page, loading, error, setPage, updatePlayers } = useContext(MarketContext);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);

  const scrollToMain = () => {
    if (mainRef.current) {
      mainRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  const handleClickPrevPageBtn = () => {
    if (page > 1) {
      setPage(page - 1);
      scrollToMain();
    };
  }

  const handleClickNextPageBtn = () => {
    setPage(page + 1);
    scrollToMain();
  }

  const handleClickRefresh = () => {
    updatePlayers(page);
    scrollToMain();
  }

  const handleSubmitFilterForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsOpenFilterModal(false);
    scrollToMain();
  }

  const buildShowroom = () => {
    if (error) {
      return (
        <div className={styles.showroom__error}>
          <p>Something went wrong.</p>
          <Button
            label="Try again"
            onClick={() => updatePlayers(page)}
          />
        </div>
      )
    }

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
      <main ref={mainRef} className={styles.main}>
        <div className={styles.container}>
          {
            isOpenFilterModal && (
              <div className={styles['filter-wrapper']}>
                <form className={styles.filter} onSubmit={handleSubmitFilterForm}>
                  <div className={styles.filter__header}>
                    <div className={styles.filter__title}>Filters</div>
                    <button className={styles.filter__close} onClick={() =>  setIsOpenFilterModal(false)}>
                      <Image src="/assets/images/close.svg" width={24} height={24} alt="Close"/>
                    </button>
                  </div>
                  <Input type='number' label='Min price ($)' placeholder='0'/>
                  <Input type='number' label='Max price ($)' placeholder='0'/>
                  <Input type='number' label='Min SE' placeholder='0'/>
                  <Input type='number' label='Max SE' placeholder='0'/>
                  <Button type='submit' label='Apply filters' color="primary"/>
                </form>
              </div>
            )
          }
          <div className={styles['filter-bar']}>
            <h2 className={styles.title}>Recents</h2>
            <div className={styles['filter-bar__buttons']}>
              <Button label='Refresh' onClick={handleClickRefresh}/>
              <Button label='Open filters' color='primary' onClick={() => setIsOpenFilterModal(true)}/>
            </div>
          </div>
          <div className={`${ styles.showroom } ${ error && styles['showroom--error'] }`}>{ buildShowroom() }</div>
          { 
            !error && (
              <div className={styles.pagination}>
                <Button onClick={handleClickPrevPageBtn} label="Prev" disabled={page === 1}/>
                <p className={styles.pagination__number}>{ page }</p>
                <Button onClick={handleClickNextPageBtn} label="Next"/>
              </div>
            )  
          }
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