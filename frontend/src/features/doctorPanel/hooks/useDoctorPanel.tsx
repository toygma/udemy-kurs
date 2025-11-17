import { useState } from "react";
import { doctorPanelConstants } from "../constants/doctorConstants";
import type { IAppointment } from "../types/doctorPanelTypes";

export const useDoctorPanel = () => {
  const [appointments, setAppointments] =
    useState<IAppointment[]>(doctorPanelConstants);

  const updateAppointmentStatus = (appointmentId: string) => {
    try {
      setAppointments((prev) =>
        prev.map((item) =>
          item._id === appointmentId ? { ...item, status: "tamamlandı" } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointmentStatus = (appointmentId: string) => {
    try {
      setAppointments((prev) =>
        prev.map((item) =>
          item._id === appointmentId ? { ...item, status: "iptal" } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return {
    appointments,
    updateAppointmentStatus,
    deleteAppointmentStatus,
  };
};
