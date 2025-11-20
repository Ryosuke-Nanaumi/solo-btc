import { db } from "../../db/db";
import { TrainingRepository } from "../TrainingRepository";

describe("TrainingRepository (integration)", () => {
  const trainingRepository = new TrainingRepository();

  beforeAll(async () => {
    await db.migrate.latest();
  });

  beforeEach(async () => {
    await db.raw(
      "TRUNCATE TABLE training_records, exercises, users RESTART IDENTITY CASCADE"
    );

    await db("users").insert({ id: 1, name: "Foo" });
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("Knex is connected to training_test DB", async () => {
    const result = await db.raw("SELECT current_database()");
    const dbName = result.rows?.[0]?.current_database;

    expect(dbName).toBe("training_test");
  });

  test("getUserById returns user", async () => {
    const user = await trainingRepository.getUserById(1);

    expect(user).to.deep.equal({
      id: 1,
      name: "Foo",
    });
  });

  test("getPoint returns todaysPoint when arg date passed", async () => {
    const date1 = new Date("2025-11-19");
    const date2 = new Date("2025-11-20");

    await db("exercises").insert({
      id: 1,
      name: "bench-press",
      display_name: "benchPress",
      point: 5,
      base_unit: "reps",
      training_intensity: 0.5,
    });
    await db("training_records").insert([
      {
        user_id: 1,
        exercise_id: 1,
        date: date1,
        amount: 10,
      },
      {
        user_id: 1,
        exercise_id: 1,
        date: date2,
        amount: 5,
      },
    ]);

    const todaysPoint = await trainingRepository.getPoint(1, date1);

    expect(todaysPoint).to.deep.equal([
      {
        amount: 10,
        point: 5,
      },
    ]);
  });

  test("getPoint returns totalPoint when arg date not passed", async () => {
    await db("exercises").insert({
      id: 1,
      name: "bench-press",
      display_name: "benchPress",
      point: 5,
      base_unit: "reps",
      training_intensity: 0.5,
    });
    await db("training_records").insert([
      {
        user_id: 1,
        exercise_id: 1,
        date: new Date("2025-11-19"),
        amount: 10,
      },
      {
        user_id: 1,
        exercise_id: 1,
        date: new Date("2025-11-20"),
        amount: 5,
      },
    ]);

    const todaysPoint = await trainingRepository.getPoint(1);

    // 配列の順番に依存しない
    expect(todaysPoint).to.deep.members([
      {
        amount: 5,
        point: 5,
      },
      {
        amount: 10,
        point: 5,
      },
    ]);
  });

  test("postTrainingRecords inserts record", async () => {
    // 外部キー制約のため
    await db("exercises").insert({
      id: 1,
      name: "bench-press",
      display_name: "benchPress",
      point: 5,
      base_unit: "reps",
      training_intensity: 0.5,
    });

    const arg = {
      id: 1,
      exerciseId: 1,
      date: new Date("2025-11-18T15:00:00.000Z"),
      amount: 10,
    };

    const result = await trainingRepository.postTrainingRecords(arg);


    const createdId = 1;
    
    expect(result).to.deep.equal([{ id: createdId }]);

    
    const actual = await db("training_records").where({ id: createdId }).first();

    const expected = {
      id: createdId,
      user_id: 1,
      exercise_id: 1,
      date: new Date("2025-11-18T15:00:00.000Z"),
      amount: 10,
    };

    expect(actual).to.deep.equal(expected);
  });
});
