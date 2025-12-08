import { useGetAllDoctorsQuery } from "@/store/api/doctor-api";
import { useEffect, useState } from "react";
import type { DoctorApiResponse } from "../types/doctor.types";
import { useSearchParams } from "react-router";

export const useDoctors = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Tüm Doktorlar");
  const [filteredDoctors, setFilteredDoctors] = useState<
    DoctorApiResponse | undefined
  >(undefined);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "Tüm Doktorlar";

  const params: { page: number; category?: string } = {
    page: currentPage,
  };

  if (selectedCategory !== "Tüm Doktorlar") {
    params.category = selectedCategory;
  }
  const { data: doctors, isLoading } = useGetAllDoctorsQuery(params);

  useEffect(() => {
    setFilteredDoctors(doctors);
  }, [doctors]);

  useEffect(() => {
    if (category) {
      searchParams.delete("query");
      setSearchParams(searchParams);
    }
  }, [category, setSearchParams]);

  const handlePageClick = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    const params: Record<string, string> = { page: newPage.toString() };
    if (selectedCategory !== "Tüm Doktorlar") {
      params.category = selectedCategory;
    }
    setSearchParams(params);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    setSearchParams({ page: "1", category: categoryId });
  };

  return {
    selectedCategory,
    handleCategoryChange,
    isLoading,
    filteredDoctors,
    handlePageClick,
  };
};
