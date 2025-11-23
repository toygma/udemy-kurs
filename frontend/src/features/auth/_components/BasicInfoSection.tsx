import FormInput from "@/shared/ui/FormInput";
import type { AuthFormProps } from "../types/authTypes";


const BasicInfoSection = ({ register, errors }: AuthFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Temel Bilgiler</h3>

      <FormInput
        error={errors.name?.message}
        name="name"
        register={register}
        type="text"
        label="Tam Ad"
        placeholder="İsim ve Soy isminizi girin."
      />

      <FormInput
        error={errors.email?.message}
        name="email"
        register={register}
        type="email"
        label="Email"
        placeholder="Email Adresinizi girin."
      />

      <FormInput
        error={errors.phone?.message}
        name="phone"
        register={register}
        type="tel"
        label="Telefon"
        placeholder="Telefon numaranızı girin."
      />

      <FormInput
        error={errors.password?.message}
        name="password"
        register={register}
        type="password"
        label="Şifre"
        placeholder="Şifrenizi girin."
      />
    </div>
  );
};

export default BasicInfoSection;