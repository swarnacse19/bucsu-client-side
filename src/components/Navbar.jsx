import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Logo from "./Logo";
import { toast, ToastContainer } from "react-toastify";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About Us", id: "about" },
  { name: "Why Vote Ballot", id: "why" },
  { name: "Stories", id: "stories" },
  { name: "Contact Us", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("Logout Successfully!");
      navigate("/");
    });
  };

  const avatar = user?.photoURL;

  const dashboardPath =
    role === "student"
      ? "/dashboard"
      : role === "authority"
        ? "/authority"
        : "/admin";

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-4">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleScroll(link.id)}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link to={dashboardPath} className="text-sm font-medium">
                  Dashboard
                </Link>

                <img
                  src={avatar}
                  className="w-8 h-8 rounded-full border"
                />

                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t px-4 py-3 space-y-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleScroll(link.id)}
              className="block w-full text-left py-2"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}

      <ToastContainer />
    </nav>
  );
};

export default Navbar;
