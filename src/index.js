import ReactDOM from "react-dom";
import React, { useState, useContext } from "react";

// Import the CounterContext and CounterProvider modules from a custom counterContext file, and import a custom styles.css file.
import { CounterContext, CounterProvider } from "./counterContext";
import "./styles.css";

// App.js

// Define a Counter component that uses the useContext hook to access a shared state context, and displays the current count value along with buttons to increment and decrement the count.
function Counter() {
  const { state, dispatch } = useContext(CounterContext);

  return (
    <div>
      <h5>{state.loading ? "Loading..." : `Count: ${state.count}`}</h5>

      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

//Define a SeparateComponent component that also uses the useContext hook to access the shared state context, and displays the current count value along with a button to initiate a mock fetch operation.
function SeparateComponent() {
  const { state, dispatch } = useContext(CounterContext);

  async function mockFetch() {
    try {
      dispatch({ type: "increment-async-start" });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch({
        type: "increment-async-success",
        count: 5
      });
    } catch (err) {
      // TODO: Add Error here
    }
  }

  return (
    <div>
      <h1>Shared Count: {state.count}</h1>
      <button onClick={mockFetch}>Fetch Saved Counter</button>
    </div>
  );
}

// Define an App component that wraps the Counter and SeparateComponent components in a CounterProvider component, which provides the shared state context to both components.
function App() {
  return (
    <div className="App">
      <CounterProvider>
        <Counter />
        <SeparateComponent />
      </CounterProvider>
    </div>
  );
}

// Render the App component using the ReactDOM.render method, and pass in the rootElement DOM node as the second argument.
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// Overall, this code demonstrates how to use the useContext hook to access a shared state context, and how to use the CounterProvider component to provide the context to multiple child components.