import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = ({ edit, workout, formCancel }) => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState(workout ? workout.title : "");
  const [reps, setReps] = useState(workout ? workout.reps : "");
  const [weight, setWeight] = useState(workout ? workout.weight : "");
  const [err, setErr] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newWorkout = { title, weight, reps };
    const response = await fetch(
      `/api/workouts/${workout ? workout._id : ""}`,
      {
        method: workout ? "PUT" : "POST",
        body: JSON.stringify(newWorkout),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setErr(json.msg);
    } else {
      setTitle("");
      setReps("");
      setWeight("");
      setErr(null);

      if (workout) {
        dispatch({
          type: "UPDATE_WORKOUT",
          payload: { _id: workout._id, title, reps, weight },
        });
      } else {
        dispatch({ type: "CREATE_WORKOUT", payload: json });
      }
    }
  };

  const cancelHandler = () => {
    setTitle("");
    setReps("");
    setWeight("");
    formCancel();
  };

  return (
    <form className="create" onSubmit={submitHandler}>
      <h3>{edit ? "Edit Workout" : "Add A New Workout"}</h3>

      <label>Exercise Title</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        required
      />

      <label>Exercise Weight</label>
      <input
        type="number"
        onChange={(e) => {
          setWeight(e.target.value);
        }}
        value={weight}
        required
      />

      <label>Exercise Reps</label>
      <input
        type="number"
        onChange={(e) => {
          setReps(e.target.value);
        }}
        value={reps}
        required
      />

      <button type="submit">{edit ? "Update" : "Add"} Workout</button>
      <button id="cancel" onClick={cancelHandler}>
        Cancel
      </button>
      {err && <div className="error">{err}</div>}
    </form>
  );
};

export default WorkoutForm;
