const Button = ({
  onClick,
  texto,
  disabled,
  color = "primary",
  cargando = false,
}) => {
  return (
    <input
      type="button"
      className={`btn btn-${color} w-100`}
      onClick={onClick}
      value={cargando ? "Cargando..." : texto}
      disabled={disabled || cargando}
    />
  );
};

export default Button;
