const express = require("express");

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.put("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);
module.exports = router;
