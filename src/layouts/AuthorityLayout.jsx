import { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router";
import {
  FaUser,
  FaPlus,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaChartBar,
  FaHome,
  FaChevronDown,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaBell,
  FaSignOutAlt,
  FaVoteYea,
} from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Logo from "../components/Logo";

const AuthorityLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [electionSubOpen, setElectionSubOpen] = useState(false);
  const [resultSubOpen, setResultSubOpen] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully!");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const menuItems = [
    // { label: "My Profile", icon: FaUser, path: "/authority/profile" },
    { label: "Overview", icon: GrOverview, path: "/authority" },
    {
      label: "Add Student",
      icon: FaUsers,
      path: "/authority/add-student",
    },
    {
      label: "Create Election",
      icon: FaPlus,
      path: "/authority/create-election",
    },
    {
      label: "Manage Elections",
      icon: FaVoteYea,
      path: "/authority/manage-elections",
    },
    {
      label: "Candidate Management",
      icon: FaUsers,
      path: "/authority/candidate-management",
    },
    { label: "Notices", icon: FaBell, path: "/authority/notices" },
    {
      label: "Election Management",
      icon: FaClipboardList,
      hasSubmenu: true,
      isOpen: electionSubOpen,
      toggle: () => setElectionSubOpen(!electionSubOpen),
      submenu: [
        {
          label: "Rules for Candidate Apply",
          path: "/authority/election-management/candidate-rules",
        },
        {
          label: "Rules for Voters",
          path: "/authority/election-management/voter-rules",
        },
      ],
    },
    {
      label: "Result Manage",
      icon: FaChartBar,
      hasSubmenu: true,
      isOpen: resultSubOpen,
      toggle: () => setResultSubOpen(!resultSubOpen),
      submenu: [
        {
          label: "Count Results",
          path: "/authority/result-manage",
        },
        {
          label: "View Result",
          path: "/authority/view-result",
        },
      ],
    },
  ];

  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Logo></Logo>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={item.toggle}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors
                        ${item.isOpen ? "bg-gray-700 text-blue-400" : "hover:bg-gray-700 text-gray-300 hover:text-white"}`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                      {item.isOpen ? (
                        <FaChevronDown className="w-4 h-4" />
                      ) : (
                        <FaChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {/* Submenu */}
                    <ul
                      className={`overflow-hidden transition-all duration-300 ${
                        item.isOpen ? "max-h-48 mt-1" : "max-h-0"
                      }`}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={subItem.path}
                            end={subItem.path === '/authority'}
                            onClick={handleLinkClick}
                            className={({ isActive }) =>
                              `flex items-center gap-3 pl-12 pr-4 py-2 text-sm rounded-lg transition-colors
                              ${
                                isActive
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
                              }`
                            }
                          >
                            {subItem.icon && (
                              <subItem.icon className="w-4 h-4" />
                            )}
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-700">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <FaHome className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            {/* Left: Hamburger Menu (Mobile) + Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <FaBars className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
                Vote Ballot - Authority Dashboard
              </h1>
            </div>

            {/* Right: Profile + Logout */}
            <div className="flex items-center gap-4">
              {/* Profile Section */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">
                    {user?.name || user?.displayName || "Authority"}
                  </p>
                  <p className="text-xs text-gray-500">Authority</p>
                </div>
                <div className="relative">
                  <img
                    src={
                      user?.photo ||
                      user?.photoURL ||
                      "https://i.pravatar.cc/150?img=33"
                    }
                    alt={user?.name || user?.displayName}
                    className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthorityLayout;
