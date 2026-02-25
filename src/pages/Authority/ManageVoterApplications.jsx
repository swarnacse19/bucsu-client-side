import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaSearch, FaUserClock } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const ManageVoterApplications = () => {
    const axiosSecure = useAxios();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [elections, setElections] = useState([]);
    const [selectedElection, setSelectedElection] = useState("");

    // Fetch elections
    useEffect(() => {
        const fetchElections = async () => {
            try {
                const res = await axiosSecure.get("/elections");
                setElections(res.data);
                if (res.data.length > 0) {
                    setSelectedElection(res.data[0]._id);
                }
            } catch (error) {
                console.error("Failed to fetch elections", error);
            }
        };
        fetchElections();
    }, [axiosSecure]);

    const fetchApplications = async () => {
        if (!selectedElection) return;
        try {
            setLoading(true);
            const res = await axiosSecure.get(`/voter-applications?status=pending&electionId=${selectedElection}`);
            setApplications(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch applications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [axiosSecure, selectedElection]);

    const handleAction = async (id, status) => {
        const action = status === "approved" ? "Approve" : "Reject";

        Swal.fire({
            title: `Are you sure?`,
            text: `You are about to ${action.toLowerCase()} this voter application.`,
            icon: status === "approved" ? "question" : "warning",
            showCancelButton: true,
            confirmButtonColor: status === "approved" ? "#10b981" : "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: `Yes, ${action} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/voter-applications/${id}`, { status });
                    toast.success(`Application ${action}d successfully`);
                    fetchApplications(); // Refresh list
                } catch (error) {
                    console.error(error);
                    toast.error(`Failed to ${action.toLowerCase()} application`);
                }
            }
        });
    };

    const filteredApplications = applications.filter(app =>
        app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!selectedElection) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 space-y-4">
                <p className="text-xl">Please select an election to view applications</p>
                <select
                    value={selectedElection}
                    onChange={(e) => setSelectedElection(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="">Select Election</option>
                    {elections.map(election => (
                        <option key={election._id} value={election._id}>
                            {election.title}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUserClock className="text-blue-600" />
                        Voter Applications
                    </h1>
                    <p className="text-gray-500">
                        {selectedElection
                            ? `Managing: ${elections.find(e => e._id === selectedElection)?.title || 'Selected Election'}`
                            : 'Manage pending voter requests'}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        value={selectedElection}
                        onChange={(e) => setSelectedElection(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">Select Election</option>
                        {elections.map(election => (
                            <option key={election._id} value={election._id}>
                                {election.title}
                            </option>
                        ))}
                    </select>

                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Info</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredApplications.length > 0 ? (
                                filteredApplications.map((app) => (
                                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={app.photo || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                                                    alt={app.name}
                                                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                                />
                                                <div>
                                                    <div className="font-medium text-gray-900">{app.name}</div>
                                                    <div className="text-sm text-gray-500">{app.email}</div>
                                                    <div className="text-xs text-blue-500">{app.phone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900"><span className="font-semibold">ID:</span> {app.studentId}</div>
                                            <div className="text-sm text-gray-500"><span className="font-semibold">Dept:</span> {app.department}</div>
                                            <div className="text-sm text-gray-500"><span className="font-semibold">Batch:</span> {app.batch} | <span className="font-semibold">Session:</span> {app.session}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Reason and Date */}
                                            <div className="text-xs text-gray-400 mb-1">{new Date(app.appliedAt).toLocaleDateString()}</div>
                                            <div className="max-w-xs truncate text-sm text-gray-600" title={app.reason}>
                                                {app.reason || "No reason provided"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleAction(app._id, "approved")}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors mr-2"
                                            >
                                                <FaCheck size={14} /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleAction(app._id, "rejected")}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            >
                                                <FaTimes size={14} /> Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        No pending applications found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageVoterApplications;
