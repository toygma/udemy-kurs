import { useState } from "react";
import {
  useApproveDoctorMutation,
  useGetPendingDataQuery,
  useRejectDoctorMutation,
} from "@/store/api/admin-api";
import type { Doctor } from "../types/admin.types";
import toast from "react-hot-toast";

export const useDoctorRequest = () => {
  const { data: request } = useGetPendingDataQuery(null);

  const [approveDoctor, { isLoading: isApproving }] =
    useApproveDoctorMutation();
  const [rejectDoctor, { isLoading: isRejected }] = useRejectDoctorMutation();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [modalAction, setModalAction] = useState<"approve" | "reject" | null>(
    null
  );

  const openModal = (doctor: Doctor, action: "approve" | "reject") => {
    setSelectedDoctor(doctor);
    setModalAction(action);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setModalAction(null);
  };

  const handleConfirm = async () => {
    if (!selectedDoctor || !modalAction) return;

    try {
      if (modalAction === "approve") {
        await approveDoctor({ id: selectedDoctor._id }).unwrap();
        toast.success("Başvuru başarıyla onaylandı");
      } else {
        await rejectDoctor({ id: selectedDoctor._id }).unwrap();
        toast.success("Başvuru reddedildi");
      }

      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return {
    openModal,
    request,
    handleConfirm,
    selectedDoctor,
    closeModal,
    isApproving,
    isRejected,
    modalAction,
  };
};
