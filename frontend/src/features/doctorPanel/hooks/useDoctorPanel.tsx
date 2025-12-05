import {
  useGetDoctorAppointmentsQuery,
  useUpdateAppointmentMutation,
} from "@/store/api/appointment-api";
import toast from "react-hot-toast";
export const useDoctorPanel = () => {
  const [updateAppointment] = useUpdateAppointmentMutation();
  const { data, isLoading } = useGetDoctorAppointmentsQuery(null);

  const appointments = data?.data;

  const updateAppointmentStatus = async (appointmentId: string) => {
    try {
      await updateAppointment({
        id: appointmentId,
        body: { newStatus: "confirmed" },
      });
      toast.success("Randevu başarıyla onaylandı");
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const deleteAppointmentStatus = async (appointmentId: string) => {
    try {
      await updateAppointment({
        id: appointmentId,
        body: { newStatus: "cancelled" },
      });
      toast.success("Randevu iptal edildi");
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return {
    appointments,
    updateAppointmentStatus,
    deleteAppointmentStatus,
    isLoading,
  };
};
