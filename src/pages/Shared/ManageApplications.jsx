import { useEffect, useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaFilter, FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import Loading from '../../loading/Loading';
import { formatDate } from '../../utils/formateDate';

const ManageApplications = () => {
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
  try {
    const { data } = await axiosSecure.get('/candidate-applications');
    setApplications(data || []);
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
      confirmButtonText: `Yes, ${actionText}`,
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/candidate-applications/${id}`, {
          status: action,
        });

        setApplications((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: action } : app
          )
        );

        toast.success(`Application ${action} successfully`);

        if (filter !== 'all') {
          setApplications((prev) => prev.filter((app) => app._id !== id));
        }
      } catch {
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
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${config[status]}`}
      >
        {status}
      </span>
    );
  };

  /* 🔍 Election Title Search Filter */
  const filteredApplications = applications.filter((app) => {
  const matchStatus =
    filter === 'all' || app.status === filter;

  const matchElection =
    app.electionTitle
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  return matchStatus && matchElection;
});

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Candidate Applications
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search by Election */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by election title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredApplications.length ? (
          <div className="divide-y divide-gray-100">
            {filteredApplications.map((application) => (
              <div
                key={application._id}
                className="p-5 hover:bg-gray-50 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Applicant */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={application.photo || 'https://i.pravatar.cc/150'}
                      alt={application.name}
                      className="w-14 h-14 rounded-full border"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {application.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {application.email}
                      </p>
                      <p className="text-sm">
                        Position:{' '}
                        <span className="font-medium">
                          {application.position}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Election */}
                  <div className="flex-1">
                    <p className="text-sm">
                      <strong>Election:</strong>{' '}
                      {application.electionTitle}
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied: {formatDate(application.appliedAt)}
                    </p>
                    <StatusBadge status={application.status} />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setSelectedApplication(application)
                      }
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <FaEye />
                    </button>

                    {application.status === 'pending' && (
                      <>
                        <button
                          onClick={() =>
                            handleAction(
                              application._id,
                              'approved',
                              application.name
                            )
                          }
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() =>
                            handleAction(
                              application._id,
                              'rejected',
                              application.name
                            )
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
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
          <div className="py-12 text-center text-gray-500">
            No applications found
          </div>
        )}
      </div>

      {/* Details Modal (unchanged) */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6 flex justify-between border-b">
              <h2 className="text-xl font-bold">Application Details</h2>
              <button onClick={() => setSelectedApplication(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p>
                <strong>Election:</strong>{' '}
                {selectedApplication.electionTitle}
              </p>
              <p>
                <strong>Position:</strong>{' '}
                {selectedApplication.position}
              </p>
              <p>{selectedApplication.manifesto}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;