import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

const updateHandler = (workouts, payload) => {
  console.log("payload", payload);

  let index = workouts.findIndex((obj) => obj._id === payload._id);

  workouts[index].title = payload.title;
  workouts[index].reps = payload.reps;
  workouts[index].weight = payload.weight;

  return workouts;
};

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((workout) => {
          return workout._id !== action.payload;
        }),
      };
    case "UPDATE_WORKOUT":
      return {
        workouts: updateHandler(state.workouts, action.payload),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
