
import  React, { useState } from "react";
import { specialistData } from "../constants/adminConstants";
import FormInput from "@/shared/ui/FormInput";
import type { FormProps } from "../types/adminTypes";



const BasicSection = ({
  error,
  register,
  setValue,
}: FormProps) => {
  const [filteredSpecialist, setFilteredSpecialist] = useState(specialistData);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const handleSelectSpeciality = (speciality: string) => {
    setValue?.("speciality", speciality);
    setShowSuggestions(false);
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const filtered = specialistData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSpecialist(filtered);

    if (filtered.length > 0) setShowSuggestions(true);
  };

  return (
    <div className="pt-4 space-y-6 ">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Temel Bilgiler
      </h3>
      {/* İsim */}
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          error={error?.name?.message}
          name="name"
          register={register}
          type="text"
          label="İsim ve soy isim"
          placeholder="isim ve soyisminizi girin."
        />
        {/* Email */}
        <FormInput
          error={error?.email?.message}
          name="email"
          register={register}
          type="email"
          label="Email"
          placeholder="email adresinizi girin."
        />
        {/* Şifre */}
        <FormInput
          error={error?.password?.message}
          name="password"
          register={register}
          type="password"
          label="Şifre"
          placeholder="Şifrenizi girin."
        />
        {/* Telefon */}
        <FormInput
          error={error?.phone?.message}
          name="phone"
          register={register}
          type="text"
          label="Telefon"
          placeholder="Telefon numaranızı girin."
        />
        <div className="relative">
          <FormInput
            error={error?.speciality?.message}
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
        {/* Deneyim */}
        <FormInput
          error={error?.experience?.message}
          name="experience"
          register={register}
          type="number"
          label="Deneyim (Yıl)"
          placeholder="örn:5"
        />
        {/* Ücret */}
        <FormInput
          error={error?.fee?.message}
          name="fee"
          register={register}
          type="number"
          label="Muayene ücreti"
          placeholder="örn:500"
        />
        {/* Hastalar */}
        <FormInput
          error={error?.patients?.message}
          name="patients"
          register={register}
          type="number"
          label="Toplam Baktığı Hasta Sayısı"
          placeholder="örn:100"
        />
        {/* Hakkında */}
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
          {error?.about?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.about.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicSection;