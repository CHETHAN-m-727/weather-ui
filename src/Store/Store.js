import { configureStore } from "@reduxjs/toolkit";
import ProjectSlice from "./Project/ProjectSlice";

export const store = configureStore({
  reducer: {
    project:ProjectSlice,
  },
});
