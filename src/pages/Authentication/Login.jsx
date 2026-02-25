import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import { useLocation, useNavigate, Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { signIn, user } = useAuth();
  const { role, isLoading } = useUserRole(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  
  const getDashboardPath = (userRole) => {
    if (userRole === "student" || userRole === "voter") {
      return "/dashboard";
    } else if (userRole === "authority") {
      return "/authority";
    } else {
      
      return "/admin";
    }
  };

  useEffect(() => {
    
    if (user && !isLoading) {
      const dest = location.state || getDashboardPath(role);
      
      const timer = setTimeout(() => {
        navigate(dest, { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [user, role, isLoading, navigate, location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      toast.success("Login Successfully! Redirecting...");
    } catch (error) {
      toast.error(error.message || "Invalid credentials");
      setLoading(false);
    }
  };

  const inputClass = "input input-bordered w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all rounded-xl";

  return (
    <div className="flex items-center justify-center min-h-[90vh] py-10 px-4">
      <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] w-full max-w-4xl overflow-hidden border border-slate-100">
        <div className="flex flex-col md:flex-row">

          {/* Left Side: Branding */}
          <div className="md:w-5/12 bg-indigo-600 p-10 text-white flex flex-col justify-center items-center text-center space-y-6">
            <div className="text-7xl bg-white/20 p-8 rounded-4xl backdrop-blur-md shadow-inner animate-pulse">
              🔐
            </div>
            <div>
              <h2 className="text-3xl font-black mb-2">Welcome Back!</h2>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Access your secure dashboard and manage your activities.
              </p>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-7/12 p-8 lg:p-14 bg-white">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Login</h2>
              <p className="text-slate-500 mt-2 font-medium">Please enter your credentials</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-control">
                <label className="label-text font-bold text-slate-700 mb-2 ml-1 uppercase text-xs tracking-widest">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@university.edu"
                  className={inputClass}
                  required
                />
              </div>

              <div className="form-control">
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="label-text font-bold text-slate-700 uppercase text-xs tracking-widest">
                    Password
                  </label>
                  <Link to="/forgot-password" size="xs" className="text-xs font-bold text-indigo-600 hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className={inputClass}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || (user && isLoading)}
                  className="btn btn-primary w-full h-14 rounded-2xl text-white text-lg font-bold bg-indigo-600 hover:bg-indigo-700 border-none shadow-lg shadow-indigo-200 transition-all"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner"></span> Authenticating...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            <div className="divider my-8 text-slate-300 text-xs font-bold">OR</div>

            <p className="text-center text-slate-500 font-medium">
              New to the platform?{' '}
              <Link to="/register" className="text-indigo-600 hover:underline font-bold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;