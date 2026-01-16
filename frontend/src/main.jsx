import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AppcontextProvider } from "./context/Appcontext";

const root = createRoot(document.getElementById("root"));

root.render(
   <AppcontextProvider>
  <BrowserRouter>
   
      <App />
    
  </BrowserRouter>
  </AppcontextProvider>
);
