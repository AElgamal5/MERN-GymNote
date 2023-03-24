const express = require("express");

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

const auth = require("../middleware/auth");

const router = express.Router();

//protect all workout routes
router.use(auth);

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.put("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);
module.exports = router;
