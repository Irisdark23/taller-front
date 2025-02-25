import { createSlice } from "@reduxjs/toolkit";

const user =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

const initialState = {
  usuario: user && user?.usuario,
  apiKey: user && user?.apiKey,
  isUserLogged: Boolean(user),
  id: user && user?.id,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    guardarSession: (state, action) => {
      (state.usuario = action.payload.usuario),
        (state.apiKey = action.payload.apiKey),
        (state.id = action.payload.id),
        (state.isUserLogged = true);
    },
    eliminarSession: (state) => {
      (state.usuario = undefined),
        (state.apiKey = undefined),
        (state.id = undefined),
        (state.isUserLogged = false);
    },
  },
});

export const { guardarSession, eliminarSession } = authSlice.actions;

export default authSlice.reducer;
