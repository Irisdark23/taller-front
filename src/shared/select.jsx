import { useId } from "react";

const Select = ({ label, options, value, changeValue }) => {
  const id = useId();
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        value={value}
        onChange={(e) => changeValue(e.target.value)}
      >
        {options.map((option) => (
          <option id={`${id}-${option.id}`} value={option.id}>
            {option?.name || option?.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
