const mysql = require("mysql");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ssl: {
  //   ca: fs.readFileSync(path.join(__dirname, "certs", "ca.pem")),
  // },
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Successfully connected to the database");
});

module.exports = db;
