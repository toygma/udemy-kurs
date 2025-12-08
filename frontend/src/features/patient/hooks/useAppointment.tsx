import { useGetAppointmentsQuery } from "@/store/api/appointment-api";
import { useUpdateAppointmentMutation } from "@/store/api/appointment-api";
import { useCreateCheckoutMutation } from "@/store/api/checkout-api";
import toast from "react-hot-toast";

export const useAppointments = () => {
  const { data: appointments } = useGetAppointmentsQuery(null);
  const [updateAppointment] = useUpdateAppointmentMutation();
  const [createCheckout] = useCreateCheckoutMutation();

  const handleCheckout = async (appointmentId: string, doctorId: string) => {
    try {
      const response = await createCheckout({
        appointmentId,
        doctorId,
      }).unwrap();
      console.log("🚀 ~ handleCheckout ~ response:", response)
      if (response.sessionUrl) {
        window.location.href = response.sessionUrl;
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
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
