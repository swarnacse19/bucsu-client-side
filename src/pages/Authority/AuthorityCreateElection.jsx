import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaVoteYea, FaCalendar, FaSave, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const AuthorityCreateElection = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'university',
    startDate: '',
    endDate: '',
    positions: '',
  });

  const types = [
    { value: 'university', label: 'University / Student Union' },
    { value: 'association', label: 'Zila Association' },
    { value: 'department', label: 'Department' },
  ];

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
      await axios.post('/elections', {
        ...formData,
        positions,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      });
      toast.success('Election created. Start it from Manage Elections when ready.');
      navigate('/authority/manage-elections');
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
            <button onClick={() => navigate('/authority/manage-elections')} className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30">
              <FaArrowLeft />
            </button>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Create Election</h1>
              <p className="text-indigo-100">Set up a new election</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. BUCSU General Election 2024" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Brief description..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
            <select name="type" value={formData.type} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
              {types.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
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
            <input type="text" name="positions" value={formData.positions} onChange={handleChange} required placeholder="President, Vice President, General Secretary" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? 'Creating...' : <><FaSave /> Create Election</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthorityCreateElection;
