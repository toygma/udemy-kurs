import Button from "@/shared/ui/Button";
import { useForm } from "react-hook-form";
import {
  AddDoctorFormSchema,
  type TAddDoctorFormSchema,
} from "./validation/admin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadImages from "@/shared/ui/UploadImages";
import EducationSection from "./_components/EducationSection";
import AwardSection from "./_components/AwardSection";
import ServiceSection from "./_components/ServiceSection";
import WorkingInSection from "./_components/WorkingInSection";
import BasicSection from "./_components/BasicSection";
import AddresSection from "./_components/AddresSection";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    getValues,
    formState: { errors, isSubmitting },
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
          year: "",
          description: "",
          organization: "",
        },
      ],
      workingHours: [
        {
          day: "Pazartesi",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "Salı",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "Çarşamba",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "Perşembe",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "Cuma",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "Cumartesi",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
        {
          day: "Pazar",
          isAvailable: false,
          slots: [{ start: "09:00", end: "17:00" }],
        },
      ],
    },
  });
  const imageValue = watch("image");
  console.log(errors);

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
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-8xl"
        >
          {/* ----- Temel Bilgiler ----- */}
          <BasicSection
            register={register}
            error={errors}
            getValues={getValues}
            setValues={setValue}
          />

          {/* ----- Fotoğraflar ----- */}
          <div className="space-y-3 flex flex-col items-start pb-4">
            <h3 className="text-xl font-semibold mb-4">Fotoğraf Yükle</h3>
            <UploadImages
              currentImage={imageValue}
              onImageChange={(img) =>
                setValue("image", img, { shouldValidate: true })
              }
            />
          </div>

          {/* ADDRESS */}
          <AddresSection register={register} error={errors} />

          {/* EDUCATION */}

          <EducationSection
            register={register}
            error={errors}
            control={control}
          />

          {/* AWARDS */}

          <AwardSection register={register} error={errors} control={control} />

          {/* SERVICE */}

          <ServiceSection
            error={errors}
            getValues={getValues}
            setValues={setValue}
          />

          {/* WORKING */}

          <WorkingInSection
            error={errors}
            control={control}
            setValue={setValue}
            watch={watch}
          />

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "kaydediliyor..." : "Ekle"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
