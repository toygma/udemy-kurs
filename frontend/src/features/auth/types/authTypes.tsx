import type { Control, FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { TDoctorSignupFormSchema } from "../validation/doctor.signup.schema";

export interface AuthFormProps {
  register?: UseFormRegister<TDoctorSignupFormSchema>;
  errors: FieldErrors<TDoctorSignupFormSchema>;
  getValues?: UseFormGetValues<TDoctorSignupFormSchema>;
  setValue?: UseFormSetValue<TDoctorSignupFormSchema>;
  control?: Control<TDoctorSignupFormSchema>;
  watch?: UseFormWatch<TDoctorSignupFormSchema>;
}