import { useGetUserQuery } from "@/store/api/user-api";
import type { ProfileUpdateSchemaType } from "../validation/profile.schema";
import { useUpdatePatientMutation } from "@/store/api/patient-api";
import toast from "react-hot-toast";

export const useProfile = () => {
  const { data: user } = useGetUserQuery(null);
  const [updateMyProfile] = useUpdatePatientMutation();

  const updateProfile = async (data: ProfileUpdateSchemaType) => {
    try {
      await updateMyProfile(data).unwrap();
      toast.success("Başarılı bir şekilde güncellendi.");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return {
    user,
    updateProfile,
  };
};
