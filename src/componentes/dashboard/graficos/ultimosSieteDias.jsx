import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Función para obtener los últimos 7 días y agrupar por fecha
const obtenerUltimos7Dias = (actividades) => {
  // Crear objeto para los últimos 7 días
  const hoy = new Date();
  const sieteDiasAtras = new Date();
  sieteDiasAtras.setDate(hoy.getDate() - 7);

  // Crear un objeto con las fechas de los últimos 7 días
  const dias = {};
  for (let i = 0; i < 7; i++) {
    const fecha = new Date(sieteDiasAtras);
    fecha.setDate(sieteDiasAtras.getDate() + i);
    const fechaStr = fecha.toISOString().split("T")[0]; // formato YYYY-MM-DD
    dias[fechaStr] = 0; // Inicializar en 0 los minutos por día
  }

  if (!actividades)
    return Object.keys(dias).map((fecha) => ({
      fecha: fecha,
      minutosTotales: 0,
    }));

  // Recorrer las actividades y sumar los minutos
  actividades.forEach((actividad) => {
    const fecha = actividad.fecha;
    if (dias.hasOwnProperty(fecha)) {
      dias[fecha] += actividad.tiempo;
    }
  });

  // Convertir el objeto a un array con fecha y minutos totales
  return Object.keys(dias).map((fecha) => ({
    fecha: fecha,
    minutosTotales: dias[fecha],
  }));
};

const UltimosSieteDias = () => {
  const actividadesRegistradas = useSelector(
    (state) => state.dashboard.actividadesRegistradas
  );

  const [resumen, setResumen] = useState(
    obtenerUltimos7Dias(actividadesRegistradas)
  );

  useEffect(() => {
    setResumen(obtenerUltimos7Dias(actividadesRegistradas));
  }, [actividadesRegistradas]);

  return (
    <div className="row">
      <div className="card p-3 mb-3">
        <h5>Últimos 7 días</h5>
        <div
          className="bg-light d-flex justify-content-center"
          style={{ height: "400px" }}
        >
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: " ",
                },
              },
            }}
            data={{
              labels: [...resumen.map((item) => item.fecha)],
              datasets: [
                {
                  label: "Minutos",
                  data: [...resumen.map((item) => item.minutosTotales)],
                  backgroundColor: "rgb(193, 47, 3)",
                },
              ],
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default UltimosSieteDias;
