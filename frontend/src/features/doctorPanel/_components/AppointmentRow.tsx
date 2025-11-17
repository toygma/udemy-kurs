import { Calendar, CheckCircle, Clock, User, XCircle } from "lucide-react";
import type { IAppointment } from "../types/doctorPanelTypes";
import StatusBadge from "./StatusBadge";

const AppointmentRow = ({
  appointment,
  onUpdate,
  onDelete,
}: {
  appointment: IAppointment;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <User className="text-blue-600" size={20} />
      </div>
      <div>
        <p className="font-semibold text-gray-800">{appointment.user.name}</p>
        <p className="text-sm text-gray-500">
          {appointment?.user?.phone || ""}
        </p>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <Calendar className="text-gray-400" size={16} />
        <span>{new Date(appointment.date).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Clock className="text-gray-400" size={16} />
        <span className="text-gray-600 text-sm">{appointment.timeSlot}</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <StatusBadge status={appointment.status} paid={appointment.isPaid} />
    </td>
    <td className="px-6 py-4">
      {appointment.status === "bekleniyor" ? (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => onUpdate(appointment._id)}
          className="flex-1 max-w-[140px] px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-1 text-sm whitespace-nowrap"
          >
            <CheckCircle size={16} /> Tamamlandı
          </button>
          <button
            onClick={() => onDelete(appointment._id)}
            className="flex-1 max-w-[140px] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-1 text-sm whitespace-nowrap"
          >
            <XCircle size={16} /> İptal
          </button>
        </div>
      ) : (
         <div className="text-center">
        <span className="text-gray-400 text-sm">Tamamlandı.</span>
      </div>
      )}
    </td>
  </tr>
);

export default AppointmentRow;