import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TAddDoctorFormSchema } from "../validation/admin.schema";

interface AddressInformationProps {
  register: UseFormRegister<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
}

const AddresSection = ({ error, register }: AddressInformationProps) => {
  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Adres Bilgileri
      </h3>

      {/* Sokak */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Sokak</label>
        <input
          type="text"
          {...register("address.street")}
          placeholder="123 Ana Cadde"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.street?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.street.message}
          </p>
        )}
      </div>

      {/* Şehir */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Şehir</label>
        <input
          type="text"
          {...register("address.city")}
          placeholder="İstanbul"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.city?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.city.message}
          </p>
        )}
      </div>


      {/* Posta Kodu */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Posta Kodu
        </label>
        <input
          type="text"
          {...register("address.postalCode")}
          placeholder="34000"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.postalCode?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.postalCode.message}
          </p>
        )}
      </div>

      {/* Ülke */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Ülke</label>
        <input
          type="text"
          {...register("address.country")}
          placeholder="Türkiye"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error?.address?.country?.message && (
          <p className="text-red-500 text-xs mt-1 ml-1">
            {error.address.country.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddresSection;
