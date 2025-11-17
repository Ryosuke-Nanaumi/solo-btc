import TodaysPointView from "../TodaysPointView/TodaysPointView";
import styles from "./MainView.module.css";
import HistoryCardListView from "../HistoryCardListView/HistoryCardListView";
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
      <section className={styles.rankingSection}>
        <div className={styles.rankingHeader}>
          <h2 className={styles.sectionTitle}>ランキング</h2>
          <p className={styles.seeAll}>全て見る</p>
        </div>
        <div className={styles.rankingList}>
          {ranking.map((user) => {
            return (
              <div key={user.id} className={styles.userCard}>
                <span>{user.rank}</span>
                <span>{user.name}</span>
                <span>{user.points}</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
