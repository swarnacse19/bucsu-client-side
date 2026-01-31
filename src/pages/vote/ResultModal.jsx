import { toast, ToastContainer } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const ResultModal = ({ data, close }) => {
//   console.log(data.results);
  const axiosSecure = useAxios();

  const publishResult = async () => {
    try {
      await axiosSecure.post("/results/publish", {
        electionId: data.electionId,
        electionName: data.electionTitle,
        results: data.results,
      });

      toast.success("Result published successfully");
      close();
    } catch (error) {
      toast.error("Failed to publish result");
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-lg mb-4">
          {data.electionTitle} - Results
        </h3>

        {data.results.map((r) => (
          <div key={r.position} className="mb-4">
            <h4 className="font-semibold">Position: {r.position}</h4>

            <div className="space-y-3">
              {r.candidates.map((c) => (
                <div
                  key={c.studentId}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    c.studentId === r.winner.studentId
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  {/* Left: Photo + Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={c.photo}
                      alt={c.name}
                      className="w-12 h-12 rounded-full object-cover border"
                    />

                    <div>
                      <p className="font-semibold text-gray-800">{c.name}</p>
                      <p className="text-sm text-gray-500">{c.studentId}</p>
                    </div>
                  </div>

                  {/* Right: Votes + Winner */}
                  <div className="text-right">
                    <p className="font-bold text-lg">{c.votes} votes</p>

                    {c.studentId === r.winner.studentId && (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-600">
                        🏆 Winner
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="modal-action">
          <button className="btn btn-success" onClick={publishResult}>
            Publish Result
          </button>
          <button className="btn" onClick={close}>
            Close
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000}></ToastContainer>
    </div>
  );
};

export default ResultModal;
