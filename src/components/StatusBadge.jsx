import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from 'react-icons/fa';

export const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      icon: FaHourglassHalf,
      color: 'bg-yellow-100 text-yellow-700',
      label: 'Pending',
    },
    approved: {
      icon: FaCheckCircle,
      color: 'bg-green-100 text-green-700',
      label: 'Approved',
    },
    rejected: {
      icon: FaTimesCircle,
      color: 'bg-red-100 text-red-700',
      label: 'Rejected',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};