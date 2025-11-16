import TodaysPointView from "../TodaysPointView/TodaysPointView";
import styles from "./MainView.module.css";

export default function MainView({ todayPoint }: { todayPoint: number }) {
  return (
    <main className={styles.main}>
      <TodaysPointView todayPoint={todayPoint} />
    </main>
  );
}
