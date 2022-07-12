const knex = require('knex')
const configSQLITE3 = {
    client: "sqlite3",
  connection: {
    filename: "./public/SQLite/db/contenedor.sqlite",
    
  },
 useNullAsDefault: true,
}
const databaseConnection = knex(configSQLITE3)

module.exports = databaseConnection