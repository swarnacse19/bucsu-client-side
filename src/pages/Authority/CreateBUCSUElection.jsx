import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaCalendar, FaSave, FaArrowLeft, FaUniversity } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const CreateBUCSUElection = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        positions: 'President, Vice President, General Secretary, AGS, Organizing Secretary, Cultural Secretary, Sports Secretary',
        authorities: 'Chief Election Commissioner, Election Commission',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            return toast.error('End date must be after start date');
        }
        setLoading(true);
        try {
            const positions = formData.positions.split(',').map((p) => p.trim()).filter(Boolean);
            const authorities = formData.authorities.split(',').map((p) => p.trim()).filter(Boolean);

            // Determine redirect path based on where we are
            const currentPath = window.location.pathname;
            const redirectPath = currentPath.includes('/admin')
                ? '/admin/manage-elections'
                : '/authority/manage-elections';

            await axios.post('/elections', {
                ...formData,
                type: 'university',
                positions,
                authorities,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
            });
            toast.success('BUCSU Election created!');
            navigate(redirectPath);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create election');
        } finally {
            setLoading(false);
        }
    };

    const currentPath = window.location.pathname;
    const backPath = currentPath.includes('/admin')
        ? '/admin/create-election'
        : '/authority/create-election';

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(backPath)} className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                            <FaArrowLeft />
                        </button>
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">Create BUCSU Election</h1>
                            <p className="text-blue-100">Set up a university-wide student union election</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 font-semibold">Title *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. BUCSU General Election 2024-25" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1 font-semibold">Description *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Brief description of the election..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1 font-semibold"><FaCalendar className="inline mr-1 text-blue-600" /> Start Date & Time *</label>
                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1 font-semibold"><FaCalendar className="inline mr-1 text-red-500" /> End Date & Time *</label>
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none" />
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2 text-slate-800 font-bold mb-2">
                            <FaUniversity className="text-blue-600" />
                            <span>BUCSU Configuration</span>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Positions (comma-separated)</label>
                            <textarea name="positions" value={formData.positions} onChange={handleChange} required rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Authorities (comma-separated)</label>
                            <textarea name="authorities" value={formData.authorities} onChange={handleChange} required rows={1} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? 'Creating...' : <><FaSave /> Create BUCSU Election</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBUCSUElection;
