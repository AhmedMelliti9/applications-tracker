import { type Application } from "../types";
import { STATUS_CONFIG } from "../config/statusConfig";

interface ApplicationCardProps {
  application: Application;
}

function ApplicationCard({ application }: ApplicationCardProps) {
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
    </div>
  );
}

export default ApplicationCard;