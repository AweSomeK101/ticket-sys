const app = require("./server.js");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connection.once("error", (err) => {
  console.log("Database Connection Error ->", err);
  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("Database Connection Estabilished");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server Could not start");
    process.exit(1);
  }
  console.log("Server Started");
});
