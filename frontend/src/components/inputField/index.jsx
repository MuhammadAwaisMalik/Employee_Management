/* eslint-disable react/prop-types */
// @ import styles
import "./index.css";

const InputField = ({
  label,
  type = "text",
  name,
  id,
  value,
  onChange,
  placeholder = "",
  error = "",
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id || name}
          className="block text-gray-700 text-sm font-medium"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
