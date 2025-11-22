import { useFieldArray } from "react-hook-form";
import type { FormProps } from "../types/adminTypes";
import FormInput from "@/shared/ui/FormInput";
import Button from "@/shared/ui/Button";

const AwardSection = ({ register, error, control }: FormProps) => {
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
          <FormInput
            label="Başlık"
            error={error?.awards?.[index]?.title}
            name={`awards.${index}.title`}
            register={register}
            placeholder="Ödül Başlığı"
            type="text"
          />
          <FormInput
            label="Yıl"
            error={error?.awards?.[index]?.year}
            name={`awards.${index}.year`}
            register={register}
            placeholder="Ödül verilen yıl"
            type="number"
          />
          <FormInput
            label="Açıklama"
            error={error?.awards?.[index]?.description}
            name={`awards.${index}.description`}
            register={register}
            placeholder="Ödül açıklaması"
            type="text"
          />
          <FormInput
            label="Organizasyon"
            error={error?.awards?.[index]?.organization}
            name={`awards.${index}.organization`}
            register={register}
            placeholder="Ödülü veren kurum"
            type="text"
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
        onClick={() => append({ title: "", year: 0, description:"",organization:"" })}
        className="bg-blue-500"
        children="Eğitim Ekle"
      />
    </div>
  );
};

export default AwardSection;
