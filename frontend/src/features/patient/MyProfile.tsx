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

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { updateProfile, user } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
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
      gender: "Erkek",
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
        gender: user.gender || "Erkek",
        image: user.image?.url || "",
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
      console.log("🚀 ~ onSubmit ~ err:", err);
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
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Telefon
                    </label>
                    <input
                      {...register("phone")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Adres
                    </label>

                    <label>City</label>
                    <input
                      {...register("address.city")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 mb-2"
                    />

                    <label>Country</label>
                    <input
                      {...register("address.country")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 mb-2"
                    />

                    <label>Street</label>
                    <input
                      {...register("address.street")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 mb-2"
                    />

                    <label>ZipCode</label>
                    <input
                      {...register("address.zipCode")}
                      disabled={!isEdit}
                      className="w-full bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2"
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
                    <option value="Erkek">Erkek</option>
                    <option value="Kadın">Kadın</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
