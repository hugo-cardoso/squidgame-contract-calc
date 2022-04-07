import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ContractCalculatorCard } from '../components/ContractCalculatorCard';

const ContractCalc: NextPage = () => {

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Squid NFT World - Contract Calculator</title>
          <meta name="description" content="Contract calculator for Squid NFT World (Play to Earn) on BNB Chain" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <ContractCalculatorCard />
        </main>
      </div>
    </>
  )
}

export default ContractCalc