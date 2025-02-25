import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actividades: [],
  actividadesRegistradas: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    guardarActividades: (state, action) => {
      state.actividades = action.payload;
    },
    guardarActividadRegistradas: (state, action) => {
      state.actividadesRegistradas = action.payload;
    },
  },
});

export const { guardarActividades, guardarActividadRegistradas } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
