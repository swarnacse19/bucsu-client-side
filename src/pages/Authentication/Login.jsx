import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // console.log({ email, password });
    signIn(email, password)
      .then((result) => {
        //console.log(result.user.uid);
        toast.success("Login Successfully!");
        setTimeout(
          () => navigate(`${location.state ? location.state : "/"}`),
          3000
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-2 text-primary">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Please enter your details to login.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 z-10">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10 focus:outline-primary"
                  required
                />
              </div>
            </div>

            {/* Password Field with Toggle */}
            <div className="form-control">
              <label className="label flex justify-between">
                <span className="label-text font-semibold">Password</span>
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary"
                >
                  Forgot password?
                </a>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 z-10">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10 focus:outline-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-primary"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full normal-case text-lg">
                Login
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Login */}
          {/* <SocialLogin></SocialLogin> */}

          {/* Register Link */}
          <p className="text-center mt-6 text-sm">
            New to this site?
            <a
              href="/register"
              className="link link-primary font-semibold ml-1"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Login;
