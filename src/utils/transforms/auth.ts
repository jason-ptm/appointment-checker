import type { IStateUser } from "../../context/types";
import type { AuthResponse } from "../../model/authDto";

export const transformAuthResponse = (response: AuthResponse): IStateUser => {
  return {
    accessToken: response.access_token,
    user: {
      id: response.user.id,
      name: response.user.name,
      type: response.user.type,
      roles: response.user.roles,
    },
    appointments: [],
  };
};
