import { useEffect, useState } from "react";
import { FaUsers, FaVoteYea, FaClock } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../loading/Loading";
import useAxios from "../../hooks/useAxios";

const AuthorityDashboard = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalElections: 0,
    ongoingElections: 0,
    totalCandidates: 0,
  });

  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // elections
        const electionsRes = await axios.get("/elections");
        const electionsData = electionsRes.data;

        // candidates
        const candidatesRes = await axios.get("/candidate-applications");
        const candidatesData = candidatesRes.data;

        const now = new Date();

        const totalElections = electionsData.length;
        const ongoingElections = electionsData.filter(
          (e) =>
            new Date(e.startDate) <= now &&
            new Date(e.endDate) >= now,
        ).length;

        setElections(electionsData);

        setStats({
          totalElections,
          ongoingElections,
          totalCandidates: candidatesData.length,
        });
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axios]);

  if (loading) return <Loading fullScreen={false} message="Loading..." />;

  const statCards = [
    {
      title: "Total Elections",
      value: stats.totalElections,
      icon: FaVoteYea,
      lightColor: "bg-indigo-100",
      textColor: "text-indigo-600",
    },
    {
      title: "Ongoing Elections",
      value: stats.ongoingElections,
      icon: FaClock,
      lightColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      title: "Total Candidates Application",
      value: stats.totalCandidates,
      icon: FaUsers,
      lightColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Authority Dashboard
        </h1>
        <p className="text-slate-600 mt-1">
          Manage elections, notices, and results
        </p>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{s.title}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {s.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${s.lightColor}`}>
                <s.icon className={`w-6 h-6 ${s.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* elections */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Elections
          </h2>
          <Link
            to="/authority/manage-elections"
            className="text-indigo-600 text-sm"
          >
            View all
          </Link>
        </div>

        {elections.length ? (
          <div className="space-y-3">
            {elections.slice(0, 5).map((e) => {
              const now = new Date();
              const start = new Date(e.startDate);
              const end = new Date(e.endDate);

              let status = "Upcoming";
              let statusClass = "bg-blue-100 text-blue-700";

              if (now >= start && now <= end) {
                status = "Ongoing";
                statusClass = "bg-emerald-100 text-emerald-700";
              } else if (now > end) {
                status = "Ended";
                statusClass = "bg-slate-200 text-slate-700";
              }

              return (
                <div
                  key={e._id}
                  className="flex justify-between p-3 bg-slate-50 rounded-xl"
                >
                  <p className="font-medium text-slate-800 truncate">
                    {e.title}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${statusClass}`}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-6">
            No elections yet. Create one to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorityDashboard;
