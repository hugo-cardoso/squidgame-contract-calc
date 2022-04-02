import Image from 'next/image';
import styles from './Header.module.css';

export const Header = () => (
  <header className={styles.header}>
    <Image src={'/assets/images/logo.svg'} alt="Logo" width={168} height={53} />
  </header>
);
