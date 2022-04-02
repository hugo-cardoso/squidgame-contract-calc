import styles from "./Input.module.css";

type InputProps = {
  name?: string;
  label?: string;
  type?: "text" | "number";
  required?: boolean;
  float?: boolean;
  readonly?: boolean;
  value?: string | number;
};

export const Input = ({
  name = "",
  label = "",
  type = "text",
  required = false,
  float = false,
  readonly = false,
  value = ""
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
      <input
        name={name}
        type={type}
        className={styles.input}
        required={required}
        readOnly={readonly}
        {...generateAttrs()}
      />
    </div>
  )
}
