require("dotenv").config();
const express = require("express");
const migrate_table = require("./src/helpers/migrate_table");
const seed_table = require("./src/helpers/seed_table");

const app = express();

migrate_table();

seed_table();

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
