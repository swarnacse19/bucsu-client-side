import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
// import api from '../../config/axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    department: '',
    session: '',
    name: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { confirmPassword, ...data } = formData;
      // await api.post('/auth/register', data);
      toast.success('Registration successful! Please verify your email.');
      // navigate('/verify-email', { state: { email: formData.email } });
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "input input-bordered w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all rounded-xl";

  return (
    <div className="flex items-center justify-center min-h-[90vh] py-10 px-4">
      <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] w-full max-w-4xl overflow-hidden border border-slate-100">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Side: Illustration or Info */}
          <div className="md:w-1/3 bg-indigo-600 p-10 text-white flex flex-col justify-center items-center text-center space-y-4">
            <div className="text-6xl bg-white/20 p-6 rounded-3xl backdrop-blur-md">📝</div>
            <h2 className="text-2xl font-bold">Join the Democracy</h2>
            <p className="text-indigo-100 text-sm italic">"Your vote is your voice. Register today to shape the future of our campus."</p>
          </div>

          {/* Right Side: Form */}
          <div className="md:w-2/3 p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-800">Create Account</h2>
              <p className="text-slate-500 mt-1">Please fill in the details to register as a student</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className={inputClass}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Student ID */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">Student ID</label>
                  <div className="relative">
                    
                    <input
                      type="text"
                      placeholder="ID Number"
                      className={inputClass}
                      value={formData.studentId}
                      onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">Email Address</label>
                  <div className="relative">
                    
                    <input
                      type="email"
                      placeholder="student@varsity.edu"
                      className={inputClass}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">Phone Number</label>
                  <div className="relative">
                   
                    <input
                      type="tel"
                      placeholder="017XXXXXXXX"
                      className={inputClass}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">Department</label>
                  <div className="relative">
                    
                    <input
                      type="text"
                      placeholder="e.g. CSE"
                      className={inputClass}
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Session */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">Session</label>
                  <div className="relative">
                    
                    <input
                      type="text"
                      placeholder="2020-21"
                      className={inputClass}
                      value={formData.session}
                      onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">Password</label>
                  <div className="relative">
                    
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={inputClass}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">Confirm Password</label>
                  <div className="relative">
                    
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={inputClass}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-full h-14 rounded-2xl text-white text-lg font-bold bg-indigo-600 hover:bg-indigo-700 border-none shadow-lg shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner"></span> Creating Account...
                    </span>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>
            </form>

            <p className="text-center mt-8 text-slate-500 font-medium">
              Already a member?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline decoration-2 underline-offset-4">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;