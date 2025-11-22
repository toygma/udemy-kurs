import { useFieldArray } from "react-hook-form";
import type { FormProps } from "../types/adminTypes";
import FormInput from "@/shared/ui/FormInput";
import Button from "@/shared/ui/Button";

const EducationSection = ({ register, error, control }: FormProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });
  return (
    <div className="pt-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 pb-2">
        Eğitim Bilgileri
      </h3>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded space-y-2">
          {/* DERECE */}
          <FormInput
            label="Derece"
            error={error?.education?.[index]?.degree}
            name={`education.${index}.degree`}
            register={register}
            placeholder="Örn: Lisans, Yüksek Lisans"
            type="text"
          />
          {/* KURUM */}
          <FormInput
            label="Kurum"
            error={error?.education?.[index]?.institution}
            name={`education.${index}.institution`}
            register={register}
            placeholder="Üniversite / Okul Adı"
            type="text"
          />
          {/* YIL */}
          <FormInput
            label="Yıl"
            error={error?.education?.[index]?.year}
            name={`education.${index}.year`}
            register={register}
            placeholder="Mezun Tarihi"
            type="number"
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-sm text-red-500 mt-1"
          >
            Sil
          </button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ degree: "", institution: "", year: 0 })}
        className="bg-blue-500"
        children="Eğitim Ekle"
      />
    </div>
  );
};

export default EducationSection;
