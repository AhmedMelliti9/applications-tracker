import { type Application, ApplicationStatus } from "../types";
import { STATUS_CONFIG } from "../config/statusConfig";

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (application: Application) => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

function ApplicationCard({ application, onEdit, onDelete, onStatusChange }: ApplicationCardProps) {
  const statusConfig = STATUS_CONFIG[application.status];

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700/50 hover:scale-[1.02] transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{application.companyName}</h3>
          <p className="text-gray-400 text-sm">{application.position}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusConfig.color} ${statusConfig.bgColor}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className="mt-3 text-sm text-gray-500 flex justify-between">
        <span>{application.location || "—"}</span>
        <span>Applied {application.dateApplied}</span>
      </div>

      <select
        value={application.status}
        onChange={(e) => onStatusChange(application.id, e.target.value as ApplicationStatus)}
        className="mt-3 w-full bg-gray-800 rounded-lg px-2 py-1 text-sm outline-none"
      >
        {Object.values(ApplicationStatus).map((status) => (
          <option key={status} value={status}>
            {STATUS_CONFIG[status].label}
          </option>
        ))}
      </select>

      <div className="mt-3 flex gap-2">
        <button onClick={() => onEdit(application)}
          className="flex-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg py-1.5 transition">
          Edit
        </button>
        <button onClick={() => onDelete(application)}
          className="flex-1 text-sm bg-gray-800 hover:bg-red-900 text-red-400 rounded-lg py-1.5 transition">
          Delete
        </button>
      </div>
    </div>
  );
}

export default ApplicationCard;
