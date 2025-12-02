import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SignupDoctorFormSchema,
  type TDoctorSignupFormSchema,
} from "./validation/doctor.signup.schema";
import { Activity, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import BasicInfoSection from "./_components/BasicInfoSection";
import AddressSection from "./_components/AddressSection";
import ProfessionalInfoSection from "./_components/ProfessionalInfoSection";
import ServicesAddressSection from "./_components/ServicesAddressSection";
import EducationSection from "./_components/EducationSection";
import AwardSection from "./_components/AwardSection";
import WorkingHoursSection from "./_components/WorkingHoursSection";
import Button from "@/shared/ui/Button";
import { useRegisterDoctorMutation } from "@/store/api/doctor-api";
import toast from "react-hot-toast";

const SignupDoctor = () => {
  const [currentStep, setCurrentStep] = useState(1);
   const [
      registerMutation,
      { error: registerError, isLoading: registerLoading, isSuccess },
    ] = useRegisterDoctorMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TDoctorSignupFormSchema>({
    resolver: zodResolver(SignupDoctorFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      speciality: "",
      available: true,
      role: "doctor",
      experience: 0,
      about: "",
      education: [
        {
          degree: "",
          institution: "",
          year: 0,
        },
      ],
      services: "",
      address: {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
      phone: "",
      fee: 0,
      patients: 0,
      awards: [
        {
          title: "",
          year: 0,
          description: "",
          organization: "",
        },
      ],
      workingHours: [
        {
          day: "monday",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "tuesday",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "wednesday",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "thursday",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "friday",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "saturday",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "sunday",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
      ],
    },
  });

  const steps = [
    { number: 1, title: "Temel" },
    { number: 2, title: "Adres" },
    { number: 3, title: "Profesyonel" },
    { number: 4, title: "Eğitim" },
    { number: 5, title: "Ödül" },
    { number: 6, title: "Çalışma" },
  ];

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const navigate = useNavigate();

    useEffect(() => {
      if (isSuccess) {
        toast.success("Kayıt Başarılı");
        navigate("/giris-yap");
      } else if (registerError && "data" in registerError) {
        toast.error((registerError as any)?.data?.message || "Kayıt başarısız");
      }
    }, [isSuccess, registerError, navigate]);

  const onSubmit = async (data: TDoctorSignupFormSchema) => {
    await registerMutation(data)
  };

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <Link
        to={"/giris-yap"}
        className="absolute top-4 left-4 border border-gray-300 rounded-full p-2 cursor-pointer hover:bg-gray-200"
      >
        <ArrowLeft size={20} />
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* HEADER */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-7 text-white">
            <h1 className="text-3xl font-bold">Doktor Kayıt Sayfası</h1>
            <p className="mt-2 text-blue-100">
              Profesyonel Hesabınızı oluşturun.
            </p>
          </div>

          {/* STEP */}
          <div className="px-4 py-6 bg-gray-50 border-b overflow-x-auto">
            <div className={`flex justify-between items-center`}>
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-start shrink-0">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        currentStep > step.number
                          ? "bg-green-500 text-white"
                          : currentStep === step.number
                          ? "bg-blue-600 text-white ring-4 ring-blue-200"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check size={18} />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium whitespace-nowrap ${
                        currentStep === step.number
                          ? "text-blue-600"
                          : currentStep > step.number
                          ? "text-green-600"
                          : "text-gray-500"
                      } `}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex items-center px-2 pt-5">
                      <div
                        className={`h-0.5 w-22 transition-all duration-500 mx-2 ${
                          currentStep > step.number
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <form className="p-6 " onSubmit={handleSubmit(onSubmit)}>
            <Activity mode={currentStep === 1 ? "visible" : "hidden"}>
              <BasicInfoSection register={register} errors={errors} />
            </Activity>

            <Activity mode={currentStep === 2 ? "visible" : "hidden"}>
              <AddressSection register={register} errors={errors} />
            </Activity>

            <Activity mode={currentStep === 3 ? "visible" : "hidden"}>
              <ProfessionalInfoSection
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </Activity>

            <Activity mode={currentStep === 4 ? "visible" : "hidden"}>
              <div className="space-y-6">
                <ServicesAddressSection
                  register={register}
                  errors={errors}
                  control={control}
                  setValue={setValue}
                />
                <EducationSection
                  register={register}
                  errors={errors}
                  control={control}
                />
              </div>
            </Activity>

            <Activity mode={currentStep === 5 ? "visible" : "hidden"}>
              <AwardSection
                register={register}
                errors={errors}
                control={control}
              />
            </Activity>

            <Activity mode={currentStep === 6 ? "visible" : "hidden"}>
              <WorkingHoursSection
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
                watch={watch}
              />
            </Activity>

            {/* Navigation BUTTON */}
            <div className="px-6 py-4 mt-4  border-t flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  currentStep === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400 hover:shadow-md"
                }`}
              >
                Geri
              </button>
              <div className="text-sm text-gray-600 font-medium">
                Adım {currentStep} / {steps.length}
              </div>
              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-md transition-all"
                >
                  İleri
                </button>
              ) : (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  className="px-8 py-2.5 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Kaydediliyor..." : "Kayıt Ol"}
                </Button>
              )}
            </div>
          </form>

          {/* Progress bar */}
          <div className="h-2 bg-gray-200">
            <div
              className="h-full bg-linear-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupDoctor;
