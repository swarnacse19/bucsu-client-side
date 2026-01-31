import { FaBook, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaVoteYea, FaUserTie } from 'react-icons/fa';

const Guidelines = () => {
  const votingRules = [
    'Each registered student can vote only once per position in an election.',
    'Votes are anonymous and cannot be traced back to individual voters.',
    'Voting is only allowed during the specified election period.',
    'You must be logged in with your registered student account to vote.',
    'Once a vote is submitted, it cannot be changed or withdrawn.',
    'Multiple voting attempts will be automatically blocked by the system.',
  ];

  const candidateRules = [
    'Only registered students can apply for candidacy.',
    'Candidate applications require admin approval before listing.',
    'Each student can apply for only one position per election.',
    'Candidates must submit a manifesto and a clear photo.',
    'Approved candidates will be notified via email.',
    'Campaign activities must follow university guidelines.',
  ];

  const generalGuidelines = [
    'Maintain respect and dignity during the election process.',
    'Do not engage in any form of vote manipulation or fraud.',
    'Report any suspicious activities to the election committee.',
    'Results will be published after the election period ends.',
    'All decisions by the election committee are final.',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <FaBook className="text-blue-600 text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Election Guidelines</h1>
            <p className="text-gray-500">Rules and regulations for voting and candidacy</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Voting Rules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-green-50 p-4 border-b border-green-100">
            <div className="flex items-center gap-3">
              <FaVoteYea className="text-green-600 text-xl" />
              <h2 className="text-lg font-semibold text-green-800">Voting Rules</h2>
            </div>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              {votingRules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Candidate Rules */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-purple-50 p-4 border-b border-purple-100">
            <div className="flex items-center gap-3">
              <FaUserTie className="text-purple-600 text-xl" />
              <h2 className="text-lg font-semibold text-purple-800">Candidate Rules</h2>
            </div>
          </div>
          <div className="p-5">
            <ul className="space-y-3">
              {candidateRules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* General Guidelines */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-50 p-4 border-b border-blue-100">
          <div className="flex items-center gap-3">
            <FaInfoCircle className="text-blue-600 text-xl" />
            <h2 className="text-lg font-semibold text-blue-800">General Guidelines</h2>
          </div>
        </div>
        <div className="p-5">
          <ul className="space-y-3">
            {generalGuidelines.map((guideline, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{guideline}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
        <div className="flex items-start gap-4">
          <FaExclamationTriangle className="text-yellow-600 text-2xl flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
            <p className="text-yellow-700">
              Violation of any election rules may result in disqualification of candidacy or
              suspension of voting privileges. The election committee reserves the right to
              take appropriate action against any misconduct.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
