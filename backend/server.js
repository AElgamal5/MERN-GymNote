const express = require("express");
const mongoose = require("mongoose");
require("colors");
require("dotenv").config();

const app = express();

//routers
const workoutRouter = require("./routes/workout");

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRouter);

//DB connection

const start = () => {
  mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log("Connected to DB & server running on port: 5000".bgGreen);
      });
    })
    .catch((err) => {
      console.error(
        "Error in database connection".red,
        "\nRetry to connect in 5 sec".yellow
      );
      process.env.PRODUCTION === "false" ? console.log(err) : null;
      setTimeout(start, 5000);
    });
};

start();

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to GymNote App" });
});
