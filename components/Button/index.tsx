import styles from './styles.module.css';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  color?: 'default' | 'primary';
}

export const Button = ({ label, type = 'button', onClick = () => {}, disabled = false, color = 'default' }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`
        ${styles.button}
        ${styles[`button--${color}`]}
      `}
      onClick={onClick}
      disabled={disabled}
    >{ label }</button>
  )
}
