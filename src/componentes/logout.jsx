import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { eliminarSession } from "../features/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("user");
    dispatch(eliminarSession());
    navigate("/");
  }, []);

  return <div className="container mt-5"></div>;
};

export default Logout;
