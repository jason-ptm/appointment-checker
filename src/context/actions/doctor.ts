import { getDoctorsBySpecialty } from "../../services/specialty";
import { ActionType, type Action } from "../types";
import type { Dispatch } from "react";

export const fetchDoctorsBySpecialty = async (
  dispatch: Dispatch<Action>,
  specialty: string
) => {
  dispatch({
    type: ActionType.SET_LOADING_DOCTORS,
    payload: true,
  });

  const response = await getDoctorsBySpecialty(specialty);

  dispatch({
    type: ActionType.SET_LOADING_DOCTORS,
    payload: false,
  });

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
  } else {
    dispatch({
      type: ActionType.SET_DOCTORS,
      payload: response.doctors || [],
    });
  }
};
