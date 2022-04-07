import styles from './styles.module.css';

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>{ label }</button>
  )
}
