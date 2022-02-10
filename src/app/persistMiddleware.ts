import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const persistMiddleware: Middleware<{}, RootState> = (storeApi) => (
  next
) => (action) => {
  const result = next(action);
  const state = storeApi.getState();
  localStorage.setItem("repsDays", JSON.stringify(state.chart.repsDays));
  return result;
};
