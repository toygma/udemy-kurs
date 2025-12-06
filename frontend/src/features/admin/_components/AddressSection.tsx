import FormInput from "@/shared/ui/FormInput";
import type { FormProps } from "../types/admin.types";

const AddressSection = ({ register, error }: FormProps) => {
  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Adres Bilgileri
      </h3>

      {/* SOKAK */}
      <FormInput
        error={error?.address?.street?.message}
        label="Sokak"
        name="address.street"
        register={register}
        placeholder="123 ana cadde"
        type="text"
      />

      {/* ŞEHİR */}
      <FormInput
        error={error?.address?.city?.message}
        label="Şehir"
        name="address.city"
        register={register}
        placeholder="İstanbul"
        type="text"
      />

      {/* POSTA KODU */}
      <FormInput
        error={error?.address?.postalCode?.message}
        label="Posta Kodu"
        name="address.postalCode"
        register={register}
        placeholder="örn:34145"
        type="text"
      />

      {/* ÜLKE */}
      <FormInput
        error={error?.address?.country?.message}
        label="Ülke"
        name="address.country"
        register={register}
        placeholder="Türkiye"
        type="text"
      />
    </div>
  );
};

export default AddressSection;
