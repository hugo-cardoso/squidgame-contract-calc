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
  const [imageQuality, setImageQuality] = useState<number>(30);
  const [imageSize, setImageSize] = useState<number>(250);

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

  const handelOnLoadImage = () => {
    setImageQuality(100);
    setImageSize(400);
  }

  if (loading || !player) return <div className={styles.card}></div>;

  return (
    <Link href={getUrl()}>
      <a className={styles.card} target="_blank">
        <div className={styles.card__image}>
          <Image
            src={player.nft.metadata.image}
            alt={player.nft.metadata.name}
            width={imageSize}
            height={imageSize}
            quality={imageQuality}
            onLoad={handelOnLoadImage}
          />
        </div>
        <div className={styles.card__attributes}>
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
                <span className={styles['card__attribute-se-text--hightlight']}>{ parsePlayerSquidEnergy(getPlayerAttribute("SquidEnergy")?.value || "0/0")[0] }</span> / 
                { parsePlayerSquidEnergy(getPlayerAttribute("SquidEnergy")?.value || "0/0")[1] }
              </p>
            </div>
            <div className={styles['card__attribute-se-text']}>
              <p>{ formatPrice(String(player.usdPrice)) }</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}