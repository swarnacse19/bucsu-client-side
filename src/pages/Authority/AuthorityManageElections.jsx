import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaPlus, FaTrash, FaSearch, FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  formatDateTime,
  isOngoing,
  isPast,
  isFuture,
} from "../../utils/formateDate";
import useAxios from "../../hooks/useAxios";
import Loading from "../../loading/Loading";

const AuthorityManageElections = () => {
  const axios = useAxios();
  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    positions: "",
    status: "active",
  });

  const fetchElections = async () => {
    try {
      const { data } = await axios.get("/elections");
      setElections(Array.isArray(data) ? data : []);
    } catch {
      setElections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const getStatus = (e) => {
    if (e.status === "ongoing" || isOngoing(e.startDate, e.endDate))
      return "ongoing";
    if (e.status === "paused") return "paused";
    if (isPast(e.endDate)) return "ended";
    if (isFuture(e.startDate)) return "upcoming";
    return "unknown";
  };

  const openEditModal = async (id) => {
    try {
      const { data } = await axios.get(`/elections/${id}`);
      setEditId(id);
      setForm({
        title: data.title || "",
        description: data.description || "",
        type: data.type || "",
        startDate: data.startDate?.slice(0, 16),
        endDate: data.endDate?.slice(0, 16),
        positions: data.positions?.join(", ") || "",
        status: data.status || "active",
      });
      setOpen(true);
    } catch {
      toast.error("Failed to load election data");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const positionsArray = form.positions
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    try {
      await axios.patch(`/elections/${editId}`, {
        title: form.title,
        description: form.description,
        type: form.type,
        startDate: new Date(form.startDate),
        endDate: new Date(form.endDate),
        positions: positionsArray, 
        status: form.status,
      });

      toast.success("Election updated");
      setOpen(false);
      fetchElections();
    } catch {
      toast.error("Failed to update election");
    }
  };

  const handleDelete = async (id, title) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete election?",
      text: `"${title}" and all related data will be removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    });
    if (!isConfirmed) return;
    try {
      await axios.delete(`/elections/${id}`);
      toast.success("Election deleted");
      fetchElections();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = elections.filter((e) => {
    const match = e.title?.toLowerCase().includes(search.toLowerCase());
    const st = getStatus(e);
    const matchF = filter === "all" || st === filter;
    return match && matchF;
  });

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Manage Elections</h1>
        <Link
          to="/authority/create-election"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
        >
          <FaPlus /> Create Election
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
            <option value="ended">Ended</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Election
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Type
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Start
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  End
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((e) => {
                const st = getStatus(e);
                return (
                  <tr key={e._id}>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">{e.title}</p>
                      <p className="text-sm text-slate-500 truncate max-w-xs">
                        {e.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 capitalize">
                      {e.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatDateTime(e.startDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatDateTime(e.endDate)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          st === "ongoing"
                            ? "bg-emerald-100 text-emerald-700"
                            : st === "upcoming"
                              ? "bg-blue-100 text-blue-700"
                              : st === "paused"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {st}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(e._id)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          title="Edit"
                        >
                          <FaRegEdit />
                        </button>
                        {/*  */}
                        <button
                          onClick={() => handleDelete(e._id, e.title)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!filtered.length && (
          <div className="p-12 text-center text-slate-500">
            No elections found.
          </div>
        )}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4"
          >
            <h2 className="text-xl font-semibold">Edit Election</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Title 
              </label>
            <input
              className="w-full border p-2 rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              required
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Positions 
              </label>
            <input
              className="w-full border p-2 rounded"
              value={form.positions}
              onChange={(e) => setForm({ ...form, positions: e.target.value })}
              placeholder="Write Positions"
              required
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Description 
              </label>
            <textarea
              className="w-full border p-2 rounded"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
                start date 
              </label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              required
            />
<label className="block text-sm font-medium text-gray-700 mb-1">
                end date 
              </label>
            <input
              type="datetime-local"
              className="w-full border p-2 rounded"
              value={form.endDate}
              onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              required
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthorityManageElections;
