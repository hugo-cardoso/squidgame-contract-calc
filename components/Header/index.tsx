import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

const MENU_ITEMS = [
  {
    label: 'Contract Calculator',
    href: '/contract-calc',
  },
  {
    label: 'Market',
    href: '/market',
  }
]

export const Header = () => {
  const { asPath } = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <Image src={'/assets/images/logo.svg'} alt="Logo" width={168} height={53} />
      </div>
      <nav className={styles.header__menu}>
        <ul className={styles['header__menu-items']}>
          {
            MENU_ITEMS.map(({ label, href }) => (
              <li
                key={label}
                className={`${styles['header__menu-item']} ${ asPath === href ? styles['header__menu-item--active'] : '' }`}
              >
                <Link href={href}>
                  <a>{ label }</a>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
};
