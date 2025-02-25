const Input = ({ label, type = "text", value, changeValue }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={(e) => changeValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
