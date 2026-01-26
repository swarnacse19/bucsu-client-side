import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Logo from "./Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully!");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li><Link to="/notices" className="hover:text-indigo-600 transition-colors">📢 Notices</Link></li>
      <li><Link to="/report-issue" className="hover:text-indigo-600 transition-colors">⚠️ Report Issue</Link></li>
      {user?.role === "student" && (
        <>
          <li><Link to="/student/dashboard">📊 Dashboard</Link></li>
          <li><Link to="/student/elections">🗳️ Elections</Link></li>
        </>
      )}
      {/* ... অন্য রোলগুলো এখানে যোগ করুন ... */}
    </>
  );

  return (
    <nav className="navbar bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-4 lg:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white rounded-2xl w-52 font-semibold">
            {navLinks}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-semibold text-slate-600">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-500 uppercase leading-none">{user.role}</p>
              <p className="text-sm font-medium text-slate-800">{user.name || 'User'}</p>
            </div>
            <button onClick={handleLogOut} className="btn btn-error btn-sm rounded-xl text-white normal-case shadow-md">Logout</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm font-bold text-indigo-600">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm rounded-xl px-6 text-white shadow-lg shadow-indigo-200 border-none bg-indigo-600 hover:bg-indigo-700 transition-all">Join Now</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;