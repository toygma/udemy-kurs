import { useGetAllDoctorsQuery } from "@/store/api/doctor-api";
import { useEffect, useState } from "react";
import type { Doctor, DoctorApiResponse } from "../types/doctorTypes";

export const useDoctors = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tüm Doktorlar");
  const [filteredDoctors, setFilteredDoctors] = useState<
    DoctorApiResponse | undefined
  >(undefined);

  const { data: doctors, isLoading } = useGetAllDoctorsQuery(null);

  useEffect(() => {
    if (!doctors) {
      setFilteredDoctors(undefined);
      return;
    }

    if (selectedCategory === "Tüm Doktorlar") {
      setFilteredDoctors(doctors);
      return;
    }
    const filtered = doctors.data.filter((doc: Doctor) => {
      return doc.speciality.toLowerCase() === selectedCategory.toLowerCase();
    });

    setFilteredDoctors({
      data: filtered,
      count: filtered.length,
      success: true,
    });
  }, [doctors, selectedCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return {
    selectedCategory,
    handleCategoryChange,
    isLoading,
    filteredDoctors,
  };
};
