import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import MainLayout from "../layouts/MainLayout"
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Forbidden from "../pages/Forbidden";
import AuthorityLayout from "../layouts/AuthorityLayout";
import AuthorityDashboard from "../pages/Authority/AuthorityDashboard";
import AuthorityCreateElection from "../pages/Authority/AuthorityCreateElection";
import AuthorityManageElections from "../pages/Authority/AuthorityManageElections";
import ManageNotices from "../pages/Authority/ManageNotices";
import CandidateRules from "../pages/Authority/CandidateRules";
import VoterRules from "../routes/VoterRules";
import OngoingElections from "../pages/Dashboard/OngoingElections";
import UpcomingElections from "../pages/Dashboard/UpcomingElections";
import ApplyCandidate from "../pages/Dashboard/ApplyCandidate";
import Guidelines from "../pages/Dashboard/GuideLines";
import Notifications from "../pages/Dashboard/Notifications";
import MyApplications from "../pages/Dashboard/MyApplications";
import ManageApplications from "../pages/shared/ManageApplications";
import ResultManage from "../pages/vote/ResultManage";
import ViewResults from "../pages/vote/ViewResults";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageUsers from "../pages/Admin/ManageUsers";
import VotePage from "../pages/vote/VotePage";

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
    path: "/forbidden",
    Component: Forbidden,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
  {
    path: "/dashboard",
    element: (<PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'ongoing-elections', element: <OngoingElections /> },
      { path: 'upcoming-elections', element: <UpcomingElections /> },
      { path: 'apply-candidate', element: <ApplyCandidate /> },
      { path: 'guidelines', element: <Guidelines /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'my-applications', element: <MyApplications /> },
      { path: 'vote/:electionId', element: <VotePage /> },
      { path: 'view-result', element: <ViewResults></ViewResults> },
    ],
  },
  {
    path: '/authority',
    element: (
      <PrivateRoute>
        <AuthorityLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AuthorityDashboard /> },
      { path: 'create-election', element: <AuthorityCreateElection /> },
      { path: 'manage-elections', element: <AuthorityManageElections></AuthorityManageElections> },
      { path: 'candidate-management', element: <ManageApplications /> },
      { path: 'notices', element: <ManageNotices /> },
      { path: 'election-management/candidate-rules', element: <CandidateRules /> },
      { path: 'election-management/voter-rules', element: <VoterRules /> },
      { path: 'result-manage', element: <ResultManage></ResultManage> },
      { path: 'view-result', element: <ViewResults></ViewResults> },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'create-election', element: <AuthorityCreateElection /> },
      { path: 'manage-elections', element: <AuthorityManageElections></AuthorityManageElections> },
      { path: 'candidate-management', element: <ManageApplications /> },
      { path: 'notices', element: <ManageNotices /> },
      { path: 'users', element: <ManageUsers></ManageUsers> },
      { path: 'view-result', element: <ViewResults></ViewResults> },
    ],
  },
]);
