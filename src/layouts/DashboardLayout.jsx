import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import {
  FaVoteYea,
  FaCalendarAlt,
  FaClipboardList,
  FaBook,
  FaBell,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserEdit,
  FaChartBar,
} from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully!");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const menuItems = [
    { name: "OverView", path: "/dashboard", icon: GrOverview },
    {
      name: "Ongoing Elections",
      path: "/dashboard/ongoing-elections",
      icon: FaVoteYea,
    },
    {
      name: "Upcoming Elections",
      path: "/dashboard/upcoming-elections",
      icon: FaCalendarAlt,
    },
    {
      name: "Apply for Candidate",
      path: "/dashboard/apply-candidate",
      icon: FaUserEdit,
    },
    {
      name: "My Applications",
      path: "/dashboard/my-applications",
      icon: FaClipboardList,
    },
    { name: "Guidelines", path: "/dashboard/guidelines", icon: FaBook },
    { name: "Notices", path: "/dashboard/notifications", icon: FaBell },
    { name: "View Result", path: "/dashboard/view-result", icon: FaChartBar },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <NavLink to="/" className="flex items-center gap-2">
            <FaVoteYea className="text-blue-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800">VoteBallot</span>
          </NavLink>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.photo ||
                user?.photoURL ||
                "https://i.pravatar.cc/150?img=1"
              }
              alt={user?.name || user?.displayName}
              className="w-12 h-12 rounded-full border-2 border-indigo-500 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 truncate">
                {user?.name || user?.displayName}
              </p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              Student Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                <FaBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default DashboardLayout;
