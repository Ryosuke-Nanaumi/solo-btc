import { readFile } from "fs/promises";
import path from "path";
import { db } from "../db/db";

const TABLES = Object.freeze({
  USERS: "users",
  EXERCISES: "exercises",
  TRAINING_RECORDS: "training_records",
});

export class TrainingRepository {
  async getUserById() {
    return await db(TABLES.USERS).where({ id: 1 }).first();
  }

  async getPoint(
    id: number,
    date?: Date
  ): Promise<{ amount: number; point: number }[]> {
    let query = db(TABLES.TRAINING_RECORDS)
      .join(
        TABLES.EXERCISES,
        `${TABLES.TRAINING_RECORDS}.exercise_id`,
        "=",
        `${TABLES.EXERCISES}.id`
      )
      .where(`${TABLES.TRAINING_RECORDS}.user_id`, id)
      .select(`${TABLES.TRAINING_RECORDS}.amount`, `${TABLES.EXERCISES}.point`);

    if (date) {
      query = query.whereRaw("??::date = ?::date", [
        `${TABLES.TRAINING_RECORDS}.date`,
        date,
      ]);
    }

    return await query;
  }

  async getRanking() {
    const filePath = path.join(__dirname, "../../mock/ranking.json");
    const ranking = await readFile(filePath, "utf-8");
    return JSON.parse(ranking);
  }
}
