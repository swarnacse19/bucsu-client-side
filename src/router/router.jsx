import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import MainLayout from "../layouts/MainLayout"
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
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      // { path: 'elections', element: <Elections /> },
      // { path: 'about', element: <About /> },
      // { path: 'why-vote-ballot', element: <WhyVoteBallot /> },
      // { path: 'stories', element: <Stories /> },
      // { path: 'contact', element: <Contact /> },
      // { path: 'results/:electionId', element: <ElectionResults /> },
    ],
  },
]);
