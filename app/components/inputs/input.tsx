import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { BiDollar } from "react-icons/bi"
import clsx from "clsx"

type InputProps = {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}
export const Input = ({
  errors,
  id,
  label,
  register,
  disabled,
  formatPrice,
  required,
  type,
}: InputProps) => {
  const inputClasses = clsx({
    "pl-9": formatPrice,
    "pl-4": !formatPrice,
    "border-rose-500 focus:border-rose-500": errors[id],
    "border-neutral-300 focus:border-black": !errors[id],
  })
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type || "text"}
        className={clsx(
          "peer",
          "w-full",
          "p-4",
          "pt-6",
          "font-light",
          "bg-white",
          "border-2",
          "rounded-md",
          "outline-none",
          "transition",
          "disabled:opacity-70",
          "disabled:cursor-not-allowed",
          inputClasses
        )}
      />
      <label
        htmlFor={id}
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10
        origin-[0]
        ${formatPrice ? "left-9" : "left-4"}
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
    </div>
  )
}
