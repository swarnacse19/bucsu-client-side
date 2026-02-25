import React from 'react';

const ViewResultModal = ({ data, close }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl p-0 overflow-hidden border border-slate-200 shadow-2xl">
        
        {/* Header Section */}
        <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-20">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-extrabold text-2xl text-slate-800 tracking-tight">
                {data.electionName}
              </h3>
              <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-wider">
                Official Election Results
              </p>
            </div>
            <button 
              onClick={close} 
              className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-8 custom-scrollbar bg-slate-50/50">
          {data.results.map((r) => (
            <div key={r.position} className="relative">
              {/* Position Title with Badge */}
              <div className="flex items-center justify-between mb-4 sticky top-0 bg-transparent py-1">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-indigo-600 rounded-full"></div>
                  <h4 className="text-base font-bold uppercase tracking-widest text-slate-700">
                    {r.position}
                  </h4>
                </div>
                {r.isDraw && (
                  <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full border border-orange-200">
                    RESULT: DRAW
                  </span>
                )}
              </div>

              {/* Candidates List */}
              <div className="grid gap-3">
                {r.candidates.map((c) => {
                  const isWinner = !r.isDraw && c.studentId === r.winner?.studentId;
                  
                  return (
                    <div
                      key={c.studentId}
                      className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                        isWinner
                          ? "bg-white border-amber-300 shadow-lg shadow-amber-100/50 ring-1 ring-amber-400/20"
                          : "bg-white border-slate-200 hover:border-indigo-200"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={c.photo}
                            alt={c.name}
                            className={`w-14 h-14 rounded-full object-cover border-2 shadow-sm ${
                              isWinner ? "border-amber-400" : "border-slate-100"
                            }`}
                          />
                          {isWinner && (
                            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 border-white">
                              <span className="text-xs">🏆</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <p className={`font-bold text-lg leading-none ${isWinner ? 'text-slate-900' : 'text-slate-700'}`}>
                            {c.name}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                              ID: {c.studentId}
                            </span>
                            {c.department && (
                              <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded">
                                {c.department}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Vote Count Section */}
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className={`text-2xl font-black ${isWinner ? 'text-amber-600' : 'text-slate-800'}`}>
                            {c.votes}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest -mt-1">
                            Votes
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
          <button 
            className="btn btn-ghost text-slate-500 font-bold hover:bg-slate-100 px-8" 
            onClick={close}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewResultModal;