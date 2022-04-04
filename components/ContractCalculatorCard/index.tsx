import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../Input';
import { InputRadio } from '../InputRadio';
import styles from './styles.module.css';

const SQUID_ENERGY_COST = 0.0025;
const PERCENTUAL_DISCOUNT = 5;

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
  const [bswLoading, setBswLoading] = useState<boolean>(true);
  const resultRef = useRef<HTMLDivElement>(null);

  const updateBswPrice = async () => {
    setBswLoading(true);
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BSWBUSD');
    const data = await response.json();
    setBswPrice(data.price);
    setBswLoading(false);
  };

  const sendGAEvent = ({ action, category, label }: Record<string, string>) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  };

  const calculateContract = (squidEnergy: number, duration: number) => {
    return (squidEnergy * duration * SQUID_ENERGY_COST) * (1 - (PERCENTUAL_DISCOUNT / 100));
  };

  const handleFormSubmit = (event: React.FormEvent<FormElements>) => {
    event.preventDefault();

    const { SquidEnergy, Duration } = event.currentTarget;

    const result = calculateContract(Number(SquidEnergy.value), Number(Duration.value));
    setResult(result);
    setShowResult(true);

    sendGAEvent({
      action: 'calculate',
      category: 'contract',
      label: 'calculate',
    });
    
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
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
          loader={bswLoading}
          placeholder="0"
          float
          readonly
          required
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
        <div className={styles.result} ref={resultRef}>
          <div className={styles.result__col}>~ <Image src="/assets/images/bsw.svg" width={20} height={20} alt="BSW Logo" /> {result}</div>
          <div className={styles.result__col}>~ $ {Number(result * bswPrice).toFixed(2)}</div>
        </div>
      )}
      <p className={styles.phormula}>(SE * { SQUID_ENERGY_COST } BSW) * CONTRACT_DURATION - { PERCENTUAL_DISCOUNT }%</p>
    </div>
  );
};
