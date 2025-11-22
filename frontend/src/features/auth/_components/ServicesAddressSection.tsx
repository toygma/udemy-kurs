import { useState } from "react";
import FormInput from "@/shared/ui/FormInput";
import type { AuthFormProps } from "../types/authTypes";
import { doctorServices } from "@/features/admin/constants/adminConstants";

const ServiceAddressSection = ({ register, errors, setValue }: AuthFormProps) => {
  const [filteredService, setFilteredService] = useState(doctorServices);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelectSpeciality = (services: string) => {
    setValue?.("services", services);
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const filtered = doctorServices.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredService(filtered);

    if (filtered.length > 0) setShowSuggestions(true);
  };

  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Hizmet Bilgileri
      </h3>
      <div>
        <div className="relative">
          <FormInput
            label="Hizmet Adı"
            name="services"
            placeholder="Hizmet Seçiniz"
            register={register}
            onChange={handleChange}
            type="text"
            error={errors?.services?.message}
          />

          {showSuggestions && filteredService.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredService.map((item,index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSpeciality(item)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceAddressSection;
