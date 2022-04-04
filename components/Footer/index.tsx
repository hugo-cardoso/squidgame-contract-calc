import Image from 'next/image';
import styles from './styles.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles['text-block']}>
      <p>To support future development of the site, BEP-20 Donations are Appreciated!:</p>
      <p className={styles.highlight}>0x169cfCc05EE609eE997b0382a3720C63cF6F86ad</p>
    </div>
    <div className={styles['text-block']}>
      <p>This site is not affiliated with Biswap or Binance. Should be used for informational purposes only and should not be considered investment or financial advice.</p>
    </div>
    <div className={styles['text-block']}>
      <a href="https://github.com/hugo-cardoso/squidgame-contract-calc" target="_blank" rel="noreferrer" >
        <Image src="/assets/images/github.svg" width={30} height={30} alt="Github" />
      </a>
    </div>
  </footer>
)