import { useForm } from "react-hook-form";
import {
  AddDoctorFormSchema,
  type TAddDoctorFormSchema,
} from "./validation/admin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicSection from "./_components/BasicSection";
import Button from "@/shared/ui/Button";
import AddressSection from "./_components/AddressSection";
import UploadImages from "@/shared/ui/UploadImages";
import EducationSection from "./_components/EducationSection";
import AwardSection from "./_components/AwardSection";
import ServiceSection from "./_components/ServiceSection";
import WorkingInSection from "./_components/WorkingInSection";



const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm<TAddDoctorFormSchema>({
    resolver: zodResolver(AddDoctorFormSchema),
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

  const imageValue = watch("image");

  const onSubmit = (data: TAddDoctorFormSchema) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto mt-12 px-4">
      <div className="mb-8 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Yeni Doktor Ekle
        </h2>
        <p className="mt-2 text-gray-600">
          Sisteme yeni doktor eklemek için aşağıdaki bilgileri doldurunuz.
        </p>
      </div>
      <div className="mt-12 flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadowm-md rounded-lg p-8 w-full max-w-8xl"
        >
          {/* TEMEL BİLGİLER */}

          <BasicSection
            register={register}
            error={errors}
            getValues={getValues}
            setValue={setValue}
          />

          {/* FOTOĞRAF BİLGİLERİ */}

          <div className="space-y-3 flex flex-col items-start pb-4">
            <h3 className="text-xl font-semibold mb-4">Fotoğraf Yükle</h3>
            <UploadImages
              currentImage={imageValue}
              onImageChange={(img) =>
                setValue("image", img, { shouldValidate: true })
              }
            />
          </div>

          {/* ADRES BİLGİLERİ */}

          <AddressSection register={register} error={errors} />

          {/* EĞİTİM BİLGİLERİ */}

          <EducationSection
            register={register}
            error={errors}
            control={control}
          />

          {/* ÖDÜL BİLGİLERİ */}
          <AwardSection register={register} error={errors} control={control} />

          {/* SERVİS BİLGİLERİ */}
          <ServiceSection
            register={register}
            error={errors}
            setValue={setValue}
          />

          {/* ÇALIŞMA ZAMANLARI */}

          <WorkingInSection
            error={errors}
            setValue={setValue}
            control={control}
            watch={watch}
          />

          <Button children="Doktor Ekle" type="submit" className="mt-6" />
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
