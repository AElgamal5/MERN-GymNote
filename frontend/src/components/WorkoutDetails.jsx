import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();

  // const currentDate = new Date(workout.createdAt);
  // const currentDayOfMonth = currentDate.getDate();
  // const currentMonth = currentDate.getMonth();
  // const currentYear = currentDate.getFullYear();
  // const dateString =
  //   currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

  const [err, setErr] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const deleteHandler = async () => {
    setDeleting(true);
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setErr(json.msg);
      setDeleting(false);
    } else {
      dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
      setErr(null);
      setDeleting(false);
    }
  };

  return (
    <div className="workout-details">
      {deleting && <h3 className="deleting">Workout is being delete</h3>}
      {!deleting && (
        <>
          <h4>{workout.title}</h4>
          <p>
            <strong>Weight: </strong>
            {workout.weight} KG
          </p>
          <p>
            <strong>No. of Reps: </strong>
            {workout.reps}
          </p>
          <p>
            <strong>Date: </strong>
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
          <span onClick={deleteHandler} className="material-symbols-outlined">
            Delete
          </span>
        </>
      )}
      {err && <div className="error">{err}</div>}
    </div>
  );
};

export default WorkoutDetails;
