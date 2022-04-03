import styles from './styles.module.css';

type Option = {
  label: string;
  value: string;
  checked?: boolean;
}

type InputRadioProps = {
  label: string;
  name: string;
  options: Option[];
}

export const InputRadio = (props: InputRadioProps) => (
  <div className={styles.wrapper}>
    <label className={styles.wrapper__label}>{props.label}</label>
    <div className={styles.options}>
      {
        props.options.map(option => (
          <label
            key={option.label}
            className={styles.option}
          >
            <span className={styles.option__text}>{option.label}</span>
            <input
              className={styles.option__input}
              type="radio"
              name={props.name}
              value={option.value}
              defaultChecked={option.checked || false}
            />
          </label>
        ))
      }
    </div>
  </div>
);
