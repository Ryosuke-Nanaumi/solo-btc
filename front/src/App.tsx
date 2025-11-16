import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import MainView from "./components/MainView/MainView";
// import exercises from "./mock/exercises.json";

interface Exercise {
  id: number;
  name: string;
  displayName: string;
  baseUnit: string;
  trainingIntensity: number;
}
interface TrainingLog {
  userId: number;
  exerciseId: number;
  date: Date;
  amount: number;
}

function App() {
  // console.log("foo------------", exercises);
  const userId = 1; // 仮で設定
  const [todayPoint, setTodayPoint] = useState(0);
  const calcTodaypoint = (exercises: Exercise[]) => {
    setTodayPoint(exercises[0].trainingIntensity);
  };
  useEffect(() => {
    fetch("/mock/exercises.json")
      .then((res) => res.json())
      .then((res) => calcTodaypoint(res));
  }, []);
  return (
    <div className={styles.appRoot}>
      <Header />
      <MainView todayPoint={todayPoint} />
    </div>
  );
}

export default App;
