import React, { useEffect, useState } from "react";
import Input from "../shared/input";
import Button from "../shared/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { guardarSession } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [guardarCredenciales, setGuardarCredenciales] = useState(false); // Nuevo estado
  const [cargando, setCargando] = useState(false);
  const [activarLogin, setActivarLogin] = useState(false);

  // Verificar si hay credenciales guardadas
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("savedUser"));
    if (savedUser) {
      setUsuario(savedUser.usuario);
      setPassword(savedUser.password);
      setGuardarCredenciales(true);
    }

    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, []);

  useEffect(() => {
    setActivarLogin(usuario !== "" && password !== "");
  }, [usuario, password]);

  const hacerLogin = () => {
    const body = { usuario, password };
    setCargando(true);

    fetch("https://movetrack.develotion.com//login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((datos) => {
        if (datos.codigo === 200) {
          const user = { usuario, apiKey: datos.apiKey, id: datos.id };
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(guardarSession(user));

          // Guardar credenciales si el checkbox está marcado
          if (guardarCredenciales) {
            localStorage.setItem(
              "savedUser",
              JSON.stringify({ usuario, password })
            );
          } else {
            localStorage.removeItem("savedUser");
          }

          navigate("/dashboard");
        } else {
          toast.error("Usuario y/o contraseña incorrectos");
        }
        setCargando(false);
      });
  };

  return (
    <div className="container mt-5">
      <div id="auth" className="mb-5">
        <h2 className="text-center">Iniciar Sesión</h2>
        <form>
          <Input label="Usuario" value={usuario} changeValue={setUsuario} />
          <Input
            label="Contraseña"
            type="password"
            value={password}
            changeValue={setPassword}
          />

          {/* Nuevo checkbox */}
          <div className="form-check my-3">
            <input
              type="checkbox"
              id="guardarCredenciales"
              className="form-check-input"
              checked={guardarCredenciales}
              onChange={() => setGuardarCredenciales(!guardarCredenciales)}
            />
            <label className="form-check-label" htmlFor="guardarCredenciales">
              Guardar credenciales
            </label>
          </div>

          <Button
            texto="Ingresar"
            onClick={hacerLogin}
            disabled={!activarLogin}
            cargando={cargando}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
