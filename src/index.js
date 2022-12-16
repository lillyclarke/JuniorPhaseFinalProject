import React from "react";
import { createRoot } from "react-dom/client";
//import { Main } from "./components";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//Import and destructure main from src/component/index.js and anything else you may need here
//provider is providing the store to the application

const container = document.getElementById("root")
const root = createRoot(container)

//need to render app(main component) and wrap in router
root.render(
       // <Main />,
       <Router>
              <Provider store={store}>
        <App />
              </Provider>
       </Router>
);
