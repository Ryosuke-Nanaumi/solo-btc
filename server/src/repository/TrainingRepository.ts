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
  async getTotalPoint(id: number, date: Date) {
    const records = await db(TABLES.TRAINING_RECORDS)
      .join(
        TABLES.EXERCISES,
        `${TABLES.TRAINING_RECORDS}.exercise_id`,
        "=",
        `${TABLES.EXERCISES}.id`
      )
      .where(`${TABLES.TRAINING_RECORDS}.user_id`, id)
      .select(`${TABLES.TRAINING_RECORDS}.amount`, `${TABLES.EXERCISES}.point`);

    const total = records.reduce((acc, cur) => acc + cur.amount * cur.point, 0);
    return total;
  }

  async getTodaysPoint(id: number, date: Date) {
    const todaysRecords = await db(TABLES.TRAINING_RECORDS)
      .join(
        TABLES.EXERCISES,
        `${TABLES.TRAINING_RECORDS}.exercise_id`,
        "=",
        `${TABLES.EXERCISES}.id`
      )
      .where(`${TABLES.TRAINING_RECORDS}.user_id`, id)
      .whereRaw("??::date = ?::date", [`${TABLES.TRAINING_RECORDS}.date`, date])
      .select(`${TABLES.TRAINING_RECORDS}.amount`, `${TABLES.EXERCISES}.point`);

    const todaysPoint = todaysRecords.reduce(
      (acc, cur) => acc + cur.amount * cur.point,
      0
    );

    return todaysPoint;
  }

  async getRanking() {
    const filePath = path.join(__dirname, "../../mock/ranking.json");
    const ranking = await readFile(filePath, "utf-8");
    return JSON.parse(ranking);
  }
}
