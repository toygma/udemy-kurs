import type { FieldError } from "react-hook-form";
import { cn } from "../lib/utils";


interface Props {
    register:any
    error:FieldError | string | undefined;
    type:string;
    className?:string;
    placeholder:string;
    label:string;
    name:string;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void;
}


const FormInput = ({register,name,className,type,placeholder,error,label,onFocus,onChange}:Props) => {


    const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name,{
          valueAsNumber:type === "number",
          onChange:onChange
        })}
        onFocus={onFocus}
        placeholder={placeholder}
        className={cn("w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",className)}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1 ml-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;
