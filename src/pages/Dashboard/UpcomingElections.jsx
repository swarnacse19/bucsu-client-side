import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaBell, FaMapMarkerAlt } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import Loading from '../../loading/Loading';
import EmptyState from '../../components/EmptyState';
import { formatDate, formatDateTime } from '../../utils/formateDate';

const ElectionCard = ({ election }) => {
  const [reminded, setReminded] = useState(false);

  const handleReminder = () => {
    setReminded(true);
    // In production, this would set up a notification
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-linear-to-r from-blue-500 to-indigo-600 p-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
            <FaCalendarAlt />
            Upcoming
          </span>
          <span className="text-white/80 text-sm capitalize">{election.type} Election</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{election.title}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{election.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <FaClock className="text-green-500" />
            <span className="text-gray-600">
              Starts: <span className="font-medium text-gray-800">{formatDateTime(election.startDate)}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaClock className="text-red-500" />
            <span className="text-gray-600">
              Ends: <span className="font-medium text-gray-800">{formatDateTime(election.endDate)}</span>
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {election.positions?.length || 0} positions available
          </div>

          <button
            onClick={handleReminder}
            disabled={reminded}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              reminded
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            <FaBell />
            {reminded ? 'Reminder Set' : 'Set Reminder'}
          </button>
        </div>
      </div>
    </div>
  );
};

const UpcomingElections = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axiosSecure.get('/elections/upcoming');
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
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <FaCalendarAlt className="text-blue-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Upcoming Elections</h1>
            <p className="text-gray-500">Elections scheduled to start soon</p>
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
            icon={FaCalendarAlt}
            title="No Upcoming Elections"
            message="There are no scheduled elections at the moment. Check back later."
          />
        </div>
      )}
    </div>
  );
};

export default UpcomingElections;
