import React from 'react'
import { formatDate } from '../utils/formateDate';
import { StatusBadge } from './StatusBadge';

export const ApplicationCard = ({ application }) => {

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {application.electionTitle}
            </h3>
            <p className="text-sm text-gray-500">
              Position: {application.position}
            </p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Manifesto:</p>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 line-clamp-3">
              {application.manifesto}
            </p>
          </div>

          {application.experience && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Experience:
              </p>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 line-clamp-2">
                {application.experience}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Applied on {formatDate(application.appliedAt)}
          </span>

          {application.status === 'approved' && (
            <span className="text-green-600 font-medium">
              You are now a candidate!
            </span>
          )}

          {application.status === 'rejected' && (
            <span className="text-red-600 font-medium">
              Application was not approved
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
