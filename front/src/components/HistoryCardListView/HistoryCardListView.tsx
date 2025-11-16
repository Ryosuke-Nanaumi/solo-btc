import styles from "./HistoryCardListView.module.css";
import Card from "../ui/Card";

export default function HistoryCardListView() {
  return (
    <div className={styles.historyCardList}>
      <Card label="直近の合計ポイント" value="8,000pt" />
      <Card label="連続記録日数" value="10Days" />
    </div>
  );
}
