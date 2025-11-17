import type { PersonalUserInfo } from "../types/domain/personalUserInfo";
import type { Ranking } from "../types/domain/ranking";

// 複雑なロジックは今のところないため、serviceなどは作らず、view側で整形
export async function fetchPersonalUserInfo(): Promise<PersonalUserInfo> {
  const res = await fetch("/mock/personalUserInfo.json");
  if (!res.ok) {
    throw new Error("fetchPersonalUserInfo failed.");
  }

  return res.json();
}

export async function fetchRanking(): Promise<Ranking> {
  const res = await fetch("/mock/ranking.json");
  if (!res.ok) {
    throw new Error("fetchRanking failed.");
  }

  return res.json();
}
