import styles from "./TodaysPointView.module.css";

export default function TodaysPointView({
  todayPoint,
}: {
  todayPoint: number;
}) {
  return (
    <div className={styles.todaysPointView}>
      <h2 className={styles.text}>今日のポイント</h2>
      <span className={styles.point}>{todayPoint}pt</span>
    </div>
  );
}
