import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        w-full rounded-lg border border-slate-300
        bg-white px-3 py-2.5
        text-sm text-slate-950
        outline-none transition
        placeholder:text-slate-400

        focus:border-slate-500
        focus:ring-2 focus:ring-slate-200

        group-data-[invalid=true]:border-red-400
        group-data-[invalid=true]:focus:border-red-500
        group-data-[invalid=true]:focus:ring-red-100

        ${className}
      `}
      {...props}
    />
  );
}

export default Input;
