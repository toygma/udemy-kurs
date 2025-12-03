import { useGetDoctorFindIdQuery } from "@/store/api/doctor-api";

export const useDoctorDetail = (id: string | undefined) => {
  const { data: doctor, isLoading } = useGetDoctorFindIdQuery(id);

  return {
    doctor,
    isLoading,
  };
};
