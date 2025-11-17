import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/layout/Header/Header";
import MainView from "./components/MainView/MainView";
import type { Ranking, RankingUser } from "./types/domain/ranking.ts";
import type { DisplayedRankingUser } from "./types/view/displayedRanking.ts";
// import exercises from "./mock/exercises.json";

function App() {
  // console.log("foo------------", exercises);
  const userId = 2; // 仮で設定
  const [todayPoint, setTodayPoint] = useState(0);
  const [ranking, setRanking] = useState<DisplayedRankingUser[]>([]);
  const setCreatedDisplayedRanking = (users: RankingUser[]) => {
    const displayedRanking = users.map((user, index) => {
      return { ...user, rank: index + 1 };
    });
    setRanking(displayedRanking);
  };
  useEffect(() => {
    fetch("/mock/personalUserInfo.json")
      .then((res) => res.json())
      .then((res) => setTodayPoint(res.todaysPoint));
    fetch("/mock/ranking.json")
      .then((res) => res.json())
      // .then((res) => console.log(res));
      .then((res) => setCreatedDisplayedRanking(res.users));
  }, []);
  return (
    <div className={styles.appRoot}>
      <Header />
      <MainView todayPoint={todayPoint} ranking={ranking} />
    </div>
  );
}

export default App;
