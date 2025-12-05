import { Clock, CreditCard, MapPin, X } from "lucide-react";
import type { AppointmentCardProps } from "../types/appointmentTypes";
import { formatDate } from "@/shared/utils/helper";

const AppointmentCard = ({
  appointment,
  onPayment,
  onCancel,
}: AppointmentCardProps) => {
  console.log("🚀 ~ AppointmentCard ~ appointment:", appointment)
  const isPaid = appointment.isPaid === "ödendi";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100 relative">
      <div className="flex flex-col md:flex-row ">
        {/* Doctor Image */}
        <div className="md:w-1/4 bg-linear-to-br from-blue-100 to-blue-50 flex items-center justify-center overflow-hidden aspect-square">
          <img
            src={appointment.doctor?.image?.url}
            alt={`Dr. ${appointment.doctor.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Appointment Info */}
        <div className="flex-1 p-8 flex flex-col justify-between ">
          <div className="space-y-4">
            {/* Doctor Name & Payment Status */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {appointment.doctor.name}
                </h3>
                {isPaid && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    ✓ Ödendi
                  </span>
                )}
              </div>
              <p className="text-blue-600 font-semibold text-lg">
                {appointment.doctor.speciality}
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              {/* Location */}
              {appointment.doctor.address?.city && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 mb-0.5">Adres</p>
                    <p className="text-gray-800">
                      {appointment.doctor.address.city}
                    </p>
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 mb-0.5">Tarih</p>
                  <p className="text-gray-800 font-semibold">
                    {formatDate(appointment.date)} -{appointment.timeSlot}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
            {/* Payment Button */}
            <button
              onClick={() => onPayment(appointment._id)}
              disabled={isPaid}
              className={`flex-1 ${
                isPaid
                  ? "bg-green-500 cursor-default"
                  : "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              } text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md`}
            >
              <CreditCard className="w-5 h-5" />
              {isPaid ? "Ödeme Tamamlandı" : "Online Öde"}
            </button>

            {/* Cancel Button */}
            {!isPaid && (
              <button
                onClick={() => onCancel(appointment._id)}
                className="flex-1 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                İptal
              </button>
            )}
          </div>
        </div>
      </div>
      {appointment?.status === "cancelled" && (
        <>
          {" "}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-[300px]">
              <h1 className="text-xl font-bold mb-3 text-center">
                Randevu iptal edildi
              </h1>
              <p className="text-gray-600 mb-4">
                Randevunuz başarıyla iptal edildi.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AppointmentCard;
