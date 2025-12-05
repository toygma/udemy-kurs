import type { IAppointment } from "../types/doctorPanelTypes";

const StatusBadge = ({
  status,
  paid,
}: {
  status: IAppointment["status"];
  paid: IAppointment["isPaid"];
}) => {
  const statusColors: Record<IAppointment["status"], string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const paidColors: Record<IAppointment["isPaid"], string> = {
    paid: "bg-green-100 text-green-800",
    unpaid: "bg-red-100 text-red-800",
  };

 const statusText: Record<IAppointment["status"], string> = {
    pending: "Bekleniyor",
    confirmed: "Onaylandı",
    cancelled: "İptal edildi",
  };

   const paidText: Record<IAppointment["isPaid"], string> = {
    paid: "Ödendi",
    unpaid: "Ödenmedi",
  };

  
  return (
    <div className="flex gap-2">
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
      >
        {statusText[status]}
      </span>
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${paidColors[paid]}`}
      >
        {paidText[paid]}
      </span>
    </div>
  );
};

export default StatusBadge;
