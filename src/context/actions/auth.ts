import type { AuthDto } from "../../model/authDto";
import { checkUserService, createUserService } from "../../services/auth";
import { JWT_TOKEN, USER_DATA } from "../../utils/constants";
import { ActionType, type Action } from "../types";
import type { Dispatch } from "react";

export const checkUser = async (dispatch: Dispatch<Action>, cedula: string) => {
  dispatch({
    type: ActionType.SET_LOADING,
    payload: true,
  });
  const response = await checkUserService(cedula);

  dispatch({
    type: ActionType.SET_LOADING,
    payload: false,
  });

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
  } else {
    dispatch({
      type: ActionType.SET_DATA,
      payload: {
        ...response,
      },
    });

    if (response.accessToken) {
      localStorage.setItem(JWT_TOKEN, response.accessToken);
    }

    if (response.user) {
      localStorage.setItem(USER_DATA, JSON.stringify(response.user));
    }
  }
};

export const createUser = async (dispatch: Dispatch<Action>, form: AuthDto) => {
  dispatch({
    type: ActionType.SET_LOADING,
    payload: true,
  });

  const response = await createUserService(form);

  dispatch({
    type: ActionType.SET_LOADING,
    payload: false,
  });
  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
  } else {
    dispatch({
      type: ActionType.SET_DATA,
      payload: {
        ...response,
      },
    });

    if (response?.accessToken) {
      localStorage.setItem(JWT_TOKEN, response?.accessToken);
    }

    if (response?.user) {
      localStorage.setItem(USER_DATA, JSON.stringify(response.user));
    }
  }
};

export const logout = (dispatch: Dispatch<Action>) => {
  // Clear localStorage
  localStorage.removeItem(JWT_TOKEN);
  localStorage.removeItem(USER_DATA);

  // Reset state to initial state
  dispatch({
    type: ActionType.LOGOUT,
    payload: null,
  });
};
