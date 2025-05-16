import React from "react";
const Btn = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${className} ${textColor} ${bgColor} ${type}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Btn;
