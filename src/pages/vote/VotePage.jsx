import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaCheckCircle, FaUserCircle, FaArrowLeft } from "react-icons/fa";
import Loading from "../../loading/Loading";

const VotePage = ({ electionId: propElectionId, userId: propUserId, onBack }) => {
  const params = useParams();
  const electionId = propElectionId || params.electionId;

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const [grouped, setGrouped] = useState({});
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [election, setElection] = useState(null);

  const userId = propUserId || user?.email; 
  useEffect(() => {
    if (!electionId || !userId) { 
      if (!electionId && !params.electionId) {
        setLoading(false);
      }
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const electionRes = await axiosSecure.get(`/elections/${electionId}`);
        setElection(electionRes.data);

        const checkRes = await axiosSecure.get(`/check?electionId=${electionId}&userId=${userId}`); 
        if (checkRes.data.voted) {
          setHasVoted(true);
        }

        const candidatesRes = await axiosSecure.get(`/candidates/${electionId}`);
        const group = {};
        candidatesRes.data.forEach((c) => {
          if (!group[c.position]) group[c.position] = [];
          group[c.position].push(c);
        });
        setGrouped(group);
      } catch (err) {
        console.error("Error fetching vote page data:", err);
        toast.error("Failed to load page data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, electionId, userId, params.electionId]); 

  const handleSelect = (position, studentId) => {
    if (hasVoted) return;
    setSelected((prev) => ({ ...prev, [position]: studentId }));
  };

  const handleSubmit = async () => {
    if (hasVoted) return;

    const positions = Object.keys(grouped);

    if (positions.length !== Object.keys(selected).length) {
      return toast.error("Please cast your vote for every position");
    }

    const votes = Object.entries(selected).map(([position, studentId]) => {
      const candidate = grouped[position].find(c => c.studentId === studentId);
      return {
        position,
        studentId,
        name: candidate?.name,
        photo: candidate?.photo
      };
    });

    try {
      await axiosSecure.post("/votes", {
        electionId,
        userId: userId,
        votes,
      });

      toast.success("Vote submitted successfully");
      setHasVoted(true);
      setTimeout(() => {
        if (onBack) {
          onBack();
        } else {
          navigate("/dashboard");
        }
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit vote");
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold mb-2 transition-colors"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            {election?.title || "Cast Your Vote"}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Choose your candidates for each position
          </p>
        </div>

        {hasVoted && (
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2 font-bold animate-pulse">
            <FaCheckCircle /> You Already Voted
          </div>
        )}
      </div>

      {Object.keys(grouped).map((position) => (
        <div key={position} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-1 bg-indigo-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-slate-700 uppercase tracking-widest">{position}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grouped[position].map((c) => (
              <div
                key={c.studentId}
                onClick={() => handleSelect(position, c.studentId)}
                className={`group relative bg-white rounded-3xl p-6 border-2 transition-all cursor-pointer overflow-hidden ${selected[position] === c.studentId
                  ? "border-indigo-600 shadow-xl shadow-indigo-100 scale-[1.02]"
                  : "border-slate-100 hover:border-indigo-200 shadow-sm"
                  } ${hasVoted ? "opacity-75 cursor-default grayscale-[0.5]" : ""}`}
              >
                {selected[position] === c.studentId && (
                  <div className="absolute top-4 right-4 text-indigo-600 animate-bounce">
                    <FaCheckCircle size={24} />
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  <div className={`relative p-1 rounded-full border-2 mb-4 transition-colors ${selected[position] === c.studentId ? "border-indigo-600" : "border-slate-100"
                    }`}>
                    {c.photo ? (
                      <img
                        src={c.photo}
                        alt={c.name}
                        className="w-24 h-24 rounded-full object-cover shadow-inner"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <FaUserCircle size={64} />
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-sm font-bold text-indigo-500 uppercase tracking-wider mt-1">
                    ID: {c.studentId}
                  </p>

                  <div className={`mt-6 w-full py-3 rounded-xl font-bold transition-all ${selected[position] === c.studentId
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-slate-50 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                    }`}>
                    {selected[position] === c.studentId ? "Selected" : "Select Candidate"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-8">
        <button
          onClick={handleBack}
          className="flex-1 h-14 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={hasVoted || Object.keys(selected).length < Object.keys(grouped).length}
          className={`flex-2 h-14 rounded-2xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${hasVoted
            ? "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:shadow-none"
            }`}
        >
          {hasVoted ? (
            <>
              <FaCheckCircle /> Vote Submitted
            </>
          ) : (
            "Complete Voting Process"
          )}
        </button>
      </div>

      {hasVoted && (
        <p className="text-center text-emerald-600 font-bold animate-bounce mt-4">
         Thank you for exercising your democratic right!
        </p>
      )}
    </div>
  );
};

export default VotePage;
