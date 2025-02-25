import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Select from "../../shared/select";
import Input from "../../shared/input";
import { toast } from "react-toastify";
import { guardarActividades } from "../../features/dashboardSlice";
import Button from "../../shared/button";
import useCargarActividadesGuardadas from "../../hooks/useCargarActividadesGuardadas";

const AgregarRegistro = () => {
  const dispatch = useDispatch();

  const [actividad, setActividad] = useState("");
  const [tiempo, setTiempo] = useState(30);
  const [fecha, setFecha] = useState(undefined);

  const [cargando, setCargando] = useState(false);
  const actividades = useSelector((state) => state.dashboard.actividades);

  const userId = useSelector((state) => state.auth.id);

  const apiKey = useSelector((state) => state.auth.apiKey);

  useEffect(() => {
    setCargando(true);
    fetch("https://movetrack.develotion.com/actividades.php", {
      headers: {
        apikey: apiKey,
        iduser: userId,
      },
    })
      .then((r) => r.json())
      .then((datos) => {
        if (datos.codigo == 200) {
          dispatch(guardarActividades(datos.actividades));
        }
        setCargando(false);
      });
  }, []);

  const { obtenerActividades } = useCargarActividadesGuardadas();

  const hacerRegistroActividad = () => {
    const body = {
      idActividad: actividad,
      idUsuario: userId,
      tiempo: tiempo,
      fecha: fecha,
    };
    setCargando(true);
    fetch("https://movetrack.develotion.com/registros.php", {
      method: "POST", // Definir que es una solicitud POST
      headers: {
        "Content-Type": "application/json", // Indicar que los datos se envían en formato JSON
        apikey: apiKey,
        iduser: userId,
      },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((datos) => {
        if (datos.codigo == 200) {
          // Usuario OK
          toast.success("Se ha ingresado con éxito la actividad!");
          obtenerActividades();
        } else {
          // Error
          toast.error(datos.mensaje);
        }
        setCargando(false);
      });
  };

  const isDisabled = actividad == "" || tiempo <= 0 || !fecha;

  return (
    <div className="accordion mb-3" id="registroAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingRegistro">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseRegistro"
            aria-expanded="true"
            aria-controls="collapseRegistro"
          >
            <h4>Agregar Registro</h4>
          </button>
        </h2>
        <div
          id="collapseRegistro"
          className="accordion-collapse collapse show"
          aria-labelledby="headingRegistro"
          data-bs-parent="#registroAccordion"
        >
          <div className="accordion-body">
            <form>
              <Select
                label="Actividad"
                value={actividad}
                options={actividades}
                changeValue={(val) => setActividad(val)}
              />
              <Input
                label="Tiempo (min)"
                type="number"
                value={tiempo}
                changeValue={(val) => setTiempo(val)}
              />
              <Input
                label="Fecha"
                type="date"
                value={fecha}
                changeValue={(val) => setFecha(val)}
              />

              <Button
                texto="Guardar"
                onClick={hacerRegistroActividad}
                disabled={isDisabled}
                color="success"
                cargando={cargando}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarRegistro;
