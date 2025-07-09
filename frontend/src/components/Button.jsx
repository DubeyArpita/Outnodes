import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  label,
  to,
  onClick,
  variant = "primary",
  icon,
  className = "",
  type = "button",
}) {
  const baseStyles =
    "inline-flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-700 hover:text-blue-600",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {icon && <span>{icon}</span>}
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={combinedStyles}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}