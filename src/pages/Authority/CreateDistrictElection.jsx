import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaCalendar, FaSave, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const CreateDistrictElection = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const districts = [
        "Dhaka", "Chattogram", "Khulna", "Rajshahi", "Barishal",
        "Sylhet", "Rangpur", "Mymensingh", "Cumilla", "Gazipur", "Narayanganj"
        // Add more actual districts as needed
    ];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        district: '',
        startDate: '',
        endDate: '',
        positions: '',
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
                type: 'district',
                positions,
                authorities,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
            });
            toast.success('District Election created!');
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
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(`${baseNav}/create-election`)} className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30">
                            <FaArrowLeft />
                        </button>
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">Create District Election</h1>
                            <p className="text-blue-100">Set up a new election for a specific district</p>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Dhaka District Association Election 2024" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Brief description..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 resize-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1"><FaMapMarkerAlt className="inline mr-1" /> District *</label>
                        <select name="district" value={formData.district} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500">
                            <option value="">Select District</option>
                            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1"><FaCalendar className="inline mr-1" /> Start *</label>
                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1"><FaCalendar className="inline mr-1" /> End *</label>
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Positions (comma-separated) *</label>
                        <input type="text" name="positions" value={formData.positions} onChange={handleChange} required placeholder="President, General Secretary, Organizing Secretary" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Authorities (comma-separated) *</label>
                        <input type="text" name="authorities" value={formData.authorities} onChange={handleChange} required placeholder="Chief Election Commissioner, Commissioner" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? 'Creating...' : <><FaSave /> Create Election</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateDistrictElection;
