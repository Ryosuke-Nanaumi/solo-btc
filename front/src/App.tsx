import styles from "./App.module.css";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <div className={styles.appRoot}>
      <Header />
    </div>
  );
}

export default App;
