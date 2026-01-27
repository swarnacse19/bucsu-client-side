import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Layout from "../layouts/Layout";
import Loading from "../loading/Loading";
import PrivateRoute from "../routes/PrivateRoute";
import StudentDashboard from "../Student/StudentDashboard";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/loading",
    Component: Loading,
  },
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "student",
            // element: <ProtectedRoute allowedRoles={['student']} />,
            children: [
              { path: "dashboard", element: <StudentDashboard /> },
              // { path: "profile", element: <StudentProfile /> },
              // { path: "elections", element: <StudentElections /> },
              // { path: "vote/:id", element: <StudentVote /> },
              // { path: "results", element: <StudentResults /> },
            ],
          },
        ],
      },
    ],
  },
]);
