import { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import Loading from '../../loading/Loading';

const ManageNotices = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: '', content: '', type: 'general' });
  const [submitting, setSubmitting] = useState(false);

  const fetchNotices = async () => {
    try {
      const { data } = await axios.get('/notices?limit=100');
      setNotices(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error('Failed to fetch notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('/notices', form);
      toast.success('Notice published');
      setForm({ title: '', content: '', type: 'general' });
      setModal(false);
      fetchNotices();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to publish');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Delete notice?',
      text: `"${title}" will be removed.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    });
    if (!isConfirmed) return;
    try {
      await axios.delete(`/notices/${id}`);
      toast.success('Notice deleted');
      fetchNotices();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Loading fullScreen={false} message="Loading notices..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Notices</h1>
        <button onClick={() => setModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
          <FaPlus /> Publish Notice
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {notices.length ? (
          <div className="divide-y divide-slate-100">
            {notices.map((n) => (
              <div key={n._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-indigo-600 uppercase">{n.type || 'general'}</span>
                  <h3 className="font-semibold text-slate-800 mt-1">{n.title}</h3>
                  <p className="text-slate-600 text-sm mt-1 line-clamp-2">{n.content}</p>
                  <p className="text-xs text-slate-400 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={() => handleDelete(n._id, n.title)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg self-start sm:self-center">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">No notices yet. Publish one to show on the home page marquee.</div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Publish Notice</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                  <option value="general">General</option>
                  <option value="election">Election</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={submitting} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50">Publish</button>
                <button type="button" onClick={() => setModal(false)} className="px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotices;
