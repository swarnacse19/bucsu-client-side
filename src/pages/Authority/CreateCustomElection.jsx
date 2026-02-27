import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaCalendar, FaSave, FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';

const CreateCustomElection = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        positions: '',
        authorities: '',
    });

    const [customFields, setCustomFields] = useState([]);

    const addField = () => {
        setCustomFields([
            ...customFields,
            { label: '', type: 'text', required: false, options: '' }
        ]);
    };

    const removeField = (index) => {
        const newFields = [...customFields];
        newFields.splice(index, 1);
        setCustomFields(newFields);
    };

    const updateField = (index, key, value) => {
        const newFields = [...customFields];
        newFields[index][key] = value;
        setCustomFields(newFields);
    };

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

        // Validate custom fields
        if (customFields.length === 0) {
            return toast.error('Please add at least one custom field or structure for this election');
        }

        for (const field of customFields) {
            if (!field.label) return toast.error('All custom fields must have a label');
        }

        setLoading(true);
        try {
            const positions = formData.positions.split(',').map((p) => p.trim()).filter(Boolean);
            const authorities = formData.authorities.split(',').map((p) => p.trim()).filter(Boolean);
            await axios.post('/elections', {
                ...formData,
                type: 'custom',
                positions,
                authorities,
                customStructure: customFields,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
            });
            toast.success('Custom Election created!');
            navigate(`${baseNav}/manage-elections`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create election');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(`${baseNav}/create-election`)} className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30">
                            <FaArrowLeft />
                        </button>
                        <div className="text-white">
                            <h1 className="text-2xl font-bold">Create Custom Election</h1>
                            <p className="text-purple-100">Design your own election structure</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Basic Info */}
                    <div className="space-y-6 border-b border-slate-100 pb-8">
                        <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Special Club Committee Election" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Brief description..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 resize-none" />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1"><FaCalendar className="inline mr-1" /> Start *</label>
                                <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1"><FaCalendar className="inline mr-1" /> End *</label>
                                <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Positions (comma-separated) *</label>
                            <input type="text" name="positions" value={formData.positions} onChange={handleChange} required placeholder="e.g. Chairman, Secretary" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Authorities (comma-separated) *</label>
                            <input type="text" name="authorities" value={formData.authorities} onChange={handleChange} required placeholder="e.g. Election Commissioner" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500" />
                        </div>
                    </div>

                    {/* Form Builder */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-800">Custom Structure / Fields</h3>
                            <button type="button" onClick={addField} className="text-sm px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium flex items-center gap-2">
                                <FaPlus size={12} /> Add Field
                            </button>
                        </div>

                        {customFields.length === 0 && (
                            <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                                No custom fields added yet. Click "Add Field" to define structure.
                            </div>
                        )}

                        <div className="space-y-4">
                            {customFields.map((field, index) => (
                                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
                                    <button type="button" onClick={() => removeField(index)} className="absolute top-2 right-2 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        <FaTrash size={14} />
                                    </button>

                                    <div className="grid sm:grid-cols-12 gap-4 pr-8">
                                        <div className="sm:col-span-5">
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Field Label</label>
                                            <input
                                                type="text"
                                                value={field.label}
                                                onChange={(e) => updateField(index, 'label', e.target.value)}
                                                placeholder="e.g. Manifesto URL"
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label className="block text-xs font-medium text-slate-500 mb-1">Type</label>
                                            <select
                                                value={field.type}
                                                onChange={(e) => updateField(index, 'type', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            >
                                                <option value="text">Text Input</option>
                                                <option value="textarea">Long Text</option>
                                                <option value="number">Number</option>
                                                <option value="checkbox">Checkbox</option>
                                                {/* <option value="select">Dropdown</option> */}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2 flex items-center pt-5">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={field.required}
                                                    onChange={(e) => updateField(index, 'required', e.target.checked)}
                                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                                />
                                                <span className="text-sm text-slate-600">Required</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2" disabled={loading}>
                        {loading ? 'Creating...' : <><FaSave /> Create Election</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCustomElection;
