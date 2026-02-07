import { useEffect, useState } from 'react';
import { FaClock, FaUsers, FaArrowRight, FaVoteYea } from 'react-icons/fa';
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
const ElectionCard = ({ election, userId, onVote }) => {
  const axiosSecure = useAxios();
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
          ) : (
            <button
              onClick={() => onVote(election._id)}
              className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Vote Now <FaArrowRight />
            </button>
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
  const userId = user?.uid;

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

      {/* Elections Grid */}
      {elections.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {elections.map(election => (
            <ElectionCard
              key={election._id}
              election={election}
              userId={userId}
              onVote={setActiveElectionId}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <EmptyState
            icon={FaVoteYea}
            title="No Ongoing Elections"
            message="There are no active elections at the moment."
          />
        </div>
      )}
    </div>
  );
};

export default OngoingElections;
