import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileUpdateSchema,
  type ProfileUpdateSchemaType,
} from "./validation/profile.schema";
import Button from "@/shared/ui/Button";
import { Edit, Save, X } from "lucide-react";
import UploadImage from "@/shared/ui/UploadImages";
import { useProfile } from "./hooks/useProfile";
import FormInput from "@/shared/ui/FormInput";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { updateProfile, user } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ProfileUpdateSchemaType>({
    resolver: zodResolver(ProfileUpdateSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "erkek",
      dateOfBirth: "",
      image: "",
      address: {
        street: "",
        city: "",
        zipCode: "",
        country: "",
      },
    },
  });

  const imageValue = watch("image");

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "seçilmedi",
        image: user.image?.url || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          zipCode: user.address?.zipCode || "",
          country: user.address?.country || "",
        },
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileUpdateSchemaType) => {
    try {
      await updateProfile(data);
      setIsEdit(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-linear-to-r from-blue-500 to-blue-600"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="px-8 pb-8">
              <div className="flex items-end gap-6 -mt-16 mb-6 relative">
                {/* ✔ Upload Image */}
                <UploadImage
                  currentImage={imageValue}
                  isEdit={isEdit}
                  onImageChange={(img) =>
                    setValue("image", img, { shouldValidate: true })
                  }
                />

                <div className="flex gap-3">
                  {isEdit ? (
                    <>
                      <Button
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        type="submit"
                        className="flex items-center border-none gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
                      >
                        <Save size={20} />
                        Kaydet
                      </Button>

                      <button
                        type="button"
                        onClick={() => setIsEdit(false)}
                        className="flex items-center gap-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg"
                      >
                        <X size={20} />
                        İptal
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEdit(true)}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg"
                    >
                      <Edit size={20} />
                      Düzenle
                    </button>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  İletişim Bilgileri
                </h2>

                <div className="space-y-6">
                  {/* Email */}
                  <FormInput
                    error={errors.email?.message}
                    name="email"
                    register={register}
                    type="email"
                    label="Email"
                    placeholder="Email adresinizi giriniz."
                    disabled={!isEdit}
                  />

                  {/* Phone */}
                  <FormInput
                    error={errors.phone?.message}
                    name="phone"
                    register={register}
                    type="tel"
                    label="Telefon"
                    placeholder="Telefon numaranızı giriniz."
                    disabled={!isEdit}
                  />

                  {/* Address */}
                  <div>
                    <FormInput
                      error={errors.address?.city?.message}
                      name="address.city"
                      register={register}
                      type="text"
                      label="Şehir"
                      placeholder="Şehir giriniz."
                      disabled={!isEdit}
                    />

                    <FormInput
                      error={errors.address?.country?.message}
                      name="address.country"
                      register={register}
                      type="text"
                      label="Ülke"
                      placeholder="Ülke giriniz."
                      disabled={!isEdit}
                    />

                    <FormInput
                      error={errors.address?.street?.message}
                      name="address.street"
                      register={register}
                      type="text"
                      label="Sokak"
                      placeholder="Sokak adresini giriniz."
                      disabled={!isEdit}
                    />

                    <FormInput
                      error={errors.address?.zipCode?.message}
                      name="address.zipCode"
                      register={register}
                      type="text"
                      label="Posta Kodu"
                      placeholder="Posta kodu giriniz."
                      disabled={!isEdit}
                    />
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Temel Bilgiler
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Cinsiyet
                  </label>
                  <select
                    {...register("gender")}
                    disabled={!isEdit}
                    className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="erkek">Erkek</option>
                    <option value="kadın">Kadın</option>
                    <option value="seçilmedi">Belirtmek istemiyorum</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors?.gender.message}
                    </p>
                  )}
                </div>
                <FormInput
                  error={errors.dateOfBirth?.message}
                  name="dateOfBirth"
                  register={register}
                  type="date"
                  label="Doğum Tarihi"
                  disabled={!isEdit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
