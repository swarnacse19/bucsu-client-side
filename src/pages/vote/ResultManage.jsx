import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ResultModal from "./ResultModal";
import { FaPoll, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";

const ResultManage = () => {
  const axios = useAxios();
  const [elections, setElections] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadElections = async () => {
      try {
        const res = await axios.get("/elections/ended");
        const updated = await Promise.all(
          res.data.map(async (election) => {
            const check = await axios.get(`/results/check/${election._id}`);
            return {
              ...election,
              isCounted: check.data.counted,
            };
          })
        );
        setElections(updated);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadElections();
  }, [axios]);

  const countResult = async (election) => {
    const res = await axios.get(`/count/${election._id}`);
    setSelectedResult({
      electionId: election._id,
      electionTitle: election.title,
      results: res.data,
    });
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-3 rounded-lg shadow-blue-200 shadow-lg">
            <FaPoll className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Result Management</h2>
            <p className="text-sm text-gray-500 font-medium">Process and analyze election outcomes</p>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Election Title
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="flex justify-center items-center gap-2 text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                      </div>
                    </td>
                  </tr>
                ) : elections.length > 0 ? (
                  elections.map((e) => (
                    <tr key={e._id} className="hover:bg-gray-50/80 transition-all group">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                          {e.title}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {e.isCounted ? (
                          <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit border border-green-100">
                            <FaCheckCircle className="text-xs" />
                            <span className="text-xs font-bold uppercase tracking-tight">Counted</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-100">
                            <FaHourglassHalf className="text-xs" />
                            <span className="text-xs font-bold uppercase tracking-tight">Pending</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button
                          disabled={e.isCounted}
                          onClick={() => countResult(e)}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 ${
                            e.isCounted
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200"
                          }`}
                        >
                          <IoBarChartSharp />
                          {e.isCounted ? "Results Ready" : "Calculate Result"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-20 text-center text-gray-400">
                      No ended elections available for processing.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedResult && (
        <ResultModal
          data={selectedResult}
          close={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
};

export default ResultManage;