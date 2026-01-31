import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FaClock, FaUsers, FaArrowRight, FaVoteYea } from 'react-icons/fa';
import EmptyState from '../../components/EmptyState';
import { getTimeRemaining } from '../../utils/formateDate';
import useAxios from '../../hooks/useAxios';
import Loading from '../../loading/Loading';

// Countdown Timer Component
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
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-center">
        <p className="text-xl font-bold">{timeLeft.days}</p>
        <p className="text-xs">Days</p>
      </div>
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-center">
        <p className="text-xl font-bold">{timeLeft.hours}</p>
        <p className="text-xs">Hours</p>
      </div>
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-center">
        <p className="text-xl font-bold">{timeLeft.minutes}</p>
        <p className="text-xs">Mins</p>
      </div>
      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-center">
        <p className="text-xl font-bold">{timeLeft.seconds}</p>
        <p className="text-xs">Secs</p>
      </div>
    </div>
  );
};

// Election Card Component
const ElectionCard = ({ election }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-linear-to-r from-green-500 to-emerald-600 p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Live Now
          </span>
          <span className="text-white/80 text-sm capitalize">{election.type} Election</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{election.title}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{election.description}</p>
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

          <Link
            to={`/vote/${election._id}`}
            className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Vote Now <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

const OngoingElections = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axiosSecure.get('/elections/ongoing');
        setElections(response.data);
      } catch (error) {
        console.error('Error fetching elections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, [axiosSecure]);

  if (loading) {
    return <Loading fullScreen={false} message="Loading elections..." />;
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
            <h1 className="text-2xl font-bold text-gray-800">Ongoing Elections</h1>
            <p className="text-gray-500">Cast your vote in active elections</p>
          </div>
        </div>
      </div>

      {/* Elections Grid */}
      {elections.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {elections.map((election) => (
            <ElectionCard key={election._id} election={election} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <EmptyState
            icon={FaVoteYea}
            title="No Ongoing Elections"
            message="There are no active elections at the moment. Check back later or view upcoming elections."
            action={{
              label: 'View Upcoming Elections',
              onClick: () => window.location.href = '/dashboard/upcoming-elections',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OngoingElections;
