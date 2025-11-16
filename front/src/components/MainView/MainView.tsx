import TodaysPointView from "../TodaysPointView/TodaysPointView";
import styles from "./MainView.module.css";
import HistoryCardListView from "../HistoryCardListView/HistoryCardListView";

export default function MainView({ todayPoint }: { todayPoint: number }) {
  return (
    <main className={styles.main}>
      <TodaysPointView todayPoint={todayPoint} />
      <HistoryCardListView />
    </main>
  );
}


