import { Pie } from "react-chartjs-2"; // Cambiar de Bar a Pie
import { useSelector } from "react-redux";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend); // Necesitamos el ArcElement para los gráficos circulares

// Función para obtener los últimos 7 días y agrupar por fecha
const obtenerCantidadSesiones = (actividadesRegistradas, actividades) => {
  const obtenerActividadById = (actividadId) =>
    actividades?.find((act) => act.id == actividadId);

  const resultado = actividadesRegistradas.reduce((acc, item) => {
    acc[item.idActividad] = (acc[item.idActividad] || 0) + 1;
    return acc;
  }, {});

  const resultadoArray = Object.entries(resultado).map(
    ([actividad, sesion]) => ({
      actividad: obtenerActividadById(actividad)?.nombre || actividad,
      sesion,
    })
  );

  return resultadoArray;
};

const CantidadSesiones = () => {
  const actividadesRegistradas = useSelector(
    (state) => state.dashboard.actividadesRegistradas
  );

  const actividades = useSelector((state) => state.dashboard.actividades);

  const [resumen, setResumen] = useState(
    obtenerCantidadSesiones(actividadesRegistradas, actividades)
  );

  useEffect(() => {
    setResumen(obtenerCantidadSesiones(actividadesRegistradas, actividades));
  }, [actividadesRegistradas]);

  return (
    <div className="row">
      <div className="card p-3 mb-3 d-flex">
        <h5>Sesiones por Actividad</h5>
        <div
          className="bg-light d-flex justify-content-center"
          style={{ height: "400px" }}
        >
          <Pie
            options={{
              responsive: true,
            }}
            data={{
              labels: resumen.map((item) => item.actividad), // Fechas como etiquetas
              datasets: [
                {
                  label: "Sesiones", // El label puede ser el total de minutos
                  data: resumen.map((item) => item.sesion), // Los minutos totales por día
                  backgroundColor: [
                    "rgba(54, 46, 170, 0.5)", // Puedes agregar más colores si tienes más segmentos
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(255, 205, 86, 0.5)",
                    "rgba(201, 203, 207, 0.5)",
                  ],
                  borderColor: [
                    "rgba(54, 46, 170, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 205, 86, 1)",
                    "rgba(201, 203, 207, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CantidadSesiones;
