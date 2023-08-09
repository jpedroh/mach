import { FC, InputHTMLAttributes } from "react";
import styles from "./index.module.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<Props> = ({ ...props }) => {
  return <input className={styles.input} {...props} />;
};

export default FormInput;
