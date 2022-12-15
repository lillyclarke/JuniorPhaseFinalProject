import React from "react";
import { createRoot } from "react-dom/client";
//import { Main } from "./components";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

/* Import and destructure main from src/component/index.js
and anything else you may need here */

const container = document.getElementById("root")
const root = createRoot(container)

//need to render app(main component) and wrap in router
root.render(
       // <Main />,
       <Router>
        <App />
       </Router>
)
