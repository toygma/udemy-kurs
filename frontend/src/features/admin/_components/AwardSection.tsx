import {
  useFieldArray,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import type { TAddDoctorFormSchema } from "../validation/admin.schema";

interface AwardInformationProps {
  register: UseFormRegister<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
  control: any;
}

const AwardSection = ({
  register,
  error,
  control,
}: AwardInformationProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "awards",
  });

  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Ödül Bilgileri
      </h3>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded space-y-2">
          {/* Başlık */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Başlık
            </label>
            <input
              type="text"
              {...register(`awards.${index}.title` as const)}
              placeholder="Ödül başlığı"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.awards?.[index]?.title && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.awards[index]?.title?.message}
              </p>
            )}
          </div>

          {/* Yıl */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Yıl
            </label>
            <input
              type="text"
              {...register(`awards.${index}.year` as const)}
              placeholder="Ödül yılı"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.awards?.[index]?.year && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.awards[index]?.year?.message}
              </p>
            )}
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <input
              type="text"
              {...register(`awards.${index}.description` as const)}
              placeholder="Ödül açıklaması"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.awards?.[index]?.description && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.awards[index]?.description?.message}
              </p>
            )}
          </div>

          {/* Organizasyon */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Organizasyon
            </label>
            <input
              type="text"
              {...register(`awards.${index}.organization` as const)}
              placeholder="Ödülü veren kurum"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.awards?.[index]?.organization && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.awards[index]?.organization?.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-sm text-red-500 mt-1"
          >
            Sil
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ title: "", year: "", description: "", organization: "" })
        }
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
      >
        Ödül Ekle
      </button>
    </div>
  );
};

export default AwardSection;
