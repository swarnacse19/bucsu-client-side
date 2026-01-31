import { useState } from 'react';
import { FaUserTie } from 'react-icons/fa';

const CandidateRules = () => {
  const [rules, setRules] = useState(`• Must be a registered student.
• Must meet minimum GPA requirements (if set by institution).
• No duplicate applications per election.
• One position per election per candidate.
• Manifesto and profile information must be complete.`);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <FaUserTie className="text-indigo-600" /> Rules for Candidate Apply
        </h1>
        <p className="text-slate-600 mt-2">These rules apply when students apply as candidates. Authority can enforce them during application review.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Current rules (display only)</label>
        <pre className="whitespace-pre-wrap text-slate-600 bg-slate-50 rounded-xl p-4 border border-slate-100">{rules}</pre>
        <p className="text-sm text-slate-500 mt-4">Rule persistence can be wired to an API. For now, use these as guidelines when approving or rejecting applications.</p>
      </div>
    </div>
  );
};

export default CandidateRules;
