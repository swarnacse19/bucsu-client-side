import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import { FaCalendar, FaMapMarkerAlt, FaBuilding, FaUserGraduate, FaArrowLeft, FaCheckCircle, FaVoteYea } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import Loading from '../../loading/Loading';

const ElectionDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axios = useAxios();
    const navigate = useNavigate();
    const [election, setElection] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchElection = async () => {
            try {
                const res = await axios.get(`/elections/${id}`);
                setElection(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchElection();
    }, [axios, id]);

    if (loading) return <Loading fullScreen={false} />;
    if (!election) return <div className="text-center py-10">Election not found</div>;

    const getIcon = () => {
        switch (election.type) {
            case 'district': return <FaMapMarkerAlt className="w-8 h-8 text-blue-500" />;
            case 'department': return <FaBuilding className="w-8 h-8 text-emerald-500" />;
            case 'cr': return <FaUserGraduate className="w-8 h-8 text-indigo-500" />;
            default: return <FaCheckCircle className="w-8 h-8 text-purple-500" />;
        }
    };

    const getColor = () => {
        switch (election.type) {
            case 'district': return 'bg-blue-50 border-blue-100 text-blue-700';
            case 'department': return 'bg-emerald-50 border-emerald-100 text-emerald-700';
            case 'cr': return 'bg-indigo-50 border-indigo-100 text-indigo-700';
            default: return 'bg-purple-50 border-purple-100 text-purple-700';
        }
    };

    const isOngoing = new Date(election.startDate) <= new Date() && new Date(election.endDate) >= new Date();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition"
            >
                <FaArrowLeft /> Back
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getColor()}`}>
                                    {election.type} Election
                                </span>
                                {election.department && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                        {election.department}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-4">{election.title}</h1>
                            <p className="text-slate-600 leading-relaxed text-lg mb-6">{election.description}</p>

                            <div className="flex flex-wrap gap-6 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <FaCalendar className="text-slate-400" />
                                    <span className="font-medium">Starts:</span>
                                    {new Date(election.startDate).toLocaleString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendar className="text-slate-400" />
                                    <span className="font-medium">Ends:</span>
                                    {new Date(election.endDate).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl hidden sm:block">
                            {getIcon()}
                        </div>
                    </div>
                </div>

                {/* Custom Structure Display */}
                {election.type === 'custom' && election.customStructure && election.customStructure.length > 0 && (
                    <div className="px-8 pb-8">
                        <h3 className="text-lg font-semibold mb-4 text-slate-800 border-b pb-2">Election Specifics</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {election.customStructure.map((field, idx) => (
                                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-slate-800">{field.label}</p>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{field.type}</p>
                                        </div>
                                        {field.required && <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">REQUIRED</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                   
                    <div className="flex gap-3">
                        {isOngoing && (
                            user?.approvedElections?.includes(election._id) ? (
                                <button
                                    onClick={() => navigate(`/dashboard/vote/${election._id}`)}
                                    className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                                >
                                    <FaVoteYea /> Vote Now
                                </button>
                            ) : (
                                <div className="flex flex-col items-center justify-center px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl text-amber-700 text-xs italic">
                                    <span>Voter Registration</span>
                                    <span>Required to Vote</span>
                                </div>
                            )
                        )}
                        
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ElectionDetails;
