import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaUserTie, FaUpload, FaPaperPlane, FaBuilding } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../loading/Loading";

const ApplyDept = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [election, setElection] = useState(null);
  const [isVoter, setIsVoter] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    position: "",
    manifesto: "",
    experience: "",
    whyChooseMe: "",
    fathersName: "",
    mothersName: "",
    phone: "",
    emergencyPhone: "",
    presentAddress: "",
    permanentAddress: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;

      try {
        const electionRes = await axiosSecure.get(`/elections/${id}`);
        setElection(electionRes.data);

        // Fetch Fresh User Data
        const userRes = await axiosSecure.get(`/users/${user.email}`);
        const freshUser = userRes.data;

        if (freshUser?.approvedElections?.includes(id)) {
          setIsVoter(true);
        } else {
          setIsVoter(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load election details");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [id, axiosSecure, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select a valid image");
    }

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image size must be under 2MB");
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosSecure.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.position ||
      !formData.manifesto ||
      !formData.fathersName ||
      !formData.mothersName ||
      !formData.phone ||
      !formData.emergencyPhone ||
      !formData.presentAddress ||
      !formData.permanentAddress
    ) {
      return toast.error("Please fill in all required fields");
    }

    setSubmitting(true);

    try {
      let photoURL = user?.photo || user?.photoURL || "";

      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        photoURL = uploadRes.imageUrl;
      }

      const applicationData = {
        ...formData,
        electionId: id,
        name: user?.name || user?.displayName,
        email: user?.email,
        studentId: user?.studentId,
        department: user?.department,
        photo: photoURL,
        electionTitle: election?.title,
        status: "pending",
        appliedAt: new Date(),
      };

      await axiosSecure.post("/candidate-applications", applicationData);

      toast.success("Application submitted successfully!");
      navigate("/dashboard/my-applications");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  if (!isVoter) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100">
          <h2 className="text-2xl font-bold mb-2">Not Eligible</h2>
          <p>
            You must be an approved voter for this election before applying as a
            candidate.
          </p>
          <button
            onClick={() => navigate("/dashboard/become-voter")}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Become a Voter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-white text-xl" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">
                Apply for {election?.title}
              </h1>
              <p className="text-emerald-100">Department Election Candidacy</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 p-6">
          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-2">
                Election Authorities
              </h3>
              <ul className="space-y-1 text-sm text-slate-600">
                {election?.authorities?.length > 0 ? (
                  election.authorities.map((auth, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span> {auth}
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400 italic">
                    No specific authorities listed
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-2">
                Available Positions
              </h3>
              <ul className="space-y-1 text-sm text-slate-600">
                {election?.positions?.length > 0 ? (
                  election.positions.map((pos, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span> {pos}
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400 italic">No positions listed</li>
                )}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Candidate Photo */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-emerald-100 bg-gray-100">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : user?.photo || user?.photoURL ? (
                      <img
                        src={user.photo || user.photoURL}
                        alt="Current"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FaUpload size={24} />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-colors">
                    <FaUpload />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <span className="text-sm text-gray-500 mt-2">
                  Upload Candidate Photo
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="fathersName"
                    value={formData.fathersName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Father's Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    name="mothersName"
                    value={formData.mothersName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Mother's Name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Emergency Phone *
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Present Address *
                </label>
                <textarea
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Current address..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Permanent Address *
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Permanent address..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Position *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select Position</option>
                  {election?.positions?.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Manifesto *
                </label>
                <textarea
                  name="manifesto"
                  value={formData.manifesto}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Your vision..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Relevant experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Why Choose Me?
                </label>
                <textarea
                  name="whyChooseMe"
                  value={formData.whyChooseMe}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Persuade voters..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <FaPaperPlane /> Submit Application
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyDept;
