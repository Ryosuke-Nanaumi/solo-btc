import { useState } from "react";
import { addTrainingLog } from "../../repository/TrainingRepository";
import TrainingFormView from "./TrainingFormView";
import Button from "../ui/Button";

const mockExercises = [
  { id: 1, name: "benchPress", displayName: "ベンチプレス" },
  { id: 2, name: "deadLift", displayName: "デッドリフト" },
  { id: 3, name: "squat", displayName: "スクワット" },
];
export interface FormData {
  exerciseId: number;
  amount: number;
  date: Date;
}
export default function RecordTrainingView({
  onRecordSuccess,
}: {
  onRecordSuccess: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    exerciseId: mockExercises[0].id,
    amount: 0,
    date: new Date(),
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
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

  return !isModalOpen ? (
    <RecordTrainingButton setIsModalOpen={setIsModalOpen} />
  ) : (
    <TrainingFormView
      handleSubmit={handleSubmit}
      formData={formData}
      handleInputChange={handleInputChange}
      setIsModalOpen={setIsModalOpen}
    />
  );
}

function RecordTrainingButton({
  setIsModalOpen,
}: {
  setIsModalOpen: (_: boolean) => void;
}) {
  return (
    <Button onClick={() => setIsModalOpen(true)}>
      + トレーニングを記録する
    </Button>
  );
}
