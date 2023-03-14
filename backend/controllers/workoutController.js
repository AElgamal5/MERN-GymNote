const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

/*
    @path: /
    @method: post
    @file: routes/workout
*/
const createWorkout = async (req, res) => {
  try {
    const { title, reps, weight } = req.body;
    const workout = await Workout.create({
      title,
      reps,
      weight,
    });
    res.status(201).json(workout);
  } catch (error) {
    console.log("Error in: ".red, req.path.red, req.method.red);
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

/*
    @path: /
    @method: get
    @file: routes/workout
*/
const getWorkouts = async (req, res) => {
  try {
    const workouts = await await Workout.find().select(["-__v"]);
    res.status(200).json(workouts);
  } catch (error) {
    console.log("Error in: ".red, req.path.red, req.method.red);
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

/*
    @path: /:id
    @method: get
    @file: routes/workout
*/
const getWorkout = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Wrong id" });
    }

    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(400).json({ msg: "Doc does not exist" });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.log("Error in: ".red, req.path.red, req.method.red);
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

/*
    @path: /:id
    @method: put
    @file: routes/workout
*/
const updateWorkout = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Wrong id" });
    }

    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(400).json({ msg: "Doc does not exist" });
    }

    const updatesWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({ msg: "Doc updated successfully" });
  } catch (error) {
    console.log("Error in: ".red, req.path.red, req.method.red);
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

/*
    @path: /:id
    @method: delete
    @file: routes/workout
*/
const deleteWorkout = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Wrong id" });
    }

    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(400).json({ msg: "Doc does not exist" });
    }

    await Workout.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Doc deleted successfully" });
  } catch (error) {
    console.log("Error in: ".red, req.path.red, req.method.red);
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
