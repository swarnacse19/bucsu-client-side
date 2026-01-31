import { useEffect, useState } from 'react';
import {
  FaClipboardList,
} from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import Loading from '../../loading/Loading';
import EmptyState from '../../components/EmptyState';
import { ApplicationCard } from '../../components/ApplicationCard';


const MyApplications = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchApplications = async () => {
      try {
        const res = await axiosSecure.get(
          `/candidate-applications?email=${user.email}`
        );
        setApplications(res.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [axiosSecure, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <FaClipboardList className="text-purple-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              My Applications
            </h1>
            <p className="text-gray-500">
              Track your candidate applications
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600">
            {applications.filter((a) => a.status === 'pending').length}
          </p>
          <p className="text-sm text-yellow-700">Pending</p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-600">
            {applications.filter((a) => a.status === 'approved').length}
          </p>
          <p className="text-sm text-green-700">Approved</p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-red-600">
            {applications.filter((a) => a.status === 'rejected').length}
          </p>
          <p className="text-sm text-red-700">Rejected</p>
        </div>
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <EmptyState
            icon={FaClipboardList}
            title="No Applications Yet"
            message="You haven't submitted any candidate applications."
            action={{
              label: 'Apply for Candidate',
              onClick: () =>
                (window.location.href = '/dashboard/apply-candidate'),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MyApplications;
