import type { IStateUser } from "../context/types";
import type { AuthDto } from "../model/authDto";
import type { Error } from "../model/error";
import { USER_TYPE } from "../utils/constants";
import { getAxios } from "../utils/getAxios";
import { transformAuthResponse } from "../utils/transforms/auth";

export const checkUserService = async (
  id: string
): Promise<IStateUser | Error> => {
  try {
    const axios = getAxios();

    const response = await axios.post("/auth/login", { id });
    return transformAuthResponse(response.data);
  } catch (error: unknown) {
    console.log("🚀 ~ checkUserService ~ error:", error);
    return {
      error: {
        message: "Error al verificar el usuario",
      },
    };
  }
};

export const createUserService = async (
  payload: AuthDto
): Promise<IStateUser | Error> => {
  try {
    const axios = getAxios();

    const response = await axios.post("/users/create", {
      ...payload,
      type: USER_TYPE.USER,
    });
    return transformAuthResponse(response.data);
  } catch (error: unknown) {
    console.log("🚀 ~ createUserService ~ error:", error);
    return {
      error: {
        message: "Error al crear el usuario",
      },
    };
  }
};
