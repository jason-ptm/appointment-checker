import { getAllSpecialties } from "../../services/specialty";
import { ActionType, type Action } from "../types";
import type { Dispatch } from "react";

export const fetchSpecialties = async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.SET_LOADING_SPECIALTIES,
    payload: true,
  });

  const response = await getAllSpecialties();

  dispatch({
    type: ActionType.SET_LOADING_SPECIALTIES,
    payload: false,
  });

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
  } else {
    dispatch({
      type: ActionType.SET_SPECIALTIES,
      payload: response.specialties || [],
    });
  }
};
