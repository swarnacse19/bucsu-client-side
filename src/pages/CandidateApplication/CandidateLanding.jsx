import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaUserTie, FaVoteYea } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Loading from "../../loading/Loading";
import EmptyState from "../../components/EmptyState";

const CandidateLanding = () => {
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [elections, setElections] = useState([]);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const res = await axiosSecure.get("/elections/upcoming");
                setElections(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchElections();
    }, [axiosSecure]);

    const handleApply = (election) => {
        const typeMap = {
            district: 'district',
            department: 'department',
            cr: 'cr',
            custom: 'custom'
        };
        const path = typeMap[election.type] || 'district';
        navigate(`/dashboard/apply-candidate/${path}/${election._id}`);
    };

    if (loading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Apply for Candidacy</h1>
                <p className="text-slate-600 mt-2">Choose an election to submit your nomination</p>
            </div>

            {elections.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {elections.map((election) => (
                        <div key={election._id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 
                    ${election.type === 'district' ? 'bg-blue-100 text-blue-700' :
                                            election.type === 'department' ? 'bg-emerald-100 text-emerald-700' :
                                                election.type === 'cr' ? 'bg-indigo-100 text-indigo-700' :
                                                    'bg-purple-100 text-purple-700'}`}>
                                        {election.type.toUpperCase()} Election
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-800 mb-1">{election.title}</h3>
                                    <p className="text-slate-500 text-sm line-clamp-2">{election.description}</p>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4 mt-4">
                                <button
                                    onClick={() => handleApply(election)}
                                    className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FaUserTie /> Apply Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={FaVoteYea}
                    title="No Active Elections"
                    message="There are currently no elections accepting candidate applications."
                />
            )}
        </div>
    );
};

export default CandidateLanding;
