import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [err, setErr] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const workout = { title, weight, reps };
    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setErr(json.msg);
    } else {
      //reset fields
      setTitle("");
      setReps("");
      setWeight("");
      setErr(null);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      console.log(json);
    }
  };

  return (
    <form className="create" onSubmit={submitHandler}>
      <h3>Add A New Workout</h3>

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

      <button type="submit">Add Workout</button>
      {err && <div className="error">{err}</div>}
    </form>
  );
};

export default WorkoutForm;
