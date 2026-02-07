const ViewResultModal = ({ data, close }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <h3 className="font-bold text-xl mb-4">
          {data.electionName}
        </h3>

        {data.results.map(r => (
          <div key={r.position} className="mb-6">
            <h4 className="text-lg font-semibold mb-3 uppercase">
              Position: {r.position}
            </h4>

            <div className="space-y-3">
              {r.candidates.map(c => (
                <div
                  key={c.studentId}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    c.studentId === r.winner.studentId
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={c.photo}
                      alt={c.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      {/* <p className="text-sm text-gray-500">
                        {c.studentId}
                      </p> */}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">{c.votes} votes</p>
                    {c.studentId === r.winner.studentId && (
                      <span className="text-sm text-yellow-600 font-semibold">
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
          <button className="btn" onClick={close}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewResultModal;
