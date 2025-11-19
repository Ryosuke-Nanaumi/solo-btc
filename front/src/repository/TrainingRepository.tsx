import type { PersonalUserInfo } from "../types/domain/personalUserInfo";
import type { Ranking } from "../types/domain/ranking";

const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : "";
// 複雑なロジックは今のところないため、serviceなどは作らず、view側で整形
export async function fetchPersonalUserInfo(): Promise<PersonalUserInfo> {
  // 仮でIDを設定
  const id = 1;
  const res = await fetch(`${API_BASE_URL}/api/personal/${id}`);
  if (!res.ok) {
    throw new Error("fetchPersonalUserInfo failed.");
  }

  return res.json();
}

export async function fetchRanking(): Promise<Ranking> {
  const res = await fetch(`${API_BASE_URL}/api/ranking`);
  if (!res.ok) {
    throw new Error("fetchRanking failed.");
  }

  return res.json();
}

interface TrainingLog {
  exerciseId: number;
  date: string;
  amount: number;
}
export async function addTrainingLog(payload: TrainingLog) {
  // return

  const response = await fetch(`${API_BASE_URL}/api/training_records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, id: 1 }),
  });

  return response.json();
}
