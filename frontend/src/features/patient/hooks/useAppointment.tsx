import { useEffect } from "react";
import toast from "react-hot-toast";
import { useGetAppointmentsQuery } from "@/store/api/appointment-api";
import { useUpdateAppointmentMutation } from "@/store/api/appointment-api";

export const useAppointments = () => {
  const { data: appointments } = useGetAppointmentsQuery(null);
  const [updateMutation, { error, isSuccess }] = useUpdateAppointmentMutation();

  const handleCheckout = (appointmentId: string) => {
    toast.success("Ödeme gerçekleşti.");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("İptal işlemi Başarılı");
    } else if (error && "data" in error) {
      toast.error((error as any)?.data?.message || "İptal işlemi başarısız");
    }
  }, [isSuccess, error]);

  const handleCancel = async (appointmentId: string) => {
    await updateMutation({
      id: appointmentId,
      body: { newStatus: "cancelled" },
    });
  };

  return {
    handleCheckout,
    appointments,
    handleCancel,
  };
};
