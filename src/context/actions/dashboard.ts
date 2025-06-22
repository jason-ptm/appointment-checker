import { getDashboardData } from "../../services/dashboard";
import { ActionType, type Action } from "../types";
import type { Dispatch } from "react";

export const fetchDashboardData = async (
  dispatch: Dispatch<Action>,
  doctorId: string
) => {
  dispatch({
    type: ActionType.SET_LOADING_DASHBOARD,
    payload: true,
  });

  const response = await getDashboardData(doctorId);

  dispatch({
    type: ActionType.SET_LOADING_DASHBOARD,
    payload: false,
  });

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
  } else {
    dispatch({
      type: ActionType.SET_DASHBOARD,
      payload: response.dashboard,
    });
  }
};
