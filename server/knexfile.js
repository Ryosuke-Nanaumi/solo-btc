// require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      database: "training",
      user: "postgres",
      password: "",
    },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./dist/db/migrations",
    },
    seeds: {
      directory: "./dist/db/seeds",
    },
  },
};
