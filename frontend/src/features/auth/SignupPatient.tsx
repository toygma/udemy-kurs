import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  PatientSchema,
  type TPatientSignupSchema,
} from "./validation/patient.signup.schema";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import FormInput from "@/shared/ui/FormInput";
import Button from "@/shared/ui/Button";

const SignupPatient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPatientSignupSchema>({
    resolver: zodResolver(PatientSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "patient",
    },
  });
  const onSubmit = async (data: TPatientSignupSchema) => {
    console.log(data);
  };
  return (
    <div className="py-8 px-4 relative">
      <Link
        to={"/giris-yap"}
        className="absolute -top-4 border border-gray-300 rounded-full p-2 cursor-pointer hover:bg-gray-200"
      >
        <ArrowLeft />
      </Link>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-blue-400 px-6 py-8 text-white">
            <h1 className="text-xl font-bold">Hasta Kayıt Sayfası</h1>
            <p className="mt-2 text-blue-100">Hesabınızı oluşturun.</p>
          </div>
        </div>
        <div className="w-full mt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormInput
              error={errors.name?.message}
              name="name"
              register={register}
              type="text"
              label="İsim ve soy isim"
              placeholder="tam adınızı giriniz."
            />

            <FormInput
              error={errors.email?.message}
              name="email"
              register={register}
              type="email"
              label="Email"
              placeholder="mail adresinizi giriniz."
            />

            <FormInput
              error={errors.password?.message}
              name="password"
              register={register}
              type="password"
              label="Şifre"
              placeholder="şifrenizi giriniz."
            />

            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="px-6 py-2"
            >
              {isSubmitting ? "Yükleniyor..." : "Kayıt ol"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPatient;
