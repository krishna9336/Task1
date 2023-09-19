import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer"; // Import your combined reducers
import App from "./App"; // Your main App component
import "./styles/tailwind.css"; // Import your Tailwind CSS styles

// Create a Redux store with your combined reducers
const store = createStore(rootReducer);

export const server = "https://task1-p4c9.onrender.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
