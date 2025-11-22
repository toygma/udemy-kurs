import { useState } from "react";
import type { DoctorRequest } from "../types/adminTypes";
import { MOCK_DOCTOR_REQUESTS } from "../constants/adminConstants";

export const useDoctorRequest = () => {
  const [request, setRequest] = useState<DoctorRequest[]>(MOCK_DOCTOR_REQUESTS);

  const handleApprove = (id: number) => {
    if (confirm("doktoru onaylamak istediğinize emin misiniz?")) {
      const updatedList = request.filter((doctor) => doctor.id !== id);
      setRequest(updatedList);
    }
  };
  const handleReject = (id: number) => {
    if (confirm("doktoru reddetmek istediğinize emin misiniz?")) {
      const updatedList = request.filter((doctor) => doctor.id !== id);
      setRequest(updatedList);
    }
  };

  return {
    handleApprove,
    request,
    handleReject,
  };
};
