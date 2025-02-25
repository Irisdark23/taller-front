import { useSelector } from "react-redux";

const Logro = () => {
  const actividadesRegistradas = useSelector(
    (state) => state.dashboard.actividadesRegistradas
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

  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  const fechaAyer = ayer.toISOString().split("T")[0];

  const actividadesAyer = actividadesRegistradas.filter(
    (actividad) => actividad.fecha === fechaAyer
  );

  const sumaTiemposAyer = actividadesAyer.reduce(
    (total, actividad) => total + actividad.tiempo,
    0
  );

  const masQueAyer = sumaTiemposAyer >= sumaTiemposHoy;

  return (
    <div
      className={`card p-3 text-center mb-5 bg-${masQueAyer ? "warning" : "success"}`}
    >
      {masQueAyer ? <h5>¡Que no decaiga!</h5> : <h5>¡Bien hecho!</h5>}
    </div>
  );
};

export default Logro;
