import React, { useId } from "react";
// forwardRef hook is use to provide the reference of the input field when the input field is used in another component.
const Input = React.forwardRef(function Input(
  { label, type = "text", name, value, onChange, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full text-left">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        onChange={onChange}
        {...props}
        id={id}
      />
    </div>
  );
});
export default Input;
