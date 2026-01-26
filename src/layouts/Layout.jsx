import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import Logo from "../components/Logo";

const Layout = () => {
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
      {/* ... add other roles similarly ... */}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Large Decorative Icons */}
        <span className="absolute top-[15%] -left-10 text-[15rem] opacity-[0.03] rotate-12 select-none">🗳️</span>
        <span className="absolute bottom-[10%] -right-10 text-[20rem] opacity-[0.03] -rotate-12 select-none">⚖️</span>
        <span className="absolute top-[50%] left-[80%] text-[10rem] opacity-[0.03] select-none">✅</span>
        
        {/* Soft Color Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-4 lg:px-12">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white rounded-2xl w-52 font-semibold">
              {navLinks}
            </ul>
          </div>
          <Logo></Logo>
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
            <>
              <Link to="/login" className="btn btn-ghost btn-sm font-bold text-indigo-600">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm rounded-xl px-6 text-white shadow-lg shadow-indigo-200 border-none bg-indigo-600 hover:bg-indigo-700 transition-all">Join Now</Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 py-8 lg:py-12 flex-grow relative">
          
          {/* Quick Info Bar - (Responsive design element) */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-white/40 backdrop-blur-sm border border-white p-4 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-xl">🔒</div>
                <div><h4 className="font-bold text-slate-800">Secure</h4><p className="text-xs text-slate-500">End-to-end Encrypted</p></div>
             </div>
             <div className="bg-white/40 backdrop-blur-sm border border-white p-4 rounded-3xl flex items-center gap-4 hidden md:flex">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl">⚡</div>
                <div><h4 className="font-bold text-slate-800">Fast</h4><p className="text-xs text-slate-500">Real-time Counting</p></div>
             </div>
             <div className="bg-white/40 backdrop-blur-sm border border-white p-4 rounded-3xl flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-xl">🤝</div>
                <div><h4 className="font-bold text-slate-800">Transparent</h4><p className="text-xs text-slate-500">Open Auditing</p></div>
             </div>
          </div>

          {/* Page Content Holder */}
          <div className="bg-green-100 backdrop-blur-md border border-white/50 shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] p-6 md:p-10 min-h-[60vh]">
            <h1>Hello! ekhane image ba onno kono design add korbi tora, jeta dekhte shundor lage</h1>
          </div>
        </div>
      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-white text-2xl font-bold mb-4">🗳️ VoteBallot</h3>
            <p className="max-w-xs leading-relaxed">The next generation of voting management. Transparent, secure, and accessible for every student.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 italic">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
              <li><Link to="/notices" className="hover:text-indigo-400">Notices</Link></li>
              <li><Link to="/report-issue" className="hover:text-indigo-400">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 italic">Platform</h4>
            <div className="badge badge-primary bg-indigo-600 p-3">v2.0.1 Stable</div>
            <p className="text-xs mt-4">Built with React & DaisyUI</p>
          </div>
        </div>
        <div className="container mx-auto border-t border-slate-800 mt-10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} University Election Commission. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;