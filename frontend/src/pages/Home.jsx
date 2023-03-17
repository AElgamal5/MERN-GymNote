import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

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
            return <WorkoutDetails workout={workout} key={workout._id} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
