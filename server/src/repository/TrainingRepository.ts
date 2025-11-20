import { db } from "../db/db";
import { TrainingRecords } from "../service/TrainingService";

interface User {
  id: number;
  name: string;
}
export interface Ranking {
  id: number;
  name: string;
  points: number;
}
const TABLES = Object.freeze({
  USERS: "users",
  EXERCISES: "exercises",
  TRAINING_RECORDS: "training_records",
});

export class TrainingRepository {
  async getUserById(id: number): Promise<User> {
    return await db(TABLES.USERS).where({ id }).first();
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

  async getRanking(): Promise<Ranking[]> {
    const ranking = await db(TABLES.TRAINING_RECORDS)
      .join(
        TABLES.USERS,
        `${TABLES.TRAINING_RECORDS}.user_id`,
        `${TABLES.USERS}.id`
      )
      .join(
        TABLES.EXERCISES,
        `${TABLES.TRAINING_RECORDS}.exercise_id`,
        `${TABLES.EXERCISES}.id`
      )
      .select(
        `${TABLES.TRAINING_RECORDS}.user_id as id`,
        `${TABLES.USERS}.name`,
        db.raw("SUM(?? * ??) as points", [
          `${TABLES.EXERCISES}.point`,
          `${TABLES.TRAINING_RECORDS}.amount`,
        ])
      )
      .groupBy(`${TABLES.TRAINING_RECORDS}.user_id`, `${TABLES.USERS}.name`)
      .orderBy("points", "desc");
    return ranking as Ranking[];
  }

  async postTrainingRecords(
    trainigRecords: TrainingRecords
  ): Promise<{ id: number }[]> {
    console.log("fooooooo----", trainigRecords.id);
    const trainigRecordsSnake = {
      user_id: trainigRecords.id,
      exercise_id: trainigRecords.exerciseId,
      date: trainigRecords.date,
      amount: trainigRecords.amount,
    };
    return await db(TABLES.TRAINING_RECORDS)
      .insert(trainigRecordsSnake)
      .returning("id");
  }
}
