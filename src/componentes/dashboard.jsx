import React from "react";
import AgregarRegistro from "./dashboard/agregarRegistro";
import Tarjeta from "../shared/tarjeta";
import VerRegistros from "./dashboard/verRegistros";
import UltimosSieteDias from "./dashboard/graficos/ultimosSieteDias";
import CantidadSesiones from "./dashboard/graficos/cantidadSesiones";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const actividadesRegistradas = useSelector(
    (state) => state.dashboard.actividadesRegistradas
  );

  const sumaTotal = actividadesRegistradas.reduce(
    (current, elem) => current + elem.tiempo,
    0
  );

  const hoy = new Date().toISOString().split("T")[0];

  // Filtrar las actividades de hoy
  const actividadesHoy = actividadesRegistradas.filter(
    (actividad) => actividad.fecha === hoy
  );

  // Sumar los tiempos de las actividades de hoy
  const sumaTiemposHoy = actividadesHoy.reduce(
    (total, actividad) => total + actividad.tiempo,
    0
  );

  return (
    <div id="dashboard">
      <h2 className="text-center">Dashboard</h2>
      <div className="row">
        <Tarjeta
          label={"Tiempo Total"}
          content={`${sumaTotal} min`}
          color={"primary"}
        />
        <Tarjeta
          label={"Tiempo Diario"}
          content={`${sumaTiemposHoy} min`}
          color={"success"}
        />
      </div>
      <AgregarRegistro />
      <VerRegistros />

      <div className="row">
        <div className="card p-3 mb-3 d-flex">
          <h5>Sesiones por Actividad</h5>
          <div
            className="bg-light d-flex justify-content-center"
            style={{ height: "400px" }}
          >
            <CantidadSesiones />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card p-3 mb-3">
          <h5>Últimos 7 días</h5>
          <div
            className="bg-light d-flex justify-content-center"
            style={{ height: "400px" }}
          >
            <UltimosSieteDias />
          </div>
        </div>
      </div>

      <div className="card p-3 text-center">
        <h5>¡Bien hecho!</h5>
      </div>
    </div>
  );
};

export default Dashboard;
