/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("training_records").del();
  await knex("users").del();
  await knex("users").insert([
    { id: 1, name: "Taro" },
    { id: 2, name: "Ryo" },
    { id: 3, name: "Hanako" },
  ]);
};
