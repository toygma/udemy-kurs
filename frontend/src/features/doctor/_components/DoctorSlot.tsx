import { useEffect, useState } from "react";
import type { Doctor, ITimeSlot } from "../types/doctor.types";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/shared/utils/helper";
import Modal from "@/shared/ui/Modal";
import { useCreateAppointmentMutation } from "@/store/api/appointment-api";
import toast from "react-hot-toast";

const DoctorSlot = ({ doctor }: { doctor: Doctor }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<ITimeSlot[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ITimeSlot | null>(null);
  const [
    createAppointment,
    { isLoading: createLoading, error: createError, isSuccess },
  ] = useCreateAppointmentMutation();

  const dayMap: Record<number, string> = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  };

  const dayMapTR: Record<number, string> = {
    0: "Pazar",
    1: "Pazartesi",
    2: "Salı",
    3: "Çarşamba",
    4: "Perşembe",
    5: "Cuma",
    6: "Cumartesi",
  };

  const generateNext7Days = () => {
    const days: Date[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    setDates(days);
    setSelectedDate(days[0]);
  };

  //doktorun çalışma saatleri
  const generateTimeSlots = (date: Date): void => {
    const dayName = dayMap[date.getDay()];

    const workDay = doctor.workingHours.find((wh) => wh.day === dayName);

    if (!workDay || !workDay.isWorking) {
      setAvailableSlots([]);
      return;
    }

    const [startHour, startMin] = workDay.startTime.split(":").map(Number);
    const [endHour, endMin] = workDay.endTime.split(":").map(Number);

    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    const duration = doctor.appointmentDurationMinutes || 30;

    const slots: ITimeSlot[] = [];

    for (let time = startTime; time + duration <= endTime; time += duration) {
      const hour = Math.floor(time / 60);
      const min = time % 60;

      const timeStr = `${String(hour).padStart(2, "0")}:${String(min).padStart(
        2,
        "0"
      )}`;

      const slotDateTime = new Date(date);
      slotDateTime.setHours(hour, min, 0, 0);

      const isBooked = doctor.appointments.some((apt: any) => {
        const aptDate = new Date(apt.date);
        return aptDate.getTime() === slotDateTime.getTime();
      });

      const isPast = slotDateTime < new Date();

      slots.push({
        time: timeStr,
        dateTime: slotDateTime,
        isWorking: !isBooked && !isPast,
      });
    }

    setAvailableSlots(slots);
  };
  useEffect(() => {
    generateNext7Days();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  const handleSlotClick = (slot: ITimeSlot) => {
    if (slot.isWorking) {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Randevu oluşturma işlemi başarılı");
    } else if (createError && "data" in createError) {
      toast.error(
        (createError as any)?.data?.message || "Randevu işlemi başarısız"
      );
    }
  }, [isSuccess, createError]);

  const handleConfirmAppointment = async () => {
    if (!selectedSlot) return;
    const appointmentData = {
      doctorId: doctor._id,
      date: selectedSlot.dateTime.toISOString(),
      timeSlot: selectedSlot.time,
    };

    await createAppointment(appointmentData);

    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
        <p className="text-gray-600">{doctor.speciality}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Tarih Seçin</h3>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date, index) => {
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            const dayNameTR = dayMapTR[date.getDay()];

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="text-xs text-gray-600">{dayNameTR}</div>
                <div className="font-bold text-gray-800">{date.getDate()}</div>
                <div className="text-xs text-gray-500">
                  {date.toLocaleString("tr-TR", { month: "short" })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Saat Seçin</h3>
        </div>
        {availableSlots.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Bu gün için çalışma saati bulunmuyor
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {availableSlots.map((slot, idx) => (
              <button
                key={idx}
                disabled={!slot.isWorking}
                onClick={() => handleSlotClick(slot)}
                className={`p-3 rounded-lg border-2 font-medium transition-all ${
                  slot.isWorking
                    ? "border-green-500 bg-green-50 hover:bg-green-100 text-green-700"
                    : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Müsait</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span>Dolu/Geçmiş</span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Randevu Onayı"
          paragraph={`${formatDate(selectedSlot?.dateTime)} tarihinde saat ${
            selectedSlot?.time
          } için randevu almak istediğinize emin misiniz?`}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirmAppointment}
          loading={createLoading}
        />
      )}
    </div>
  );
};

export default DoctorSlot;
