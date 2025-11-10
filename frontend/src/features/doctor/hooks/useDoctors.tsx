import { useMemo, useState, useTransition } from "react";
import { doctors } from "../constants/doctorConstants";

export const useDoctors = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isPending, startTransition] = useTransition();

    const filteredDoctors = useMemo(() => {
      if (!doctors) return [];

      if (selectedCategory === "all") {
        return doctors;
      }

      return doctors.filter(
        (doc) =>
          doc.specialityKey.toLowerCase() === selectedCategory.toLowerCase()
      );
    }, [selectedCategory]);



  const handleCategoryChange = (categoryId: string) => {
    startTransition(() => {
      setSelectedCategory(categoryId);
    });
  };

  return {
    selectedCategory,
    filteredDoctors,
    isPending,
    handleCategoryChange,
  };
};
