const StatsCard = ({
  label,
  value,
  icon,
  variant,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  variant: "total" | "pending" | "confirmed" | "cancel";
}) => {
  const styles = {
    total: "border-blue-500 bg-blue-50",
    pending: "border-amber-500 bg-amber-50",
    confirmed: "border-green-500 bg-green-50",
    cancel: "border-gray-500 bg-gray-50",
  };
  return (
    <div
      className={`rounded-lg p-4 flex items-center justify-between border-l-4 ${styles[variant]}`}
    >
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      {icon}
    </div>
  );
};

export default StatsCard;
