import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from "react";
import styles from "./index.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "danger";
  };

const Button: FC<Props> = ({ children, variant = "primary", ...props }) => {
  const variantClassName = {
    primary: styles.primary,
    danger: styles.danger,
  }[variant];

  const className = [styles.button, variantClassName].join(" ");

  if (props.href) {
    return (
      <a className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;
