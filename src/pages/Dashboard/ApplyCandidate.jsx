import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaUserTie, FaUpload, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../loading/Loading";
import EmptyState from "../../components/EmptyState";

const ApplyCandidate = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    electionId: "",
    position: "",
    studentId: "",
    manifesto: "",
    experience: "",
    whyChooseMe: "",
  });

  // ---------------- FETCH ELECTIONS ----------------
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const [upcoming] = await Promise.all([
          axiosSecure.get("/elections/upcoming"),
        ]);
        setElections([...upcoming.data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchElections();
  }, [axiosSecure]);

  // ---------------- FORM CHANGE ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "electionId") {
      const election = elections.find((el) => el._id === value);
      setSelectedElection(election);
    }
  };

  // ---------------- IMAGE CHANGE ----------------
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

  // ---------------- IMAGE UPLOAD ----------------
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosSecure.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data; // { imageUrl, publicId }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.electionId || !formData.position || !formData.manifesto) {
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
        name: user?.name || user?.displayName,
        email: user?.email,
        photo: photoURL,
        electionTitle: selectedElection?.title,
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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FaUserTie className="text-white text-xl" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Apply for Candidate</h1>
              <p className="text-purple-100">
                Submit your candidacy application
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        {elections.length > 0 ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Candidate Photo */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-100 bg-gray-100">
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
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
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

            {/* Applicant Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium text-gray-700 mb-2">
                Applicant Information
              </h3>
              <p className="text-gray-600">{user?.name || user?.displayName}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              {user?.department && (
                <p className="text-gray-500 text-sm">{user.department}</p>
              )}
            </div>

            {/* Election Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Election <span className="text-red-500">*</span>
              </label>
              <select
                name="electionId"
                value={formData.electionId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose an election</option>
                {elections.map((election) => (
                  <option key={election._id} value={election._id}>
                    {election.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                disabled={!selectedElection}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
              >
                <option value="">
                  {selectedElection
                    ? "Select position"
                    : "Select election first"}
                </option>

                {selectedElection?.positions?.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Id <span className="text-red-500">*</span>
              </label>
            <input
              className="w-full border p-2 rounded"
              name="studentId"
              value={formData.Id}
              onChange={handleChange}
              placeholder="Enter your ID"
              required
            />
            </div>

            {/* Manifesto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manifesto <span className="text-red-500">*</span>
              </label>
              <textarea
                name="manifesto"
                value={formData.manifesto}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your vision and plans for this position..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relevant Experience
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={3}
                placeholder="List your previous leadership roles or relevant experience..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Why Choose Me */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why Should Voters Choose You?
              </label>
              <textarea
                name="whyChooseMe"
                value={formData.whyChooseMe}
                onChange={handleChange}
                rows={3}
                placeholder="Convince voters why you are the best candidate..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Submit Application
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Your application will be reviewed by the admin before approval.
            </p>
          </form>
        ) : (
          <EmptyState
            icon={FaUserTie}
            title="No Elections Available"
            message="There are no elections available for candidate applications at the moment."
          />
        )}
      </div>
    </div>
  );
};

export default ApplyCandidate;
