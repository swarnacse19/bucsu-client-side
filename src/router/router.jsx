import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";

export const router = createBrowserRouter([
  { 
    path: "/login", 
    Component: Login,
  },
  {
    path: "/",
    Component: Home,
  },

]);
