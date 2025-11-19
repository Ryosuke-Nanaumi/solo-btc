import { type Dispatch, type SetStateAction } from "react";
import type { FormData } from "./RecordTrainingView";
import styles from "./module/TrainingFormView.module.css";
import Button from "../ui/Button";

const mockExercises = [
  { id: 1, name: "benchPress", displayName: "ベンチプレス" },
  { id: 2, name: "deadLift", displayName: "デッドリフト" },
  { id: 3, name: "squat", displayName: "スクワット" },
];

interface TrainingFormViewProps {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
export default function TrainingFormView({
  handleSubmit,
  formData,
  handleInputChange,
  setIsModalOpen,
}: TrainingFormViewProps) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.formCard}>
        <h3 className={styles.cardTitle}>トレーニングを記録</h3>
        <form onSubmit={handleSubmit} className={styles.trainingForm}>
          <label htmlFor="exerciseId" className={styles.label}>
            種目:
          </label>
          <select
            name="exerciseId"
            value={formData.exerciseId}
            id="exerciseId"
            onChange={handleInputChange}
            className={styles.selectInput}
          >
            {mockExercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.displayName || exercise.name}
              </option>
            ))}
          </select>
          <label htmlFor="amount" className={styles.label}>
            実行量:
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="数値を入力"
            className={styles.numInput}
          />

          <div className={styles.buttonContainer}>
            <Button variant="primary">記録を保存する</Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="cancel"
            >キャンセル</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
