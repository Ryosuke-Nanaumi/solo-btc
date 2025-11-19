import knex from "knex";
const knexConfig = require("../../knexfile");

const env = process.env.NODE_ENV || "development";
export const db = knex(knexConfig[env]);
