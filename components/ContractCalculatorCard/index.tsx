import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Input } from '../Input';
import { InputRadio } from '../InputRadio';
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
          placeholder="0"
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
        <InputRadio
          name={FormFieldsNames.Duration}
          label="Contract duration (days)"
          options={[
            { label: "15", value: "15" },
            { label: "30", value: "30", checked: true },
          ]}
        />
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
