import styles from "./Card.module.css";

interface CardProps {
  label: string;
  value: string;
}

export default function Card({ label, value }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
