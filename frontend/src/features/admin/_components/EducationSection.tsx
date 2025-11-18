import {
  useFieldArray,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";
import type { TAddDoctorFormSchema } from "../validation/admin.schema";

interface EducationInformationProps {
  register: UseFormRegister<TAddDoctorFormSchema>;
  error: FieldErrors<TAddDoctorFormSchema>;
  control: any; 
}

const EducationSection = ({
  register,
  error,
  control,
}: EducationInformationProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 pb-2">
        Eğitim Bilgileri
      </h3>

      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded space-y-2">
          {/* Derece */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Derece
            </label>
            <input
              type="text"
              {...register(`education.${index}.degree` as const)}
              placeholder="Örn: Lisans, Yüksek Lisans..."
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.education?.[index]?.degree && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.education[index]?.degree?.message}
              </p>
            )}
          </div>

          {/* Kurum */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kurum
            </label>
            <input
              type="text"
              {...register(`education.${index}.institution` as const)}
              placeholder="Üniversite / Okul adı"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.education?.[index]?.institution && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.education[index]?.institution?.message}
              </p>
            )}
          </div>

          {/* Yıl */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Yıl
            </label>
            <input
              type="number" // Tipi number yapın (schema ile uyumluysa)
              {...register(`education.${index}.year` as const, { valueAsNumber: true })} // valueAsNumber ile sayı olarak kaydet
              placeholder="Mezuniyet yılı (örneğin: 2023)"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.education?.[index]?.year && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {error.education[index]?.year?.message}
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
        onClick={() => append({ degree: "", institution: "", year: 0 })}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
      >
        Eğitim Ekle
      </button>

      {/* Genel education array hatası (varsa) */}
      {error?.education && typeof error.education === "object" && "message" in error.education && (
        <p className="text-red-500 text-xs mt-1 ml-1">{(error.education as any).message}</p>
      )}
    </div>
  );
};

export default EducationSection;