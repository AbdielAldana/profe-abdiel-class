// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router"; // <- aquí
import router from "./router";
import "./index.css";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RouterProvider router={router} />
    </CookiesProvider>
  // </React.StrictMode>
);
