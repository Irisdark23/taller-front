import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router";

const Contenedor = () => {
  const isUserLogged = useSelector((state) => state.auth.isUserLogged);

  return (
    <div className="container">
      <header>
        <nav className="navbar navbar-light bg-white border-bottom">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              AppActividades
            </NavLink>
            <div className="d-flex gap-5">
              {isUserLogged ? (
                <>
                  <NavLink className="nav-link text-dark" to="/dashboard">
                    Dashboard
                  </NavLink>
                  <NavLink className="nav-link text-dark" to="/logout">
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-link text-dark" to="/">
                    Login
                  </NavLink>
                  <NavLink className="nav-link text-dark" to="/registro">
                    Registro
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
};
export default Contenedor;
