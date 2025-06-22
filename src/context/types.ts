import type { DashboardResponse } from "../services/dashboard";

export interface IStateUser {
  accessToken?: string;
  user: {
    id?: string;
    name?: string;
    type: string;
    roles?: string[];
  };
  appointments: {
    id: string;
    date: string;
    status: string;
    specialty: string;
    doctor: {
      doctorId: string;
      name: string;
    };
  }[];
  specialties: {
    id: string;
    name: string;
  }[];
  doctors: {
    id: string;
    name: string;
    calendars: {
      startDate: string;
      endDate: string;
    }[];
  }[];
  dashboard?: DashboardResponse;
}

export type State = {
  isLoading: boolean;
  isLoadingAppointments: boolean;
  isLoadingSpecialties: boolean;
  isLoadingDoctors: boolean;
  isLoadingDashboard: boolean;
  error: {
    message: string;
  };
  data: IStateUser;
};

export enum ActionType {
  SET_LOADING = "SET_LOADING",
  SET_LOADING_APPOINTMENTS = "SET_LOADING_APPOINTMENTS",
  SET_LOADING_SPECIALTIES = "SET_LOADING_SPECIALTIES",
  SET_LOADING_DOCTORS = "SET_LOADING_DOCTORS",
  SET_LOADING_DASHBOARD = "SET_LOADING_DASHBOARD",
  SET_ERROR = "SET_ERROR",
  SET_DATA = "SET_DATA",
  SET_APPOINTMENTS = "SET_APPOINTMENTS",
  SET_SPECIALTIES = "SET_SPECIALTIES",
  SET_DOCTORS = "SET_DOCTORS",
  SET_DASHBOARD = "SET_DASHBOARD",
  UPDATE_APPOINTMENT_STATUS = "UPDATE_APPOINTMENT_STATUS",
  CREATE_APPOINTMENT = "CREATE_APPOINTMENT",
  LOGOUT = "LOGOUT",
}

export type Action = {
  type: ActionType;
  payload:
    | boolean
    | string
    | IStateUser
    | IStateUser["appointments"]
    | IStateUser["specialties"]
    | IStateUser["doctors"]
    | DashboardResponse
    | { appointmentId: string; status: string }
    | null;
};
