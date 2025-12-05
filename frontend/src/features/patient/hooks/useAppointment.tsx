import { useGetAppointmentsQuery } from "@/store/api/appointment-api";
import { useUpdateAppointmentMutation } from "@/store/api/appointment-api";
import toast from "react-hot-toast";

export const useAppointments = () => {
  const { data: appointments } = useGetAppointmentsQuery(null);
  const [updateAppointment] = useUpdateAppointmentMutation();

  const handleCheckout = (appointmentId: string) => {
    toast.success("Ödeme gerçekleşti.");
  };

  const handleCancel = async (appointmentId: string) => {
    try {
      await updateAppointment({
        id: appointmentId,
        body: { newStatus: "cancelled" },
      }).unwrap();
      toast.success("Randevu başarıyla iptal edildi");
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return {
    handleCheckout,
    appointments,
    handleCancel,
  };
};
