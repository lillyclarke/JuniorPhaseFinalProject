import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//Import and destructure main from src/component/index.js //provider is providing the store to the application
const container = document.getElementById("root");
const root = createRoot(container);

//need to wrap in provider and pass in store
root.render(
       <Router>
              <Provider store={store}>
        <App />
              </Provider>
       </Router>
);
