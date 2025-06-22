import type { Error } from "../model/error";
import { getAxiosWithToken } from "../utils/getAxios";

// API Contract types for dashboard response
export interface DashboardAppointment {
  id: string;
  appointmentDate: string;
  speciality: {
    name: string;
  };
  patient: {
    name: string;
  };
}

export interface DashboardResponse {
  totalAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  confirmedAppointments: DashboardAppointment[];
}

export const getDashboardData = async (
  doctorId: string
): Promise<{ dashboard: DashboardResponse } | Error> => {
  try {
    const axios = getAxiosWithToken();

    const response = await axios.get(`/users/doctor/${doctorId}/appointments`);

    return {
      dashboard: response.data,
    };
  } catch (error: unknown) {
    console.log("🚀 ~ getDashboardData ~ error:", error);
    return {
      error: {
        message: "Error al obtener los datos del dashboard",
      },
    };
  }
};
