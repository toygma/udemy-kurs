// hooks/useLocalAppointments.ts

import { useState } from "react";
import toast from "react-hot-toast";
import type { Appointment } from "../types/appointmentTypes";

export const useLocalAppointments = (initialData: Appointment[]) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialData);
  const [loadingCheckoutId, setLoadingCheckoutId] = useState<string | null>(
    null
  );
  const [loadingCancelId, setLoadingCancelId] = useState<string | null>(null);

  const handleCheckout = async (appointmendId:string) => {

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAppointments((prev) => {
          return prev.map((apt) =>
            apt._id === appointmendId
              ? {
                  ...apt,
                  isPaid: "ödendi",
                  paymentId: `pay_${Date.now()}`,
                }
              : apt
          );
        });

        setLoadingCheckoutId(null);
        toast.success("Ödeme Gerçekleşti!");
        resolve();
      }, 1500);
    });
  };

  const handleCancel = async (appointmentId: string) => {
    setLoadingCancelId(appointmentId);
    console.log("🚀 ~ handleCancel ~ appointmentId:", appointmentId)

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setAppointments((prev) =>
          prev.filter((apt) => apt._id !== appointmentId)
        );

        setLoadingCancelId(null);
        toast.success("Randevu başarılı bir şekilde iptal edildi.");
        resolve();
      }, 1000);
    });
  };

  return {
    appointments,
    loadingCheckoutId,
    loadingCancelId,
    handleCheckout,
    handleCancel,
  };
};
