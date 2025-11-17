export interface Ranking {
  users: RankingUser[];
}

export interface RankingUser {
  id: number;
  name: string;
  points: number;
}