import {
  getAppointmentsForUser,
  updateAppointmentStatus,
  createAppointment,
  getDoctorAppointments,
  createCommunication,
  type CreateAppointmentRequest,
  type CreateCommunicationRequest,
} from "../../services/appointment";
import { ActionType, type Action } from "../types";
import type { Dispatch } from "react";

export const fetchUserAppointments = async (
  dispatch: Dispatch<Action>,
  userId: string
) => {
  dispatch({
    type: ActionType.SET_LOADING_APPOINTMENTS,
    payload: true,
  });

  const response = await getAppointmentsForUser(userId);

  dispatch({
    type: ActionType.SET_LOADING_APPOINTMENTS,
    payload: false,
  });

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
  } else {
    dispatch({
      type: ActionType.SET_APPOINTMENTS,
      payload: response.appointments || [],
    });
  }
};

export const updateAppointmentStatusAction = async (
  dispatch: Dispatch<Action>,
  appointmentId: string,
  status: string
) => {
  const response = await updateAppointmentStatus(appointmentId, status);

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
    return false;
  } else {
    dispatch({
      type: ActionType.UPDATE_APPOINTMENT_STATUS,
      payload: {
        appointmentId,
        status,
      },
    });
    return true;
  }
};

export const createAppointmentAction = async (
  dispatch: Dispatch<Action>,
  appointmentData: CreateAppointmentRequest
) => {
  dispatch({
    type: ActionType.SET_LOADING,
    payload: true,
  });

  const response = await createAppointment(appointmentData);

  dispatch({
    type: ActionType.SET_LOADING,
    payload: false,
  });

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
    return false;
  } else {
    // Automatically refresh the appointments list after creating a new one
    if (appointmentData.patientId) {
      await fetchUserAppointments(dispatch, appointmentData.patientId);
    }
    return true;
  }
};

export const fetchDoctorAppointments = async (
  dispatch: Dispatch<Action>,
  doctorId: string
) => {
  dispatch({
    type: ActionType.SET_LOADING_APPOINTMENTS,
    payload: true,
  });

  const response = await getDoctorAppointments(doctorId);

  dispatch({
    type: ActionType.SET_LOADING_APPOINTMENTS,
    payload: false,
  });

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
    return null;
  } else {
    return response;
  }
};

export const createCommunicationAction = async (
  dispatch: Dispatch<Action>,
  appointmentId: string
) => {
  dispatch({
    type: ActionType.SET_LOADING,
    payload: true,
  });

  const communicationData: CreateCommunicationRequest = {
    appointmentId,
    type: "SMS",
    startDate: new Date().toISOString(),
    status: "PENDING",
  };

  const response = await createCommunication(communicationData);

  dispatch({
    type: ActionType.SET_LOADING,
    payload: false,
  });

  if ("error" in response) {
    dispatch({
      type: ActionType.SET_ERROR,
      payload: response.error.message,
    });
    return false;
  } else {
    return true;
  }
};
