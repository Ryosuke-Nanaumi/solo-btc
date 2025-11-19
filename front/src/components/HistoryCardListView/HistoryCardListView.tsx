import styles from "./HistoryCardListView.module.css";
import Card from "../ui/Card";

interface HistoryCardListViewProps {
  totalPoints: number;
}
export default function HistoryCardListView({
  totalPoints,
}: HistoryCardListViewProps) {
  return (
    <div className={styles.historyCardList}>
      <Card label="直近の合計ポイント" value={String(totalPoints)} />
      <Card label="連続記録日数" value="10Days" />
    </div>
  );
}
