import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "cancel";
}

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const className = `${styles.base} ${styles[variant]}`;

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
