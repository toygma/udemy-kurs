import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginFormSchema,
  type TLoginFormSchema,
} from "./validation/login.schema";
import { useForm } from "react-hook-form";
import FormInput from "@/shared/ui/FormInput";
import Button from "@/shared/ui/Button";
import { Link, useNavigate } from "react-router";
import { Stethoscope, User } from "lucide-react";
import { useLoginMutation } from "@/store/api/user-api";
import {  useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [
    loginMutation,
    {  isLoading: loginLoading},
  ] = useLoginMutation();

  const [activeRole, setActiveRole] = useState<"patient" | "doctor">("patient");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      role: "patient",
    },
  });


  const handleRoleChange = (role: "patient" | "doctor") => {
    setActiveRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data: TLoginFormSchema) => {
    try{
      const response = await loginMutation(data).unwrap()
      toast.success(response.data.message)
      navigate("/")
    }catch(error:any){
      toast.error(error.data.message)
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[450px]">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">Oturun açarak başlayın.</h1>
          <p>Güvenli, hızlı ve kolay</p>
          <div className="flex justify-center mb-2">
            <button
              type="button"
              onClick={() => handleRoleChange("patient")}
              className={`px-4 py-2 ${
                activeRole === "patient"
                  ? "border-b-2 border-blue-600 text-blue-600 font-bold"
                  : "text-gray-500"
              }`}
            >
              Hasta Girişi
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("doctor")}
              className={`px-4 py-2 ${
                activeRole === "doctor"
                  ? "border-b-2 border-blue-600 text-blue-600 font-bold"
                  : "text-gray-500"
              }`}
            >
              Doktor Girişi
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-4"
          >
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

            <Button type="submit" className="py-3 mt-2">
              {loginLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Link
              to={"/hasta/kayit"}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                  <User
                    size={48}
                    className="text-blue-500 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Hasta
                  </h3>
                  <p className="text-gray-600">
                    Randevu oluşturun ve sağlık hizmetlerine erişin
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/doktor/kayit"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-500"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                  <Stethoscope
                    size={48}
                    className="text-green-500 group-hover:text-white transition-colors duration-300"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Doktor
                  </h3>
                  <p className="text-gray-600">
                    Hastalarınızı yönetin ve randevular kabul edin
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
