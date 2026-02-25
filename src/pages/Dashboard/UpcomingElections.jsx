import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaClock, FaBell } from 'react-icons/fa';
import { useSearchParams, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import Loading from '../../loading/Loading';
import EmptyState from '../../components/EmptyState';
import { formatDateTime } from '../../utils/formateDate';

const ElectionCard = ({ election }) => {
  // const [reminded, setReminded] = useState(false);
  const navigate = useNavigate();

  // const handleReminder = () => {
  //   setReminded(true);
  //   // In production, this would set up a notification
  // };

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

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/dashboard/election/${election._id}`)}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
            >
              View Details
            </button>
            {/* <button
              onClick={handleReminder}
              disabled={reminded}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${reminded
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
            >
              <FaBell />
              {reminded ? 'Reminder Set' : 'Set Reminder'}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingElections = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg font-medium capitalize whitespace-nowrap transition-colors ${selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
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
          {filteredElections.map((election) => (
            <ElectionCard key={election._id} election={election} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <EmptyState
            icon={FaCalendarAlt}
            title="No Upcoming Elections"
            message={`There are no scheduled ${selectedCategory !== 'all' ? selectedCategory + ' ' : ''}elections at the moment. Check back later.`}
          />
        </div>
      )}
    </div>
  );
};

export default UpcomingElections;
