import { useState } from "react";
import { userData } from "../constants/profileConstants";
import type { UserProfile } from "../types/profileTypes";
import type { ProfileUpdateSchemaType } from "../validation/profile.schema";

export const useProfile = () => {
  const [user, setUser] = useState<UserProfile>(userData);

  const updateProfile = (data: ProfileUpdateSchemaType) => {
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
