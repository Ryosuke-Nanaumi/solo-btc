/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("training_records").del();
  await knex.raw("TRUNCATE TABLE training_records RESTART IDENTITY CASCADE");

  await knex("training_records").insert([
    { user_id: 1, exercise_id: 1, date: "2024-01-20", amount: 30 },
    { user_id: 1, exercise_id: 2, date: "2024-01-20", amount: 10 },
    { user_id: 2, exercise_id: 3, date: "2025-11-19", amount: 10 },
    { user_id: 3, exercise_id: 3, date: "2025-11-19", amount: 10 },
    { user_id: 1, exercise_id: 2, date: "2025-11-19", amount: 10 },
    { user_id: 3, exercise_id: 1, date: "2025-11-19", amount: 10 },
  ]);
};
