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

function StatsSummary() {
  // Placeholder values — Day 3 will wire these to real application data
  const stats = { total: 0, interviews: 0, offers: 0, rejections: 0 };

  return (
    <div className="flex gap-4 p-6">
      <StatCard label="Total Applications" value={stats.total} />
      <StatCard label="Interviews" value={stats.interviews} />
      <StatCard label="Offers" value={stats.offers} />
      <StatCard label="Rejections" value={stats.rejections} />
    </div>
  );
}

export default StatsSummary;