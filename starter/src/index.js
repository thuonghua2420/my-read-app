import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BookSearch from "./BookSearch";
import Page404 from "./Page404";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search",
    element: <BookSearch />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);
 

ReactDOM.render(
  <React.StrictMode >
    <RouterProvider router={router} />
  </React.StrictMode >,
  document.getElementById('root')
)
 