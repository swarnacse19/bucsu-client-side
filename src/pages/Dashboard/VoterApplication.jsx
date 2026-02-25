import { useState, useEffect } from "react";
import { FaUserPlus, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";

const VoterApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Form States
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState("");
  const [formData, setFormData] = useState({
    session: "",
    batch: "",
    studentId: user?.studentId || "",
    phone: "",
    department: user?.department || "",
    district: "",
    reason: "",
  });

  const districts = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Rajshahi",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
    "Cumilla",
    "Gazipur",
    "Narayanganj",
  ];

  // Fetch upcoming elections
  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axiosSecure.get("/elections/upcoming");
        setElections(res.data);
      } catch (error) {
        console.error("Failed to fetch elections", error);
      }
    };
    fetchElections();
  }, [axiosSecure]);

  // Sync department and session from user profile
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        department: user.department || prev.department,
        session: user.session || prev.session,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const applicationData = {
        electionId: selectedElection,
        name: user?.name || user?.displayName,
        email: user?.email,
        photo: user?.photo || user?.photoURL,
        ...formData,
      };

      await axiosSecure.post("/voter-applications", applicationData);
      toast.success("Application submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit application");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FaUserPlus className="text-white text-xl" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Become a Voter</h1>
              <p className="text-blue-100">Apply to get voting rights</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700">
            <FaCheckCircle className="mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Why become a voter?</h3>
              <p className="text-sm text-blue-600 mt-1">
                As a verified voter, you can participate in university
                elections, cast your vote for candidates, and help shape the
                future of student leadership.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Election Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Election *
              </label>
              <select
                value={selectedElection}
                onChange={(e) => {
                  const newElectionId = e.target.value;
                  setSelectedElection(newElectionId);
                  // Clear district if switched to non-district election
                  const newElection = elections.find(
                    (el) => el._id === newElectionId,
                  );
                  if (newElection?.type !== "district") {
                    setFormData((prev) => ({ ...prev, district: "" }));
                  }
                }}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an election...</option>
                {elections.map((election) => (
                  <option key={election._id} value={election._id}>
                    {election.title} ({election.type})
                  </option>
                ))}
              </select>
            </div>

            {/* User Info (Read Only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Name
                </label>
                <div className="font-medium text-gray-800">
                  {user?.name || user?.displayName}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Email
                </label>
                <div className="font-medium text-gray-800">{user?.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Session */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Session
                </label>
                <div className="font-medium text-gray-800">
                  {user?.session || "Not provided"}
                </div>
              </div>

              {/* Department */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Department
                </label>
                <div className="font-medium text-gray-800">
                  {user?.department || "Not provided"}
                </div>
              </div>

              {/* Batch */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Batch
                </label>
                <div className="font-medium text-gray-800">
                  {user?.batch || "Not provided"}
                </div>
              </div>
              {/* Phone */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Phone
                </label>
                <div className="font-medium text-gray-800">
                  {user?.phone || "Not provided"}
                </div>
              </div>

              {/* District - Only show for district elections */}
              {elections.find((e) => e._id === selectedElection)?.type ===
                "district" && (
                <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg border border-transparent focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                  <label className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-none p-0 text-gray-800 font-medium focus:ring-0 focus:outline-none"
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why do you want to become a voter?
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Briefly explain your eligibility..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
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
                  Submitting Application...
                </>
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
  );
};

export default VoterApplication;
