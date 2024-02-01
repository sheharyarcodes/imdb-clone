import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  genres: "",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, actions) => {
      state.url = actions.payload;
    },
    getGenres: (state, actions) => {
      state.genres = actions.payload;
    },
  },
});

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
