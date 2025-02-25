import React, { useEffect, useState } from "react";
import Input from "../shared/input";
import Select from "../shared/select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Button from "../shared/button";
import { guardarSession } from "../features/authSlice";
import { useDispatch } from "react-redux";

const Registro = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [pais, setPais] = useState("");

  const [paises, setPaises] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setCargando(true);
    fetch("https://movetrack.develotion.com/paises.php")
      .then((r) => r.json())
      .then((datos) => {
        setPaises(datos.paises);
        setCargando(false);
      });
  }, []);

  const hacerRegistro = () => {
    const body = {
      usuario: usuario,
      password: password,
      idPais: pais,
    };
    setCargando(true);
    fetch("https://movetrack.develotion.com/usuarios.php", {
      method: "POST", // Definir que es una solicitud POST
      headers: {
        "Content-Type": "application/json", // Indicar que los datos se envían en formato JSON
      },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((datos) => {
        if (datos.codigo == 200) {
          // Usuario OK
          toast.success("Usuario registrado con éxito!");
          const user = {
            usuario: usuario,
            apiKey: datos.apiKey,
            id: datos.id,
          };
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(guardarSession(user));
          navigate("/dashboard");
        } else {
          // Error
          toast.error(datos.mensaje);
        }

        setCargando(false);
      });
  };

  const disabled = usuario == "" || password == "" || pais == "";

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Registro</h2>
          <form>
            <Input
              label="Usuario"
              value={usuario}
              changeValue={(val) => setUsuario(val)}
            />
            <Input
              label="Contraseña"
              value={password}
              type="password"
              changeValue={(val) => setPassword(val)}
            />
            <Select
              label="País"
              value={pais}
              options={[{ id: "", nombre: "<< Seleccione >>" }, ...paises]}
              changeValue={(val) => setPais(val)}
            />
            <Button
              texto="Registrarse"
              onClick={hacerRegistro}
              color="success"
              cargando={cargando}
              disabled={disabled}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
