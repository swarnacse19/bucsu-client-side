import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaBars, FaSignOutAlt, } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import Logo from './Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Why Vote Ballot', path: '/why-vote-ballot' },
  { name: 'Stories', path: '/stories' },
  { name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try { await logOut(); } catch (e) { console.error(e); }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-[15px] font-medium transition-all duration-300 ${
                    isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 bg-slate-50 p-1.5 pr-4 rounded-full border border-slate-200">
                <img src={user?.photoURL || 'https://i.pravatar.cc/150'} className="w-9 h-9 rounded-full ring-2 ring-white object-cover" alt="user" />
                <Link to="/dashboard" className="text-sm font-semibold text-slate-700 hover:text-indigo-600">Dashboard</Link>
                <button onClick={handleLogout} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"><FaSignOutAlt /></button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 font-medium hover:text-indigo-600">Login</Link>
                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-indigo-100 transition-all active:scale-95">Join Now</Link>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-slate-600"><FaBars size={24} /></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;