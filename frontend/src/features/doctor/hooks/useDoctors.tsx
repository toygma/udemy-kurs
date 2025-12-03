import { useEffect, useState } from "react";
import { useGetAllDoctorsQuery } from "@/store/api/doctor-api";
import type { Doctor } from "../types/doctorTypes";

export const useDoctors = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: doctors, isLoading } = useGetAllDoctorsQuery(null);

  useEffect(() => {
    if (selectedCategory === "all") {
      return doctors;
    }

    return doctors.filter(
      (doc: Doctor) =>
        doc.specialityKey.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return {
    selectedCategory,
    handleCategoryChange,
    doctors,
    isLoading,
  };
};
