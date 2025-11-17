import { useState } from "react";
import type { Appointment } from "../types/appointmentTypes";
import toast from "react-hot-toast";
import { mockAppointments } from "../constants/appointmentConstants";

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const handleCheckout = (appointmentId: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt._id === appointmentId
          ? { ...apt, isPaid: "ödendi", paymentId: crypto.randomUUID() }
          : apt
      )
    );

    toast.success("Ödeme gerçekleşti.");
  };

  const handleCancel = (appointmentId: string) => {
    setAppointments((prev) => prev.filter((apt) => apt._id !== appointmentId));

    toast.success("Randevu başarıyla silindi.");
  };

  return {
    handleCheckout,
    appointments,
    handleCancel,
  };
};
