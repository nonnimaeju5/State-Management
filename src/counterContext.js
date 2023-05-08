import React, { useReducer } from "react";

// Define an initialState object that represents the initial state of a counter. This object has two properties: count, which is initially set to 0, and loading, which is initially set to false.
const initialState = {
  count: 0,
  loading: false
};

// Define a reducer function that takes a state object and an action object as arguments, and returns a new state object based on the action type. This function is used to update the state based on the action type.
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };

    case "decrement":
      return { ...state, count: state.count - 1 };

    case "increment-async-start":
      return { ...state, loading: true };

    case "increment-async-success":
      return { ...state, loading: false, count: action.count };

    default:
      return { ...state };
  }
};

// Define a CounterContext object using the React.createContext method, and pass in the initialState object as the initial value.
const CounterContext = React.createContext(initialState);

// Define a CounterProvider component that uses the useReducer hook to manage state, and provides the shared state context to child components using the CounterContext.Provider component.
function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}

export { CounterContext, CounterProvider };