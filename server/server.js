const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error.js");
const ticketRoute = require("./routes/ticketRoutes.js");
const userRoute = require("./routes/userRoutes.js");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("hey"));
app.use(express.static("public"));
app.use("/api/user", userRoute);
app.use("/api/ticket", ticketRoute);

app.use(errorHandler);

module.exports = app;
