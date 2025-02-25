import React from "react";
import AgregarRegistro from "./dashboard/agregarRegistro";
import Tarjeta from "../shared/tarjeta";
import VerRegistros from "./dashboard/verRegistros";
import UltimosSieteDias from "./dashboard/graficos/ultimosSieteDias";
import CantidadSesiones from "./dashboard/graficos/cantidadSesiones";
import { useSelector } from "react-redux";
import Logro from "./dashboard/logro";

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
    <div>
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

      <CantidadSesiones />

      <UltimosSieteDias />

      <Logro />
    </div>
  );
};

export default Dashboard;
