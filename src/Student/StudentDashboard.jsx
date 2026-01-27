// import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../loading/Loading';
// import api from '../../config/axios';

const StudentDashboard = () => {
  const { user, loading } = useAuth();

  // const { data: elections, isLoading } = useQuery({
  //   queryKey: ['student-elections'],
  //   queryFn: async () => {
  //     const res = await api.get('/students/elections');
  //     return res.data;
  //   },
  // });

  // const { data: votes } = useQuery({
  //   queryKey: ['my-votes'],
  //   queryFn: async () => {
  //     const res = await api.get('/votes/my-votes');
  //     return res.data;
  //   },
  // });

  if (loading) {
    return <Loading></Loading>
  }

  // const activeElections = elections?.filter(e => !e.hasVoted) || [];
  // const votedElections = elections?.filter(e => e.hasVoted) || [];

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Student Dashboard
        </h1>
        <p className="text-gray-600">Welcome back, {user?.studentId || 'Student'}!</p>
      </div>

      <div className="dashboard-grid mb-10">
        <div className="stat-professional border-l-4 border-blue-500">
          <div className="stat-title text-gray-600">Active Elections</div>
          {/* <div className="stat-value text-blue-600">{activeElections.length}</div> */}
          <p>election length</p>
          <div className="stat-desc text-sm text-gray-500">Ready to vote</div>
        </div>
        <div className="stat-professional border-l-4 border-green-500">
          <div className="stat-title text-gray-600">Votes Cast</div>
          {/* <div className="stat-value text-green-600">{votedElections.length}</div> */}
          <p>vote election</p>
          <div className="stat-desc text-sm text-gray-500">Your participation</div>
        </div>
        <div className="stat-professional border-l-4 border-purple-500">
          <div className="stat-title text-gray-600">Department</div>
          <div className="stat-value text-purple-600 text-2xl">{user?.department || 'N/A'}</div>
          <div className="stat-desc text-sm text-gray-500">Your department</div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span>🗳️</span> Active Elections
        </h2>
        {/* {activeElections.length > 0 ? (
          <div className="dashboard-grid">
            {activeElections.map((election) => (
              <div key={election._id} className="election-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{election.title}</h3>
                    <p className="text-gray-600 text-sm">{election.description}</p>
                  </div>
                  <span className="badge-professional bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    Active
                  </span>
                </div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="badge badge-primary">{election.type}</span>
                  {election.department && (
                    <span className="badge badge-secondary">{election.department}</span>
                  )}
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/student/vote/${election._id}`}
                    className="btn-professional rounded-full px-6"
                  >
                    Vote Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert-professional bg-blue-50 border-blue-200 text-blue-800">
            <span>📭 No active elections at the moment.</span>
          </div>
        )} */}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span>✅</span> Elections You've Voted In
        </h2>
        {/* {votedElections.length > 0 ? (
          <div className="dashboard-grid">
            {votedElections.map((election) => (
              <div key={election._id} className="election-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{election.title}</h3>
                    <p className="text-gray-600 text-sm">{election.description}</p>
                  </div>
                  <span className="badge-professional bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    Voted ✓
                  </span>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="badge badge-primary">{election.type}</span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to="/student/results"
                    className="btn btn-outline rounded-full px-6 hover:bg-purple-50 border-purple-300"
                  >
                    View Results →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert-professional bg-gray-50 border-gray-200 text-gray-700">
            <span>📝 You haven't voted in any elections yet.</span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default StudentDashboard;
