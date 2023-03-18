import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  const [edit, setEdit] = useState(false);
  const [editWorkout, setEditWorkout] = useState(null);

  function handleChildEdit(childData) {
    console.log(childData);
    setEdit(childData.edit);
    setEditWorkout(childData.workout);
  }
  const handleFormCancel = () => {
    setEdit(false);
    setEditWorkout(null);
  };

  //fire fn. when component rendered
  // if dependency array is empty then the use effect will fire on rendering the component only
  useEffect(() => {
    const fetchedWorkouts = async () => {
      const response = await fetch("/api/workouts");
      //parse the json
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchedWorkouts();
    console.log("From useEffect");
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return (
              <WorkoutDetails
                workout={workout}
                key={workout._id}
                onChildData={handleChildEdit}
              />
            );
          })}
      </div>

      {!edit && <WorkoutForm />}
      {edit && (
        <WorkoutForm
          edit={edit}
          workout={editWorkout}
          formCancel={handleFormCancel}
        />
      )}
    </div>
  );
};

export default Home;
