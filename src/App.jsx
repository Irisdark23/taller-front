import React from "react";
import Login from "./componentes/login";
import Registro from "./componentes/registro";
import Dashboard from "./componentes/dashboard";
import Contenedor from "./componentes/contenedor";
import NoEncontrado from "./componentes/NoEncontrado";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { store } from "./store/store";
import Logout from "./componentes/logout";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contenedor />}>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/*" element={<NoEncontrado />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="colored"
      />
    </Provider>
  );
};
export default App;
