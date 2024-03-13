import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempResponseJson: {},
};

export const projectSlice = createSlice({
  name: "project",
  initialState: initialState,
  reducers: {
    resetaAllProjectDetails: () => initialState,

    setTempResponseJson(state, action) {
      state.tempResponseJson = action.payload;
    },
  },
});

export const { setTempResponseJson } = projectSlice.actions;

export default projectSlice.reducer;
