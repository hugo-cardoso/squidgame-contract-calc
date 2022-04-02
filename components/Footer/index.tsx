import styles from './styles.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles['text-block']}>
      <p>To support future development of the site, BEP-20 Donations are Appreciated!:</p>
      <p className={styles.highlight}>0x169cfCc05EE609eE997b0382a3720C63cF6F86ad</p>
    </div>
    <div className={styles['text-block']}>
      <p>This site use Binance API to provide BSW price.</p>
    </div>
    <div className={styles['text-block']}>
      <p>This site is not affiliated with Biswap. You and should be used for informational purposes only and not to be considered investment or financial advice.</p>
    </div>
  </footer>
)