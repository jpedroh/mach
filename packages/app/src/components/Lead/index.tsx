import { FC, ReactNode } from "react";
import styles from "./index.module.css";

const Lead: FC<{ children: ReactNode }> = ({ children }) => {
  return <p className={styles.lead}>{children}</p>;
};

export default Lead;
