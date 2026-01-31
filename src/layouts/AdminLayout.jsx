import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import {
  FaVoteYea,
  FaUsers,
  FaClipboardList,
  FaChartPie,
  FaCog,
  FaBell,
  FaHome,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaTachometerAlt,
  FaPlus,
  FaHistory,
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Logo from '../components/Logo';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt },
    { name: 'Manage Elections', path: '/admin/manage-elections', icon: FaVoteYea },
    { name: 'Create Election', path: '/admin/create-election', icon: FaPlus },
    { name: 'Candidate Management', path: '/admin/candidate-management', icon: FaClipboardList },
    { name: 'Users', path: '/admin/users', icon: FaUsers },
    { name: 'Notices', path: '/admin/notices', icon: FaBell },
    { name: 'Results', path: '/admin/view-result', icon: FaChartPie },
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
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Logo></Logo>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src={user?.photo || user?.photoURL || 'https://i.pravatar.cc/150?img=1'}
              alt={user?.name || user?.displayName}
              className="w-10 h-10 rounded-full border-2 border-indigo-400 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{user?.name || user?.displayName || 'Admin'}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/30 transition-colors"
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
            <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
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
    </div>
  );
};

export default AdminLayout;
