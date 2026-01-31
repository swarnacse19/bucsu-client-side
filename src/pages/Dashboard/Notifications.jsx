import { useEffect, useState } from 'react';
import { FaBell, FaVoteYea, FaUserTie, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import Loading from '../../loading/Loading';
import EmptyState from '../../components/EmptyState';
import { formatDate } from '../../utils/formateDate';

const NotificationCard = ({ item }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'result': return FaCheckCircle;
      case 'approval': return FaUserTie;
      case 'rejection': return FaInfoCircle;
      default: return FaBell;
    }
  };
  const getColor = (type) => {
    switch (type) {
      case 'result': return 'bg-blue-100 text-blue-600';
      case 'approval': return 'bg-green-100 text-green-600';
      case 'rejection': return 'bg-red-100 text-red-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };
  const Icon = getIcon(item.type);
  const colorClass = getColor(item.type);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
          <Icon className="text-xl" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-semibold text-slate-800">{item.title}</h3>
            <span className="text-xs text-slate-400 whitespace-nowrap">{formatDate(item.createdAt)}</span>
          </div>
          <p className="text-slate-600 text-sm mt-2">{item.content}</p>
          {item.type && (
            <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium capitalize ${colorClass}`}>
              {item.type}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Notifications = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosSecure.get('/notices');
        setNotices(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaBell className="text-orange-600 text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
              <p className="text-slate-500">Notices, approvals, and results</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
            {notices.length} notification{notices.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Notifications List */}
      {notices.length > 0 ? (
        <div className="space-y-4">
          {notices.map((n) => (
            <NotificationCard key={n._id} item={n} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <EmptyState
            icon={FaBell}
            title="No Notifications"
            message="You're all caught up! There are no new notifications at the moment."
          />
        </div>
      )}
    </div>
  );
};

export default Notifications;
