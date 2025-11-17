import type { IAppointment } from "../types/doctorPanelTypes";

const StatusBadge = ({
  status,
  paid,
}: {
  status: IAppointment["status"];
  paid: IAppointment["isPaid"];
}) => {
  const statusColors: Record<IAppointment["status"], string> = {
    bekleniyor: "bg-yellow-100 text-yellow-800",
    tamamlandı: "bg-green-100 text-green-800",
    iptal: "bg-red-100 text-red-800",
  };

  const paidColors: Record<IAppointment["isPaid"], string> = {
    ödendi: "bg-green-100 text-green-800",
    ödenmedi: "bg-red-100 text-red-800",
  };
  return (
    <div className="flex gap-2">
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
      >
        {status.toUpperCase()}
      </span>
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${paidColors[paid]}`}
      >
        {paid.toUpperCase()}
      </span>
    </div>
  );
};

export default StatusBadge;
