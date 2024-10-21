const pg = require("pg");

const config = {
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432, // 5432
  database: "postgres", // postgres
};

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
});

module.exports = client;
