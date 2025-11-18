import { useState } from "react";
import { doctorServices } from "../constants/adminConstants";
import type { FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import type { TAddDoctorFormSchema } from "../validation/admin.schema";


interface ServiceInformationProps {
  error: FieldErrors<TAddDoctorFormSchema>;
  getValues: UseFormGetValues<TAddDoctorFormSchema>;
  setValues: UseFormSetValue<TAddDoctorFormSchema>;
}


const ServiceSection = ({
  error,
  getValues,
  setValues,
}: ServiceInformationProps) => {
  const [filteredServices, setFilteredServices] = useState(doctorServices);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleServices = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues("services", value);
    const filtered = doctorServices.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    if (value.trim() === "") {
      setShowSuggestions(false);
      setFilteredServices(doctorServices);
      return;
    }

    setFilteredServices(filtered);
    setShowSuggestions(true);
  };

  const handleSelectServices = (name: string) => {
    setValues("services", name);
    setShowSuggestions(false);
  };

    const handleFocus = () => {
    const value = getValues("services") || "";
    const filtered = doctorServices.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(filtered);
    if (filtered.length > 0) setShowSuggestions(true);
  };

  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Hizmet Bilgileri
      </h3>

      {/* Hizmet */}
      <div>
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Hizmet Adı
          </label>
          <input
            type="text"
            value={getValues("services") || ""}
            onChange={handleServices}
            onFocus={handleFocus}
            placeholder="Aşılama"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showSuggestions && filteredServices.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredServices.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectServices(item)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          {error?.services?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.services.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
