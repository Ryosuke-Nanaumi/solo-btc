import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/layout/Header/Header";
import MainView from "./components/MainView/MainView";
import {
  fetchPersonalUserInfo,
  fetchRanking,
} from "./repository/TrainingRepository.tsx";
import type { RankingUser } from "./types/domain/ranking.ts";
import type { DisplayedRankingUser } from "./types/view/displayedRanking.ts";

function App() {
  const [todayPoint, setTodayPoint] = useState(0);
  const [ranking, setRanking] = useState<DisplayedRankingUser[]>([]);
  const setCreatedDisplayedRanking = (users: RankingUser[]) => {
    const displayedRanking = users.map((user, index) => {
      return { ...user, rank: index + 1 };
    });
    setRanking(displayedRanking);
  };
  useEffect(() => {
    async function load() {
      const [userInfo, rankingInfo] = await Promise.all([
        fetchPersonalUserInfo(),
        fetchRanking(),
      ]);

      setTodayPoint(userInfo.todaysPoint);
      setCreatedDisplayedRanking(rankingInfo.users);
    }
    load();
  }, []);
  return (
    <div className={styles.appRoot}>
      <Header />
      <MainView todayPoint={todayPoint} ranking={ranking} />
    </div>
  );
}

export default App;
