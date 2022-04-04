import styles from "./styles.module.css";

type InputProps = {
  name?: string;
  label?: string;
  type?: "text" | "number";
  required?: boolean;
  float?: boolean;
  readonly?: boolean;
  value?: string | number;
  placeholder?: string;
  loader?: boolean;
};

export const Input = ({
  name = "",
  label = "",
  type = "text",
  required = false,
  float = false,
  readonly = false,
  value = "",
  placeholder = "",
  loader = false,
}: InputProps) => {

  const generateAttrs = () => {
    let attrs = {};

    if (value) attrs = { ...attrs, defaultValue: value };

    if (type === "number") attrs = { ...attrs, min: "1" };

    if (type === "number" && float) attrs = { ...attrs, step: "0.01" };

    return attrs;
  }

  return (
    <div className={styles['input-wrapper']}>
      <label className={styles.label}>{ label }</label>
      <div className={styles['field-wrapper']}>
      <div className={`${styles.loader} ${ loader && styles['loader--active'] }`} />
        <input
          name={name}
          type={type}
          className={styles.input}
          required={required}
          readOnly={readonly}
          placeholder={placeholder}
          {...generateAttrs()}
        />
      </div>
    </div>
  )
}
