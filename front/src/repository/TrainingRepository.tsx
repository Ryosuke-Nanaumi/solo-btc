import type { PersonalUserInfo } from "../types/domain/personalUserInfo";
import type { Ranking } from "../types/domain/ranking";

// TODO: 後からenvへ
const API_BASE_URL = "http://localhost:3000"
// 複雑なロジックは今のところないため、serviceなどは作らず、view側で整形
export async function fetchPersonalUserInfo(): Promise<PersonalUserInfo> {
  const res = await fetch(`${API_BASE_URL}/api/personal`);
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
