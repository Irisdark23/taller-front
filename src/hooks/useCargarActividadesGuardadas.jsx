import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guardarActividadRegistradas } from "../features/dashboardSlice";

const useCargarActividadesGuardadas = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.id);
  const apiKey = useSelector((state) => state.auth.apiKey);

  const [cargandoActividades, setCargandoActividades] = useState(false);

  const obtenerActividades = () => {
    setCargandoActividades(true);
    fetch(
      `https://movetrack.develotion.com/registros.php?idUsuario=${userId}`,
      {
        headers: {
          apikey: apiKey,
          iduser: userId,
        },
      }
    )
      .then((r) => r.json())
      .then((datos) => {
        if (datos.codigo == 200) {
          dispatch(guardarActividadRegistradas(datos.registros));
        }
      })
      .finally(() => setCargandoActividades(false));
  };

  return { cargandoActividades, obtenerActividades };
};

export default useCargarActividadesGuardadas;
