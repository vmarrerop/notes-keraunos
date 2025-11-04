import { TASK_STATUS_LABELS, TASK_STATUS_COLORS } from '../../../../domain/constants/taskStatuses';
import './StatusBadge.css';

export const StatusBadge = ({ status }) => {
  if (!status) return null;

  const label = TASK_STATUS_LABELS[status] || status;
  const color = TASK_STATUS_COLORS[status] || '#6c757d';

  return (
    <span 
      className="status-badge" 
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
};
