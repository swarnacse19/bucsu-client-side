import { FaVoteYea } from 'react-icons/fa';

const VoterRules = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <FaVoteYea className="text-indigo-600" /> Rules for Voters
      </h1>
      <p className="text-slate-600 mt-2">Voting eligibility and conduct.</p>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <ul className="space-y-2 text-slate-600">
        <li>• Only registered students can vote.</li>
        <li>• One vote per position per election.</li>
        <li>• Voting is allowed only during the official election window.</li>
        <li>• Votes are final and cannot be changed after submission.</li>
      </ul>
      <p className="text-sm text-slate-500 mt-4">These rules are enforced by the platform. Authority manages elections and result publication.</p>
    </div>
  </div>
);

export default VoterRules;
