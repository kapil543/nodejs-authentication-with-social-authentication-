const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/test");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error:"));
db.once("open", function () {
  console.log("Database Connected !!!");
});

module.exports = db;
