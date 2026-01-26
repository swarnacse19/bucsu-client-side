import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate, Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success("Login Successfully!");
        setTimeout(() => {
          navigate(location.state ? location.state : "/");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.message || "Invalid credentials");
      })
      .finally(() => setLoading(false));
  };

  const inputClass = "input input-bordered w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all rounded-xl";

  return (
    <div className="flex items-center justify-center min-h-[90vh] py-10 px-4">
      {/* Container Card */}
      <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] w-full max-w-4xl overflow-hidden border border-slate-100">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Side: Branding/Illustration */}
          <div className="md:w-5/12 bg-indigo-600 p-10 text-white flex flex-col justify-center items-center text-center space-y-6">
            <div className="text-7xl bg-white/20 p-8 rounded-4xl backdrop-blur-md shadow-inner animate-pulse">
              🔐
            </div>
            <div>
              <h2 className="text-3xl font-black mb-2">Welcome Back!</h2>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Log in to access your secure voting dashboard and participate in the democratic process.
              </p>
            </div>
            {/* Minimal Stat/Info */}
            <div className="bg-indigo-700/50 p-4 rounded-2xl w-full border border-indigo-400/30 text-xs text-indigo-100 italic">
              "Your vote is private and secure."
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-7/12 p-8 lg:p-14 bg-white">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Login</h2>
              <p className="text-slate-500 mt-2 font-medium">Please enter your credentials</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="form-control">
                <label className="label-text font-bold text-slate-700 mb-2 ml-1 uppercase text-xs tracking-widest">
                  Email Address
                </label>
                <div className="relative">
            
                  <input
                    type="email"
                    name="email"
                    placeholder="name@university.edu"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
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

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full h-14 rounded-2xl text-white text-lg font-bold bg-indigo-600 hover:bg-indigo-700 border-none shadow-lg shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-95"
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

            {/* Divider */}
            <div className="divider my-8 text-slate-300 text-xs font-bold">OR</div>

            {/* Register Link */}
            <p className="text-center text-slate-500 font-medium">
              New to the platform?{' '}
              <Link to="/register" className="text-indigo-600 hover:underline decoration-2 underline-offset-4 font-bold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Optional: Simple Toast UI alignment check */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Login;