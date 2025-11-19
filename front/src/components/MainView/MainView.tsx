import TodaysPointView from "../TodaysPointView/TodaysPointView";
import styles from "./module/MainView.module.css";
import HistoryCardListView from "../HistoryCardListView/HistoryCardListView";
import TotalRankingView from "./TotalRankingView";
import type { DisplayedRankingUser } from "../../types/view/displayedRanking";
import type { PersonalUserInfo } from "../../types/domain/personalUserInfo";

interface MainViewProps {
  userInfo?: PersonalUserInfo;
  ranking: DisplayedRankingUser[];
}

export default function MainView({ userInfo, ranking }: MainViewProps) {
  return (
    <main className={styles.main}>
      <TodaysPointView todayPoint={userInfo?.todaysPoint ?? 0} />
      <HistoryCardListView totalPoints={userInfo?.totalPoints ?? 0} />
      <button className={styles.addTrainingButton}>
        + トレーニングを記録する
      </button>
      <TotalRankingView ranking={ranking} />
    </main>
  );
}
