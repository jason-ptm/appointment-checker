import type { IStateUser } from "../context/types";
import type { Error } from "../model/error";
import { getAxiosWithToken } from "../utils/getAxios";
import {
  transformAppointmentResponse,
  transformDoctorAppointmentsResponse,
} from "../utils/transforms/appointment";

// API Contract type for appointment status update response
export interface AppointmentStatusUpdateResponse {
  id: string;
  appointmentDate: string;
  status: string;
}

// API Contract type for appointment creation request
export interface CreateAppointmentRequest {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  specialityId: string;
}

// API Contract type for appointment creation response
export interface CreateAppointmentResponse {
  id: string;
  appointmentDate: string;
  status: string;
  patientId: string;
  doctorId: string;
  specialityId: string;
}

// API Contract type for communication creation request
export interface CreateCommunicationRequest {
  appointmentId: string;
  type: string;
  startDate: string;
  status: string;
}

// API Contract type for communication creation response
export interface CreateCommunicationResponse {
  id: string;
  appointmentId: string;
  type: string;
  startDate: string;
  status: string;
}

export const getAppointmentsForUser = async (
  userId: string
): Promise<{ appointments: IStateUser["appointments"] } | Error> => {
  try {
    const axios = getAxiosWithToken();

    const response = await axios.get(`/appointment/user/${userId}`);

    const transformedAppointments = transformAppointmentResponse(response.data);

    return {
      appointments: transformedAppointments,
    };
  } catch (error: unknown) {
    console.log("🚀 ~ getAppointmentsForUser ~ error:", error);
    return {
      error: {
        message: "Error al obtener las citas del usuario",
      },
    };
  }
};

export const updateAppointmentStatus = async (
  appointmentId: string,
  status: string
): Promise<{ appointment: AppointmentStatusUpdateResponse } | Error> => {
  try {
    const axios = getAxiosWithToken();

    const response = await axios.patch(`/appointment/${appointmentId}/status`, {
      status,
    });

    return {
      appointment: response.data,
    };
  } catch (error: unknown) {
    console.log("🚀 ~ updateAppointmentStatus ~ error:", error);
    return {
      error: {
        message: "Error al actualizar el estado de la cita",
      },
    };
  }
};

export const createAppointment = async (
  appointmentData: CreateAppointmentRequest
): Promise<{ appointment: CreateAppointmentResponse } | Error> => {
  try {
    const axios = getAxiosWithToken();

    const response = await axios.post(`/appointment`, appointmentData);

    return {
      appointment: response.data,
    };
  } catch (error: unknown) {
    console.log("🚀 ~ createAppointment ~ error:", error);
    return {
      error: {
        message: "Error al crear la cita",
      },
    };
  }
};

export const getDoctorAppointments = async (
  doctorId: string
): Promise<
  | {
      doctor: { id: string; name: string };
      totalAppointments: number;
      appointments: {
        id: string;
        date: string;
        status: string;
        communicationCount: number;
        patientName: string;
        specialityName: string;
      }[];
    }
  | Error
> => {
  try {
    const axios = getAxiosWithToken();

    const response = await axios.get(
      `/users/doctor/${doctorId}/all-appointments`
    );

    const transformedData = transformDoctorAppointmentsResponse(response.data);

    return transformedData;
  } catch (error: unknown) {
    console.log("🚀 ~ getDoctorAppointments ~ error:", error);
    return {
      error: {
        message: "Error al obtener las citas del doctor",
      },
    };
  }
};

export const createCommunication = async (
  communicationData: CreateCommunicationRequest
): Promise<{ communication: CreateCommunicationResponse } | Error> => {
  try {
    const axios = getAxiosWithToken();

    const response = await axios.post(`/communication`, communicationData);

    return {
      communication: response.data,
    };
  } catch (error: unknown) {
    console.log("🚀 ~ createCommunication ~ error:", error);
    return {
      error: {
        message: "Error al crear la comunicación",
      },
    };
  }
};
