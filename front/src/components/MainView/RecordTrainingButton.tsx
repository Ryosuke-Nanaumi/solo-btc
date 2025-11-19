import { useState } from "react";
import styles from "./module/MainView.module.css";
import { addTrainingLog } from "../../repository/TrainingRepository";

const mockExercises = [
  { id: 1, name: "benchPress", displayName: "ベンチプレス" },
  { id: 2, name: "deadLift", displayName: "デッドリフト" },
  { id: 3, name: "squat", displayName: "スクワット" },
];

export default function RecordTrainingView({
  onRecordSuccess,
}: {
  onRecordSuccess: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    exerciseId: mockExercises[0].id,
    amount: "",
    date: new Date(),
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    if (!formData.exerciseId || Number(formData.amount) <= 0) {
      alert("種目と実行量を正しく入力してください");
      return;
    }

    // TODO: POST呼ぶ
    await addTrainingLog({
      exerciseId: Number(formData.exerciseId),
      date: String(formData.date),
      amount: Number(formData.amount),
    });

    console.log("submit押された");
    setIsModalOpen(false);
    onRecordSuccess();
    alert("保存完了!");

  };

  // const handleSubmit = async
  {
    return !isModalOpen ? (
      <button
        className={styles.addTrainingButton}
        onClick={() => setIsModalOpen(true)}
      >
        + トレーニングを記録する
      </button>
    ) : (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>トレーニングを記録</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="exerciseId">種目:</label>
            <select
              name="exerciseId"
              value={formData.exerciseId}
              id="exerciseId"
              onChange={handleInputChange}
            >
              {mockExercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.displayName || exercise.name}
                </option>
              ))}
            </select>
            <label htmlFor="amount">実行量:</label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="数値を入力"
            />
            <button type="submit">記録を保存する</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              キャンセル
            </button>
          </form>
        </div>
      </div>
    );
  }
}
