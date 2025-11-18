/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("exercises", (table) => {
    table.increments("id").primary();
    table.string("name", 50).notNullable();
    table.string("display_name", 50).notNullable();
    table.integer("point").notNullable();
    table.string("base_unit").notNullable();
    table.float("training_intensity").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("exercises");
};
