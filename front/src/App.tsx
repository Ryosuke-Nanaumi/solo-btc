import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/layout/Header/Header";
import MainView from "./components/MainView/MainView";
import {
  fetchPersonalUserInfo,
  fetchRanking,
} from "./repository/TrainingRepository.tsx";
import type { RankingUser } from "./types/domain/ranking.ts";
import type { Ranking } from "./types/domain/ranking.ts";
import type { DisplayedRankingUser } from "./types/view/displayedRanking.ts";
import type { PersonalUserInfo } from "./types/domain/personalUserInfo.ts";

function App() {
  const [userInfo, setUserInfo] = useState<PersonalUserInfo>();
  const [ranking, setRanking] = useState<DisplayedRankingUser[]>([]);
  const setCreatedDisplayedRanking = (users: RankingUser[]) => {
    const displayedRanking = users.map((user, index) => {
      return { ...user, rank: index + 1 };
    });
    setRanking(displayedRanking);
  };
  const handleRecordSuccess = () => {
    console.log("foo");
  }
  useEffect(() => {
    async function load() {
      const [userInfo, rankingInfo]: [PersonalUserInfo, Ranking] =
        await Promise.all([fetchPersonalUserInfo(), fetchRanking()]);

      setUserInfo(userInfo);
      setCreatedDisplayedRanking(rankingInfo.users);
    }
    load();
  }, []);
  return (
    <div className={styles.appRoot}>
      <Header />
      <MainView userInfo={userInfo} ranking={ranking} onRecordSuccess={handleRecordSuccess}/>
    </div>
  );
}

export default App;
