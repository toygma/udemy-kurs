import type { FieldErrors, UseFormRegister } from "react-hook-form";
import React, { useState } from "react";
import type { TAddDoctorFormSchema } from "../validation/admin.schema";

interface BasicInformationProps {
  register: UseFormRegister<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
  getValues: any;
  setValues: any;
}

const specialistData = [
  { id: 1, name: "Kardiyolog" },
  { id: 2, name: "Dermatolog" },
  { id: 3, name: "Pediatrist" },
  { id: 4, name: "Nörolog" },
  { id: 5, name: "Ortopedik Cerrah" },
  { id: 6, name: "Göz Doktoru" },
  { id: 7, name: "Psikiyatrist" },
  { id: 8, name: "Endokrinolog" },
  { id: 9, name: "Gastroenterolog" },
  { id: 10, name: "Diş Hekimi" },
];

const BasicSection = ({
  error,
  register,
  getValues,
  setValues,
}: BasicInformationProps) => {
  const [filteredSpecialist, setFilteredSpecialist] = useState(specialistData);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSpecialityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues("speciality", value);
    const filtered = specialistData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    if (value.trim() === "") {
      setShowSuggestions(false);
      setFilteredSpecialist(specialistData);
      return;
    }
    setFilteredSpecialist(filtered);
    setShowSuggestions(true);
  };

  const handleSelectSpeciality = (name: string) => {
    setValues("speciality", name);
    setShowSuggestions(false);
  };

  return (
    <div className="pt-4 space-y-6 ">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Temel Bilgiler
      </h3>
      {/* İsim */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tam Ad
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Tam adınızı girin"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error?.name?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email adresinizi girin"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error?.email?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.email.message}
            </p>
          )}
        </div>

        {/* Şifre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Şifre
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Şifrenizi girin"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error?.password?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.password.message}
            </p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefon
          </label>
          <input
            type="text"
            {...register("phone")}
            placeholder="Telefon numaranızı girin"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error?.phone?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.phone.message}
            </p>
          )}
        </div>

        {/* Uzmanlık Otomatik Tamamlama */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Uzmanlık
          </label>
          <input
            type="text"
            value={getValues("speciality") || ""}
            onChange={handleSpecialityChange}
            placeholder="Uzmanlık yazmaya başlayın..."
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showSuggestions && filteredSpecialist.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto">
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
          {error?.speciality?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.speciality.message}
            </p>
          )}
        </div>

        {/* Deneyim */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deneyim (Yıl)
          </label>
          <input
            type="number"
            {...register("experience", { valueAsNumber: true })}
            placeholder="Örn. 5"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error?.experience?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.experience.message}
            </p>
          )}
        </div>

        {/* Ücret */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Muayene Ücreti ($)
          </label>
          <input
            type="number"
            {...register("fee", { valueAsNumber: true })}
            placeholder="Örn. 100"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error?.fee?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.fee.message}
            </p>
          )}
        </div>

        {/* Hastalar */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hastalar ($)
          </label>
          <input
            type="number"
            {...register("patients", { valueAsNumber: true })}
            placeholder="Örn. 100"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error?.patients?.message && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {error.patients.message}
            </p>
          )}
        </div>

        {/* Hakkında */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Hakkında
          </label>
          <textarea
            {...register("about")}
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
