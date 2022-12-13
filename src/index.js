import React from "react";
import { createRoot } from "react-dom/client";
import {Main} from "./components";
/* Import and destructure main from src/component/index.js 
and anything else you may need here */


const container = document.getElementById("root")
const root = createRoot(container)

root.render(
        <Main />
)
