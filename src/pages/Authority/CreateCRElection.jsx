import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaCalendar, FaSave, FaArrowLeft, FaUserGraduate, FaLayerGroup } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const CreateCRElection = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const departments = [
        "Computer Science and Engineering",
        "Electrical and Electronic Engineering",
        "Business Administration",
        "English",
        "Law",
        "Economics",
        "Mathematics"
    ];

    const semesters = [
        "1st Year 1st Semester", "1st Year 2nd Semester",
        "2nd Year 1st Semester", "2nd Year 2nd Semester",
        "3rd Year 1st Semester", "3rd Year 2nd Semester",
        "4th Year 1st Semester", "4th Year 2nd Semester",
        "Masters"
    ];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        department: '',
        semester: '',
        startDate: '',
        endDate: '',
        positions: 'Class Representative', // Default for CR
        authorities: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const currentPath = window.location.pathname;
    const baseNav = currentPath.includes('/admin') ? '/admin' : '/authority';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            return toast.error('End date must be after start date');
        }
        setLoading(true);
        try {
            const positions = formData.positions.split(',').map((p) => p.trim()).filter(Boolean);
            const authorities = formData.authorities.split(',').map((p) => p.trim()).filter(Boolean);
            await axios.post('/elections', {
                ...formData,
                type: 'cr',
                positions,
                authorities,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
            });
            toast.success('CR Election created!');
            navigate(`${baseNav}/manage-elections`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create election');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(`${baseNav}/create-election`)} className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30">
                            <FaArrowLeft />
                        </button>
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">Create CR Election</h1>
                            <p className="text-indigo-100">Set up a Class Representative election</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. CSE 12th Batch CR Election" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Brief description..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 resize-none" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1"><FaUserGraduate className="inline mr-1" /> Department *</label>
                            <select name="department" value={formData.department} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select Department</option>
                                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1"><FaLayerGroup className="inline mr-1" /> Year / Semester *</label>
                            <select name="semester" value={formData.semester} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                                <option value="">Select Semester</option>
                                {semesters.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1"><FaCalendar className="inline mr-1" /> Start *</label>
                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1"><FaCalendar className="inline mr-1" /> End *</label>
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Positions (comma-separated) *</label>
                        <input type="text" name="positions" value={formData.positions} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Authorities (comma-separated) *</label>
                        <input type="text" name="authorities" value={formData.authorities} onChange={handleChange} required placeholder="Advisor, Head of Department" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? 'Creating...' : <><FaSave /> Create Election</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCRElection;
