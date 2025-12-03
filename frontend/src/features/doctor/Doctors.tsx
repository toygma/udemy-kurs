import LayoutContainer from "@/shared/ui/LayoutContainer";
import { categories } from "./constants/doctorConstants";
import { useDoctors } from "./hooks/useDoctors";

import DoctorCard from "./_components/DoctorCard";

const Doctors = () => {
  const { doctors, handleCategoryChange, selectedCategory,isLoading } =
    useDoctors();
  console.log("🚀 ~ Doctors ~ doctors:", doctors)

  return (
    <LayoutContainer>
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
        {/* SIDEBAR */}
        <aside className="w-full md:w-72 lg:w-80 md:shrink-0 mb-8 md:mb-0">
          <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 h-full">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Uzmanlık Alanları
              </h2>
              <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                Aramak için filtrele
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-x-visible pb-2 md:pb-0 -mx-2 px-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`w-[250px] h-full shrink-0 md:w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl flex items-center gap-3 text-sm sm.text-base ${
                    selectedCategory === cat.id
                      ? "bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span className="text-xl sm:text-2xl">{cat.icon}</span>
                  <span className="font-medium truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
        {/* MAIN CONTENT */}
        {isLoading ? (
          <div>Yükleniyor...</div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <div className="mb-6 lg:mb-8">
              <h1>
                {selectedCategory === "all"
                  ? "Tüm Doktorlar"
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {doctors.count} Doktor Gösteriliyor.
              </p>
            </div>
            <DoctorCard filteredDoctors={doctors} />
          </div>
        )}
      </div>
    </LayoutContainer>
  );
};

export default Doctors;
