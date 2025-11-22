import FormInput from "@/shared/ui/FormInput";
import type { AuthFormProps } from "../types/authTypes";
import { useState } from "react";
import { specialistData } from "@/features/admin/constants/adminConstants";

const ProfessionalInfoSection = ({
  register,
  errors,
  setValue,
}: AuthFormProps) => {
  const [filteredSpecialist, setFilteredSpecialist] = useState(specialistData);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelectSpeciality = (speciality: string) => {
    setValue?.("speciality", speciality);
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const filtered = specialistData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSpecialist(filtered);

    if (filtered.length > 0) setShowSuggestions(true);
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">
        Professional Information
      </h3>

      <div className="relative">
        <FormInput
          error={errors?.speciality?.message}
          name="speciality"
          register={register}
          onChange={handleChange}
          type="text"
          label="Uzmanlık Alanı"
          placeholder="Uzmanlık alanınızı girin."
        />
        {showSuggestions && filteredSpecialist.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {filteredSpecialist.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectSpeciality(item.name)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <FormInput
        error={errors?.experience?.message}
        name="experience"
        register={register}
        type="number"
        label="Deneyim (Yıl)"
        placeholder="örn:5"
      />

      <FormInput
        error={errors?.fee?.message}
        name="fee"
        register={register}
        type="number"
        label="Ücret"
        placeholder="örn:500"
      />

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Hakkında
        </label>
        <textarea
          {...register?.("about")}
          rows={4}
          placeholder="Kısa bir biyografi veya açıklama yazın..."
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.about?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {errors.about.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfessionalInfoSection;
