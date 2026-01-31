import { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import Loading from '../../loading/Loading';
import { formatDate } from '../../utils/formateDate';

const ManageApplications = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      const url = filter === 'all' 
        ? '/candidate-applications' 
        : `/candidate-applications?status=${filter}`;
      const response = await axiosSecure.get(url);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action, name) => {
    const actionText = action === 'approved' ? 'approve' : 'reject';
    
    const result = await Swal.fire({
      title: `${action === 'approved' ? 'Approve' : 'Reject'} Application?`,
      text: `Are you sure you want to ${actionText} ${name}'s application?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: action === 'approved' ? '#10B981' : '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${actionText}`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/candidate-applications/${id}`, { status: action });
        
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status: action } : app))
        );
        
        toast.success(`Application ${action} successfully`);
        
        if (filter !== 'all') {
          setApplications((prev) => prev.filter((app) => app._id !== id));
        }
      } catch (error) {
        toast.error(`Failed to ${actionText} application`);
      }
    }
  };

  const StatusBadge = ({ status }) => {
    const config = {
      pending: 'bg-yellow-100 text-yellow-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${config[status]}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Candidate Applications</h1>
        
        {/* Filter */}
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {applications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {applications.map((application) => (
              <div key={application._id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Applicant Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={application.photo || 'https://i.pravatar.cc/150?img=1'}
                      alt={application.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{application.name}</h3>
                      <p className="text-sm text-gray-500">{application.email}</p>
                      <p className="text-sm text-gray-500">
                        Position: <span className="font-medium">{application.position}</span>
                      </p>
                    </div>
                  </div>

                  {/* Election & Status */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Election:</span> {application.electionTitle}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Applied: {formatDate(application.appliedAt)}
                    </p>
                    <div className="mt-2">
                      <StatusBadge status={application.status} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedApplication(application)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    
                    {application.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAction(application._id, 'approved', application.name)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleAction(application._id, 'rejected', application.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No {filter === 'all' ? '' : filter} applications found</p>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Application Details</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedApplication.photo || 'https://i.pravatar.cc/150?img=1'}
                  alt={selectedApplication.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedApplication.name}</h3>
                  <p className="text-gray-500">{selectedApplication.email}</p>
                  <StatusBadge status={selectedApplication.status} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-semibold text-gray-800">{selectedApplication.position}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Election</p>
                  <p className="font-semibold text-gray-800">{selectedApplication.electionTitle}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Manifesto</p>
                <p className="bg-gray-50 rounded-lg p-4 text-gray-700">{selectedApplication.manifesto}</p>
              </div>

              {selectedApplication.experience && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Experience</p>
                  <p className="bg-gray-50 rounded-lg p-4 text-gray-700">{selectedApplication.experience}</p>
                </div>
              )}

              {selectedApplication.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      handleAction(selectedApplication._id, 'approved', selectedApplication.name);
                      setSelectedApplication(null);
                    }}
                    className="flex-1 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                  >
                    Approve Application
                  </button>
                  <button
                    onClick={() => {
                      handleAction(selectedApplication._id, 'rejected', selectedApplication.name);
                      setSelectedApplication(null);
                    }}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold"
                  >
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
