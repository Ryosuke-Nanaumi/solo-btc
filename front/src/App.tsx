import { useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import TodaysPointView from "./components/TodaysPointView/TodaysPointView";

function App() {
  const [todayPoint, setTodayPoint] = useState(0);
  return (
    <div className={styles.appRoot}>
      <Header />
      <main className={styles.main}>
        <TodaysPointView todayPoint={todayPoint} />
      </main>
    </div>
  );
}

export default App;
