import type { DisplayedRankingUser } from "../../types/view/displayedRanking";
import styles from "./module/TotalRankingView.module.css";

export default function TotalRankingView({
  ranking,
}: {
  ranking: DisplayedRankingUser[];
}) {
  return (
    <section className={styles.rankingSection}>
      <div className={styles.rankingHeader}>
        <h2 className={styles.sectionTitle}>ランキング</h2>
        <p className={styles.seeAll}>全て見る</p>
      </div>
      <div className={styles.rankingList}>
        {ranking.map((user) => {
          return (
            <div key={user.id} className={styles.rankingUserCard}>
              <span>{user.rank}</span>
              <span>{user.name}</span>
              <span>{user.points}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
