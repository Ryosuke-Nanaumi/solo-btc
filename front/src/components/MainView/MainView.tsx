import TodaysPointView from "../TodaysPointView/TodaysPointView";
import styles from "./module/MainView.module.css";
import HistoryCardListView from "../HistoryCardListView/HistoryCardListView";
import TotalRankingView from "./TotalRankingView";
import type { DisplayedRankingUser } from "../../types/view/displayedRanking";

interface MainViewProps {
  todayPoint: number;
  ranking: DisplayedRankingUser[];
}

export default function MainView({ todayPoint, ranking }: MainViewProps) {
  return (
    <main className={styles.main}>
      <TodaysPointView todayPoint={todayPoint} />
      <HistoryCardListView />
      <button className={styles.addTrainingButton}>
        + トレーニングを記録する
      </button>
      <TotalRankingView ranking={ranking} />
    </main>
  );
}
