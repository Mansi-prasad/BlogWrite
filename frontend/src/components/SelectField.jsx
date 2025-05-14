import React, { useId } from "react";
// it will accept only two parameters props and ref.
const SelectField = React.forwardRef(function SelectField(
  { options, label, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full text-left">
      {/* label for behind the scene , for structured html */}
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gary-200 w-full ${className}`}
      >
        {options?.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
});
export default SelectField;
