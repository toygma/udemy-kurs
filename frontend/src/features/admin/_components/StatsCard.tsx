const StatsCard = ({
  icon,
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
}) => (
  <div
    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} hover:shadow-xl transition-shadow`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

export default StatsCard;
