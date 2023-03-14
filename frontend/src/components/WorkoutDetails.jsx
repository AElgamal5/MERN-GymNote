const WorkoutDetails = ({ workout }) => {
  const currentDate = new Date(workout.createdAt);

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const dateString =
    currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Weight: </strong>
        {workout.weight} KG
      </p>
      <p>
        <strong>No. of Reps: </strong>
        {workout.reps}
      </p>
      <p>{dateString}</p>
    </div>
  );
};

export default WorkoutDetails;
