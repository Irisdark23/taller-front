import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../shared/select";
import useCargarActividadesGuardadas from "../../hooks/useCargarActividadesGuardadas";
import Button from "../../shared/button";

function pasoUnaSemana(fechaString) {
  const fechaDada = new Date(fechaString);
  const fechaLimite = new Date(fechaDada);
  fechaLimite.setDate(fechaDada.getDate() + 7); // Sumar 7 días

  return new Date() > fechaLimite; // Si la fecha actual es posterior
}

function pasoUnMes(fechaString) {
  const fechaDada = new Date(fechaString);
  const fechaLimite = new Date(fechaDada);
  fechaLimite.setDate(fechaDada.getDate() + 30); // Sumar 1 mes

  return new Date() > fechaLimite; // Si la fecha actual es posterior
}

const VerRegistros = () => {
  const dispatch = useDispatch();

  const [filtro, setFiltro] = useState(1);
  const userId = useSelector((state) => state.auth.id);

  const apiKey = useSelector((state) => state.auth.apiKey);

  const actividadesGuardadas = useSelector(
    (state) => state.dashboard.actividadesRegistradas
  );

  const [actividadesFiltradas, setActividadesFiltradas] =
    useState(actividadesGuardadas);

  const actividades = useSelector((state) => state.dashboard.actividades);

  // Este hook es para cargar las actividades
  const { obtenerActividades, cargandoActividades } =
    useCargarActividadesGuardadas();

  useEffect(() => {
    obtenerActividades();
  }, []);

  const obtenerActividadById = (actividadId) =>
    actividades?.find((act) => act.id == actividadId);

  const eliminarActividad = (actividadId) => {
    fetch(
      `https://movetrack.develotion.com/registros.php?idRegistro=${actividadId}`,
      {
        method: "DELETE",
        headers: {
          apikey: apiKey,
          iduser: userId,
        },
      }
    )
      .then((r) => r.json())
      .then((datos) => {
        if (datos.codigo == 200) {
          obtenerActividades();
        }
      });
  };

  useEffect(() => {
    // Esto es todo el historico
    if (filtro == 1) setActividadesFiltradas(actividadesGuardadas);

    // Estas son las de la semana
    if (filtro == 2)
      setActividadesFiltradas([
        ...actividadesGuardadas.filter(
          (actividad) => !pasoUnaSemana(actividad.fecha)
        ),
      ]);

    // Estas son las del mes
    if (filtro == 3)
      setActividadesFiltradas([
        ...actividadesGuardadas.filter(
          (actividad) => !pasoUnMes(actividad.fecha)
        ),
      ]);
  }, [filtro, actividadesGuardadas]);

  return (
    <div className="card p-3 mb-3">
      <h4>Registros</h4>
      <Select
        value={filtro}
        changeValue={(val) => setFiltro(val)}
        label={"Registros"}
        options={[
          {
            name: "Todo el histórico",
            id: 1,
          },
          {
            name: "Última semana",
            id: 2,
          },
          {
            name: "Último mes",
            id: 3,
          },
        ]}
      />
      {cargandoActividades ? (
        <div className="spinner-border" role="status">
          <span className="sr-only" />
        </div>
      ) : (
        <ul className="list-group">
          {actividadesFiltradas.map((actividad) => {
            const datosActividad = obtenerActividadById(actividad.idActividad);

            if (!datosActividad) return <></>;

            return (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>
                    <img
                      src={`https://movetrack.develotion.com/imgs/${datosActividad.imagen}.png`}
                    />
                    {datosActividad.nombre} - {actividad.tiempo} min
                  </strong>
                  <br />
                  <small className="text-muted">Día: {actividad.fecha}</small>
                </div>
                <div>
                  <Button
                    color="danger"
                    texto="Eliminar"
                    onClick={() => eliminarActividad(actividad.id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default VerRegistros;
