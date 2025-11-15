import { useState } from "react";
import type { UserProfile } from "../types/profileTypes";
import { userData } from "../constants/patientConstants";
import type { ProfileUpdateSchemaType } from "../validation/profile.schema";

export const useProfile = () => {
  const [user, setUser] = useState<UserProfile>(userData);
  
  const updateProfile = async (data: ProfileUpdateSchemaType) => {
    setUser((prev) => ({
      ...prev,
      ...data,
      image: data.image ? { url: data.image } : prev.image,
    }));
  };

  return {
    user,
    updateProfile,
  };
};
