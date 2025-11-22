import FormInput from "@/shared/ui/FormInput";
import type { AuthFormProps } from "../types/authTypes";

const AddressSection = ({ register, errors }: AuthFormProps) => {
  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Adres Bilgileri
      </h3>

      {/* SOKAK */}
      <FormInput
        error={errors?.address?.street?.message}
        label="Sokak"
        name="address.street"
        register={register}
        placeholder="123 ana cadde"
        type="text"
      />

      {/* ŞEHİR */}
      <FormInput
        error={errors?.address?.city?.message}
        label="Şehir"
        name="address.city"
        register={register}
        placeholder="İstanbul"
        type="text"
      />

      {/* POSTA KODU */}
      <FormInput
        error={errors?.address?.postalCode?.message}
        label="Posta Kodu"
        name="address.postalCode"
        register={register}
        placeholder="örn:34145"
        type="text"
      />

      {/* ÜLKE */}
      <FormInput
        error={errors?.address?.country?.message}
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
