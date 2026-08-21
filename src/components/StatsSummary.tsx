import { type Application, ApplicationStatus } from "../types";

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 flex-1">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

interface StatsSummaryProps {
  applications: Application[];
}

const INTERVIEW_STATUSES = new Set([
  ApplicationStatus.PhoneScreen,
  ApplicationStatus.Interview,
  ApplicationStatus.Technical,
  ApplicationStatus.FinalRound,
]);

function StatsSummary({ applications }: StatsSummaryProps) {
  const total = applications.length;
  const interviews = applications.filter((app) => INTERVIEW_STATUSES.has(app.status)).length;
  const offers = applications.filter(
    (app) => app.status === ApplicationStatus.Offer || app.status === ApplicationStatus.Accepted
  ).length;
  const rejections = applications.filter((app) => app.status === ApplicationStatus.Rejected).length;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-6">
      <StatCard label="Total Applications" value={total} />
      <StatCard label="Interviews" value={interviews} />
      <StatCard label="Offers" value={offers} />
      <StatCard label="Rejections" value={rejections} />
    </div>
  );
}

export default StatsSummary;
