import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Input } from '../Input';
import styles from './styles.module.css';

enum FormFieldsNames {
  SquidEnergy = "SquidEnergy",
  BswPrice = "BswPrice",
  Duration = "Duration",
}

type FormElements = Record<FormFieldsNames, HTMLInputElement> & HTMLFormElement;

export const ContractCalculatorCard = () => {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);
  const [bswPrice, setBswPrice] = useState<number>(0);

  const updateBswPrice = async () => {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BSWBUSD');
    const data = await response.json();
    setBswPrice(data.price);
  };

  const handleFormSubmit = (event: React.FormEvent<FormElements>) => {
    event.preventDefault();

    const { SquidEnergy, BswPrice, Duration } = event.currentTarget;

    const seCost = 0.0025;
    const percentualDiscont = 5;

    const result = (Number(SquidEnergy.value) * Number(Duration.value) * seCost) * (1 - (percentualDiscont / 100));
    setResult(result);
    setShowResult(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateBswPrice();
    }, 5000);
    updateBswPrice();

    return () => clearInterval(interval);
  }, [])

  return (
    <div className={styles.card}>
      <form
        name="calculatorForm"
        className={styles.form}
        onSubmit={handleFormSubmit}
      >
        <Input
          name={FormFieldsNames.SquidEnergy}
          label="Squid Energy"
          type="number"
          required
        />
        <Input
          name={FormFieldsNames.BswPrice}
          label="BSW Price ($)"
          type="number"
          value={Number(bswPrice)}
          float
          readonly
        />
        <div className={styles.days}>
          <label className={styles.days__label}>Contract duration (days)</label>
          <div className={styles.days__options}>
            <label className={styles.days__option}>
              <span className={styles['days__option-text']}>15</span>
              <input type="radio" name={FormFieldsNames.Duration} value="15"/>
            </label>
            <label className={styles.days__option}>
              <span className={styles['days__option-text']}>30</span>
              <input type="radio" name={FormFieldsNames.Duration} value="30" defaultChecked/>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={styles.button}
        >
          Calculate
        </button>
      </form>
      {showResult && (
        <div className={styles.result}>
          <div className={styles.result__col}>~ <Image src="/assets/images/bsw.svg" width={20} height={20} alt="BSW Logo" /> {result}</div>
          <div className={styles.result__col}>~ $ {Number(result * bswPrice).toFixed(2)}</div>
        </div>
      )}
    </div>
  );
};
