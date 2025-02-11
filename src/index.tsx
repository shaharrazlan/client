import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use "react-dom/client" instead of "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement); // ✅ Fix
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
