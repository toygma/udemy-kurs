import { Controller, useFieldArray } from "react-hook-form";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import type { AuthFormProps } from "../types/authTypes";

const DAY_TR: Record<string, string> = {
  monday: "Pazartesi",
  tuesday: "Salı",
  wednesday: "Çarşamba",
  thursday: "Perşembe",
  friday: "Cuma",
  saturday: "Cumartesi",
  sunday: "Pazar",
};

const WorkingInSection = ({ errors, control, setValue, watch }: AuthFormProps) => {
  const { fields } = useFieldArray({
    control,
    name: "workingHours",
  });

  const workingHours = watch?.("workingHours");

  const handleAvailabilityChange = (index: number, value: boolean) => {
    if (!setValue) return;

    const current = workingHours || [];
    const updated = [...current];
    updated[index] = { ...updated[index], isAvailable: value };
    setValue("workingHours", updated);
  };

  return (
    <div className="space-y-4">
      <div className="pt-4">
        <h3 className="text-xl font-semibold text-gray-800 pb-2">
          Çalışma Saatleri
        </h3>
      </div>

      {fields.map((wh, index) => {
        const currentDay = workingHours?.[index];

        if (!currentDay) return null;

        return (
          <div key={wh.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4 mb-2">
              <label className="flex items-center gap-2 w-40">
                <input
                  type="checkbox"
                  checked={currentDay.isAvailable || false}
                  onChange={(e) =>
                    handleAvailabilityChange(index, e.target.checked)
                  }
                  className="w-4 h-4"
                />
                <span className="font-medium text-gray-700">
                  {DAY_TR[currentDay.day] || currentDay.day}
                </span>
              </label>
            </div>

            {currentDay?.isAvailable &&
              currentDay.slots.map((_slot, slotIndex) => (
                <div>
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
                      />
                    )}
                  />
                  {errors?.workingHours?.[index]?.slots?.[slotIndex]?.start && (
                    <p className="text-red-500 text-xs">
                      {
                        errors?.workingHours?.[index]?.slots?.[slotIndex]?.start
                          .message
                      }
                    </p>
                  )}
                  {errors?.workingHours?.[index]?.slots?.[slotIndex]?.end && (
                    <p className="text-red-500 text-xs">
                      {
                        errors?.workingHours?.[index]?.slots?.[slotIndex]?.end
                          .message
                      }
                    </p>
                  )}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default WorkingInSection;