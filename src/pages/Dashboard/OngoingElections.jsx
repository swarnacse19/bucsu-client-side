import { useEffect, useState } from 'react';
import { FaClock, FaUsers, FaArrowRight, FaVoteYea } from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import Loading from '../../loading/Loading';
import EmptyState from '../../components/EmptyState';
import { getTimeRemaining } from '../../utils/formateDate';
import VotePage from '../vote/VotePage';

/* ---------------- Countdown Timer ---------------- */
const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.isEnded) {
    return <span className="text-red-600 font-medium">Election Ended</span>;
  }

  return (
    <div className="flex gap-2">
      {['days', 'hours', 'minutes', 'seconds'].map((key) => (
        <div
          key={key}
          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-center"
        >
          <p className="text-xl font-bold">{timeLeft[key]}</p>
          <p className="text-xs capitalize">{key}</p>
        </div>
      ))}
    </div>
  );
};

/* ---------------- Election Card ---------------- */
const ElectionCard = ({ election, userId, onVote, isApproved }) => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const [voted, setVoted] = useState(false);
  const [checking, setChecking] = useState(true);
  // console.log(onVote);

  useEffect(() => {
    if (!userId) return;

    axiosSecure
      .get(`/check?electionId=${election._id}&userId=${userId}`)
      .then(res => setVoted(res.data.voted))
      .finally(() => setChecking(false));
  }, [axiosSecure, election._id, userId]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Live Now
          </span>
          <span className="text-white/80 text-sm capitalize">
            {election.type} Election
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {election.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {election.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <FaClock className="text-blue-500" />
          <span>Time Remaining:</span>
        </div>

        <CountdownTimer endDate={election.endDate} />

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaUsers className="text-gray-400" />
            <span>{election.positions?.length || 0} Positions</span>
          </div>

          {checking ? (
            <span className="text-sm text-gray-400">Checking...</span>
          ) : voted ? (
            <button
              disabled
              className="px-5 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
            >
              Voted
            </button>
          ) : isApproved ? (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/dashboard/election/${election._id}`)}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => onVote(election._id)}
                className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Vote Now <FaArrowRight />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/dashboard/election/${election._id}`)}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
              >
                View Details
              </button>
              <span className="text-xs text-amber-600 bg-amber-50 p-2 rounded-lg border border-amber-100 self-center">
                Need Registration to Vote
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Main Component ---------------- */
const OngoingElections = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const userId = user?.email;
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);
  const [activeElectionId, setActiveElectionId] = useState(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await axiosSecure.get('/elections/ongoing');
        setElections(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, [axiosSecure]);

  const selectedCategory = searchParams.get("category") || "all";
  const categories = ["all", ...new Set(elections.map(e => e.type))];

  const filteredElections = selectedCategory === "all"
    ? elections
    : elections.filter(e => e.type === selectedCategory);

  const handleCategoryChange = (category) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (category === "all") {
        newParams.delete("category");
      } else {
        newParams.set("category", category);
      }
      return newParams;
    });
  };

  if (loading) {
    return <Loading fullScreen={false} message="Loading elections..." />;
  }

  /* ---- Vote Page Render ---- */
  if (activeElectionId) {
    return (
      <VotePage
        electionId={activeElectionId}
        userId={userId}
        onBack={() => setActiveElectionId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <FaVoteYea className="text-green-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Ongoing Elections
            </h1>
            <p className="text-gray-500">
              Cast your vote in active elections
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-colors ${selectedCategory === cat
                ? "bg-green-600 text-white shadow-md shadow-green-200"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                }`}
            >
              {cat === "all" ? "All Elections" : `${cat} Elections`}
            </button>
          ))}
        </div>
      )}

      {/* Elections Grid */}
      {filteredElections.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredElections.map(election => (
            <ElectionCard
              key={election._id}
              election={election}
              userId={userId}
              onVote={setActiveElectionId}
              isApproved={user?.approvedElections?.includes(election._id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <EmptyState
            icon={FaVoteYea}
            title="No Ongoing Elections"
            message={`There are no active ${selectedCategory !== 'all' ? selectedCategory + ' ' : ''}elections at the moment.`}
          />
        </div>
      )}
    </div>
  );
};

export default OngoingElections;
