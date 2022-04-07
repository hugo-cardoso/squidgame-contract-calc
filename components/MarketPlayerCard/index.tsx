import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Player } from '../../types';
import styles from './styles.module.css';

type MarketPlayerCardProps = {
  player?: Player;
  loading?: boolean;
}

export const MarketPlayerCard = ({ player, loading = false }: MarketPlayerCardProps) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const getPlayerAttribute = (attribute: string) => {
    return player?.nft.metadata.attributes.find(({ key }) => key === attribute);
  }

  const parsePlayerSquidEnergy = (squidEnergy: string) => squidEnergy.split('/');

  const formatPrice = (price: string) => {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseInt(price));
  }
  
  const getUrl = () => {
    if (!player) return '';

    const { nft_contract, nft_id } = player;
    return `https://marketplace.biswap.org/card/${ nft_contract }/${ nft_id }`;
  }

  if (loading || !player) return <div className={styles.card}>
    <div className={styles.card__image}>
      <div className={styles['image-error']}></div>
    </div>
  </div>;

  const SquidEnergy = parsePlayerSquidEnergy(getPlayerAttribute('SquidEnergy')?.value || "0/0");

  return (
    <Link href={getUrl()}>
      <a className={styles.card} target="_blank">
        <div className={styles.card__image}>
          {
            imageError ? (
              <div className={styles['image-error']}>Not found</div>
            ) : (
              <Image
                src={player.nft.metadata.image}
                alt={player.nft.metadata.name}
                width={400}
                height={400}
                quality={100}
                layout="responsive"
                priority
                onError={() => setImageError(true)}
              />
            )
          }
        </div>
        <div className={styles.card__header}>
          <p className={styles.title}>#{ player.nft_id }</p>
          <p className={styles.price}>{ formatPrice(String(player.usdPrice)) }</p>
        </div>
        <div className={styles.card__attributes}>
          <div className={styles.attribute}>
            <div className={styles.attribute__image}>
              <Image
                src="/assets/images/se.svg"
                alt="SE"
                width={20}
                height={20}
              />
            </div>
            <p className={styles.attribute__text}>
              <span className={styles['attribute__text--higtlight']}>{ SquidEnergy[0] }</span>
              { ' / ' }
              { SquidEnergy[1] }
            </p>
          </div>
          <div className={styles.attribute}>
            <div className={styles.attribute__image}>
              <Image
                src="/assets/images/contract.png"
                alt="Contract"
                width={20}
                height={20}
              />
            </div>
            <p className={styles.attribute__text}>{ getPlayerAttribute("ContractDays")?.value }</p>
          </div>
          <div className={styles.attribute}>
            <div className={styles.attribute__image}>
              <Image
                src="/assets/images/star.svg"
                alt="Contract"
                width={18}
                height={18}
              />
            </div>
            <p className={styles.attribute__text}>{ getPlayerAttribute("Level")?.value.split("-")[0] }</p>
          </div>
        </div>
        {/* <div className={styles.card__attributes}>
          <div className={styles['card__attribute-name']}>#{player.nft_id}</div>
          <div className={styles['card__attribute-se']}>
            <div className={styles['card__attribute-se-text']}>
              <Image
                src="/assets/images/se.svg"
                alt="SE"
                width={20}
                height={20}
              />
              <p>
                <span className={styles['card__attribute-se-text--hightlight']}>{ SquidEnergy[0] }</span>
                {" / "}
                { SquidEnergy[1] }
              </p>
            </div>
            <div className={styles['card__attribute-se-text']}>
              <p>{ formatPrice(String(player.usdPrice)) }</p>
            </div>
          </div>
        </div> */}
      </a>
    </Link>
  )
}