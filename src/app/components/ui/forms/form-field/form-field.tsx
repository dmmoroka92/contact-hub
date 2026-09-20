import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
};

function FormField({
  id,
  label,
  error,
  children,
}: FormFieldProps) {
  const hasError = Boolean(error);

  return (
    <div
      className="group"
      data-invalid={hasError || undefined}
    >
      <label
        htmlFor={id}
        className="
          mb-2 block text-sm font-medium text-slate-700
          group-data-[invalid=true]:text-red-600
        "
      >
        {label}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
