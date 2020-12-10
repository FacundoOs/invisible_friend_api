const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const profilesRouter = require("./routes/profiles");
const usersRouter = require("./routes/users");

app.use("/profiles", profilesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port: ${port}`
  );
});
