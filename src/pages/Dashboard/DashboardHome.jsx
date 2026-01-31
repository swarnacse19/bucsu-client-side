import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaVoteYea,
  FaCalendarAlt,
  FaBell,
  FaClipboardList,
  FaArrowRight,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Loading from "../../loading/Loading";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    notices: [],
    ongoingElections: [],
    upcomingElections: [],
    myApplications: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [notifRes, ongoingRes, upcomingRes, applicationsRes] =
          await Promise.all([
            axiosSecure.get("/notices"),
            axiosSecure.get("/elections/ongoing"),
            axiosSecure.get("/elections/upcoming"),
            axiosSecure.get(`/candidate-applications?email=${user.email}`),
          ]);
        const notifs = Array.isArray(notifRes.data) ? notifRes.data : [];
        setData({
          notices: notifs.slice(0, 5),
          ongoingElections: ongoingRes.data || [],
          upcomingElections: upcomingRes.data || [],
          myApplications: applicationsRes.data || [],
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back,{" "}
          {(user?.name || user?.displayName)?.split(" ")[0] || "Student"}! 👋
        </h1>
        <p className="text-blue-100 mt-2">
          Here's what's happening with your elections today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ongoing Elections</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {data.ongoingElections.length} 
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaVoteYea className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Elections</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {data.upcomingElections.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaCalendarAlt className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">My Applications</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {data.myApplications.length} 
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FaClipboardList className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Notices</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">
                {data.notices.length} 
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaBell className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Notice Board */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Notices</h2>
            <Link
              to="/dashboard/notifications"
              className="text-indigo-600 text-sm hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="p-5 space-y-4">
            {data.notices.length > 0 ? (
              data.notices.map((n) => (
                <div
                  key={n._id}
                  className="flex gap-4 p-3 bg-slate-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaBell className="text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-slate-800 truncate">
                      {n.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1">
                      {n.body}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-4">
                No notifications
              </p>
            )}
          </div>
        </div>

        {/* Rules Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Voting Guidelines
            </h2>
            <Link
              to="/dashboard/guidelines"
              className="text-indigo-600 text-sm hover:underline"
            >
              Read More
            </Link>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  1
                </span>
                <p className="text-gray-600 text-sm">
                  Each student can vote only once per position in an election.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  2
                </span>
                <p className="text-gray-600 text-sm">
                  Votes are anonymous and cannot be traced back to the voter.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  3
                </span>
                <p className="text-gray-600 text-sm">
                  Voting period is strictly enforced. No votes after deadline.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                  4
                </span>
                <p className="text-gray-600 text-sm">
                  Candidate applications require admin approval before listing.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ongoing Elections */}
      {data.ongoingElections.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-800">🗳️ Vote Now</h2>
            <Link
              to="/dashboard/ongoing-elections"
              className="text-indigo-600 text-sm hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="p-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.ongoingElections.slice(0, 3).map((election) => (
                <div
                  key={election._id}
                  className="border border-green-200 bg-green-50 rounded-xl p-4"
                >
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs rounded-full mb-3">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Live
                  </span>
                  <h3 className="font-semibold text-gray-800">
                    {election.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    Ends: {new Date(election.endDate).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/dashboard/vote/${election._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    Vote Now <FaArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
