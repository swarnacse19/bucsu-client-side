import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ViewResultModal from "./ViewResultModal";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaRegCalendarAlt, FaEye } from "react-icons/fa";
import { MdOutlineBallot } from "react-icons/md";

const ViewResults = () => {
  const axiosSecure = useAxios();
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure.get("/results")
      .then(res => {
        setResults(res.data);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const viewResult = async (electionId) => {
    const res = await axiosSecure.get(`/results/${electionId}`);
    setSelected(res.data);
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-3 rounded-xl shadow-lg shadow-emerald-100">
              <HiOutlineDocumentReport className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Election Results</h2>
              <p className="text-sm text-gray-500 font-medium">Browse and analyze official outcomes</p>
            </div>
          </div>
          <div className="hidden md:block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold border border-emerald-100 uppercase tracking-widest">
            {results.length} Published Results
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <MdOutlineBallot className="text-lg" />
                      Election Name
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaRegCalendarAlt />
                      Published At
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-16 text-center">
                      <div className="flex justify-center items-center gap-2 text-emerald-500">
                        <span className="w-2 h-2 bg-current rounded-full animate-ping"></span>
                        <span className="font-medium text-gray-400">Loading Results...</span>
                      </div>
                    </td>
                  </tr>
                ) : results.length > 0 ? (
                  results.map((r) => (
                    <tr key={r.electionId} className="hover:bg-emerald-50/30 transition-all group">
                      <td className="px-6 py-5">
                        <div className="font-bold text-gray-700 group-hover:text-emerald-700 transition-colors capitalize">
                          {r.electionName}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-gray-600 flex flex-col">
                          <span className="font-medium">
                             {new Date(r.publishedAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                             })}
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-tighter italic">
                            Official Release
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => viewResult(r.electionId)}
                          className="inline-flex items-center gap-2 bg-white text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg font-bold text-sm transition-all hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-100 active:scale-95"
                        >
                          <FaEye className="text-base" />
                          View Detailed Results
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-20 text-center">
                      <div className="text-gray-400 italic">No results have been published yet.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <ViewResultModal
          data={selected}
          close={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default ViewResults;