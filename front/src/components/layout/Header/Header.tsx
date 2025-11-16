import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>FitQuest</h1>
      <div className={styles.info}>🔔</div>
      <div className={styles.icon}>👨</div>
    </header>
  );
}
