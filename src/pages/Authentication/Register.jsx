import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxios from "../../hooks/useAxios";

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
    role: 'student',
    photoURL: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { createUser, updateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  // ---------------- IMAGE CHANGE ----------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select a valid image file");
    }

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image must be under 2MB");
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ---------------- IMAGE UPLOAD ----------------
  const uploadImage = async (file) => {
    const imgForm = new FormData();
    imgForm.append("image", file);

    const res = await axiosInstance.post("/upload", imgForm, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.imageUrl;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      let photoURL = "";

      if (imageFile) {
        photoURL = await uploadImage(imageFile);
      }

      const { confirmPassword, ...data } = {
        ...formData,
        photoURL,
      };

      const result = await createUser(data.email, data.password);

      // save user in database
      const userInfo = {
        email: data.email,
        role: data.role,
        created_at: new Date().toISOString(),
        name: data.name,
        session: data.session,
        phone: data.phone,
        department: data.department,
        studentId: data.studentId,
        firebaseUid: result.user.uid,
        photo: photoURL,
      };

      await axiosInstance.post("/users", userInfo);

      // update firebase profile
      await updateUser({
        displayName: data.name,
        photoURL: photoURL,
      });

      toast.success("Registration successful!");
      setTimeout(
        () => navigate(`${location.state ? location.state : "/"}`),
        3000
      );
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  const inputClass =
    "input input-bordered w-full bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all rounded-xl";

  return (
    <div className="flex items-center justify-center min-h-[90vh] py-10 px-4">
      <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] w-full max-w-4xl overflow-hidden border border-slate-100">
        <div className="flex flex-col md:flex-row">

          {/* Left Side */}
          <div className="md:w-1/3 bg-indigo-600 p-10 text-white flex flex-col justify-center items-center text-center space-y-4">
            <div className="text-6xl bg-white/20 p-6 rounded-3xl backdrop-blur-md">📝</div>
            <h2 className="text-2xl font-bold">Join the Democracy</h2>
            <p className="text-indigo-100 text-sm italic">
              "Your vote is your voice. Register today to shape the future of our campus."
            </p>
          </div>

          {/* Right Side */}
          <div className="md:w-2/3 p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-800">Create Account</h2>
              <p className="text-slate-500 mt-1">
                Please fill in the details to register as a student
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Full Name */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Student ID */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={inputClass}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                {/* Department */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Department
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  />
                </div>

                {/* Session */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Session
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.session}
                    onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                    required
                  />
                </div>

                {/* Image Upload (NEW, design untouched) */}
                <div className="form-control md:col-span-2">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className={inputClass}
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-20 h-20 rounded-full mt-3 object-cover"
                    />
                  )}
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={inputClass}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-600"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="form-control">
                  <label className="label-text font-bold text-slate-700 mb-1 ml-1">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={inputClass}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full h-14 rounded-2xl text-white text-lg font-bold bg-indigo-600 hover:bg-indigo-700 border-none shadow-lg shadow-indigo-200"
                >
                  Create Account
                </button>
              </div>
            </form>

            <p className="text-center mt-8 text-slate-500 font-medium">
              Already a member?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Register;
