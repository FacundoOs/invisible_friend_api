const express = require("express");
const path = require('path')
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)

require("dotenv").config();

// Passport config
require("./config/passport")(passport)

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//
app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

//
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



//


// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  //don't create a session until something is store
  saveUninitialized: false,
  store : new MongoStore({ mongooseConnection: mongoose.connection })
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
const profilesRouter = require("./routes/profiles");
const usersRouter = require("./routes/users");

app.use("/auth", require("./routes/auth"))

app.use("/profiles", profilesRouter);
app.use("/users", usersRouter);


//
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port: ${port}`
  );
});
