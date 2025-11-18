import { useFieldArray,  type FieldErrors, type UseFormSetValue, type UseFormWatch, Controller } from "react-hook-form";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css"; // Türkçe arayüz için gerekli CSS
import type { TAddDoctorFormSchema } from "../validation/admin.schema";

interface WorkingInformationProps {
  error: FieldErrors<TAddDoctorFormSchema>;
  control: any;
  setValue: UseFormSetValue<TAddDoctorFormSchema>;
  watch: UseFormWatch<TAddDoctorFormSchema>;
}

const WorkingInSection = ({
  error,
  control,
  setValue,
  watch,
}: WorkingInformationProps) => {
  const { fields } = useFieldArray({
    control,
    name: "workingHours",
  });

  const workingHours = watch("workingHours");

  const handleAvailabilityChange = (index: number, value: boolean) => {
    const updated = [...workingHours];
    updated[index] = { ...updated[index], isAvailable: value };
    setValue("workingHours", updated);
  };

  return (
    <div className="space-y-3">
      <div className="pt-4 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 pb-2">
          Çalışma Saatleri
        </h3>
      </div>

      {fields.map((wh, index) => (
        <div key={wh.id} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4 mb-2">
            <label className="flex items-center gap-2 w-40">
              <input
                type="checkbox"
                checked={workingHours[index]?.isAvailable || false}
                onChange={(e) => handleAvailabilityChange(index, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="font-medium text-gray-700">{workingHours[index].day}</span>
            </label>
          </div>

          {workingHours[index]?.isAvailable &&
            workingHours[index].slots.map((_slot, slotIndex) => (
              <div key={slotIndex} className="flex gap-4 mb-2">
                <Controller
                  control={control}
                  name={`workingHours.${index}.slots.${slotIndex}.start`}
                  render={({ field }) => (
                    <TimePicker
                      value={field.value || ""} 
                      onChange={(value) => field.onChange(value)} 
                      disableClock
                      locale="tr" 
                      format="HH:mm" 
                      clearIcon={null}
                      className="time-picker"
                    />
                  )}
                />
                <span className="text-gray-500">-</span>
                <Controller
                  control={control}
                  name={`workingHours.${index}.slots.${slotIndex}.end`}
                  render={({ field }) => (
                    <TimePicker
                      value={field.value || ""} 
                      onChange={(value) => field.onChange(value)} 
                      disableClock
                      locale="tr" 
                      format="HH:mm"
                      clearIcon={null}
                      className="time-picker"
                    />
                  )}
                />
                {error?.workingHours?.[index]?.slots?.[slotIndex]?.start && (
                  <p className="text-red-500 text-xs">
                    {error.workingHours[index].slots[slotIndex].start.message}
                  </p>
                )}
                {error?.workingHours?.[index]?.slots?.[slotIndex]?.end && (
                  <p className="text-red-500 text-xs">
                    {error.workingHours[index].slots[slotIndex].end.message}
                  </p>
                )}
              </div>
            ))}
        </div>
      ))}

      {error?.workingHours?.message && (
        <p className="text-red-500 text-xs mt-1 ml-1">{error.workingHours.message}</p>
      )}
    </div>
  );
};

export default WorkingInSection;