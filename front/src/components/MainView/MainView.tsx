import TodaysPointView from "../TodaysPointView/TodaysPointView";
import styles from "./module/MainView.module.css";
import HistoryCardListView from "../HistoryCardListView/HistoryCardListView";
import TotalRankingView from "./TotalRankingView";
import RecordTrainingView from "./RecordTrainingButton";
import type { DisplayedRankingUser } from "../../types/view/displayedRanking";
import type { PersonalUserInfo } from "../../types/domain/personalUserInfo";

interface MainViewProps {
  userInfo?: PersonalUserInfo;
  ranking: DisplayedRankingUser[];
  onRecordSuccess: () => void;
}

export default function MainView({
  userInfo,
  ranking,
  onRecordSuccess,
}: MainViewProps) {
  return (
    <main className={styles.main}>
      <TodaysPointView todayPoint={userInfo?.todaysPoint ?? 0} />
      <HistoryCardListView totalPoints={userInfo?.totalPoints ?? 0} />
      <RecordTrainingView onRecordSuccess={onRecordSuccess} />
      <TotalRankingView ranking={ranking} />
    </main>
  );
}
