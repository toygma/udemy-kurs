import { useState } from "react";
import { doctorPanelConstants } from "../constants/doctorConstants";
import type { IAppointment } from "../types/doctorPanelTypes";

export const useDoctorPanel = () => {
  const [appointments, setAppointments] =
    useState<IAppointment[]>(doctorPanelConstants);

  const updateAppointmentStatus = (appointmentId: string) => {
    try {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: "tamamlandı" } : apt
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointmentStatus = (appointmentId: string) => {
    try {
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === appointmentId ? { ...apt, status: "iptal" } : apt
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
