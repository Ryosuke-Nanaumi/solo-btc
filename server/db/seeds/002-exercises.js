/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("exercises").del();
  await knex("exercises").insert([
    {
      id: 1,
      name: "bench-press",
      display_name: "benchPress",
      point: 10,
      base_unit: "reps",
      training_intensity: 0.5,
    },
    {
      id: 2,
      name: "dead-lift",
      display_name: "deadLift",
      point: 10,
      base_unit: "reps",
      training_intensity: 1,
    },
    {
      id: 3,
      name: "squat",
      display_name: "squat",
      point: 10,
      base_unit: "reps",
      training_intensity: 1,
    },
    {
      id: 4,
      name: "running",
      display_name: "running",
      point: 20,
      base_unit: "minutes",
      training_intensity: 2,
    },
  ]);
};
