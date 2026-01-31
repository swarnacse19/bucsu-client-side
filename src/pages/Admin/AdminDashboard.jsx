import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  FaUsers,
  FaVoteYea,
  FaUserTie,
  FaArrowRight,
} from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import Loading from '../../loading/Loading';

const StatCard = ({ title, value, icon: Icon, color, link }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
      <div className={`p-4 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
    {link && (
      <Link
        to={link}
        className="inline-flex items-center gap-1 mt-4 text-blue-600 text-sm hover:underline"
      >
        View Details <FaArrowRight className="text-xs" />
      </Link>
    )}
  </div>
);

const AdminDashboard = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCandidates: 0,
    totalElections: 0,
    ongoingElections: 0,
    upcomingElections: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          usersRes,
          candidatesRes,
          electionsRes,
          ongoingRes,
          upcomingRes,
        ] = await Promise.all([
          axiosSecure.get('/users'),
          axiosSecure.get('/candidate-applications'),
          axiosSecure.get('/elections'),
          axiosSecure.get('/elections/ongoing'),
          axiosSecure.get('/elections/upcoming'),
        ]);

        setStats({
          totalUsers: usersRes.data.length,
          totalCandidates: candidatesRes.data.length,
          totalElections: electionsRes.data.length,
          ongoingElections: ongoingRes.data.length,
          upcomingElections: upcomingRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  if (loading) {
    return <Loading fullScreen={false} message="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
        <p className="text-gray-300 mt-2">
          Manage elections, candidates, and users from here.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          color="bg-blue-500"
          link="/admin/users"
        />
        <StatCard
          title="Total Elections"
          value={stats.totalElections}
          icon={FaVoteYea}
          color="bg-green-500"
          link="/admin/manage-elections"
        />
        <StatCard
          title="Total Candidates"
          value={stats.totalCandidates}
          icon={FaUserTie}
          color="bg-purple-500"
          link="/admin/candidate-management"
        />
      </div>

      {/* Election Status */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <FaVoteYea className="text-emerald-500 text-3xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">
            {stats.ongoingElections}
          </p>
          <p className="text-sm text-gray-500">Ongoing Elections</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <FaVoteYea className="text-indigo-500 text-3xl mx-auto mb-2" />
          <p className="text-3xl font-bold text-gray-800">
            {stats.upcomingElections}
          </p>
          <p className="text-sm text-gray-500">Upcoming Elections</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
