import { ActionType, type Action, type State } from "./types";

export const initialState: State = {
  isLoading: false,
  isLoadingAppointments: false,
  isLoadingSpecialties: false,
  isLoadingDoctors: false,
  isLoadingDashboard: false,
  error: {
    message: "",
  },
  data: {
    accessToken: "",
    user: {
      id: "",
      name: "",
      type: "",
      roles: [],
    },
    appointments: [],
    specialties: [],
    doctors: [],
  },
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_LOADING:
      return {
        ...state,
        isLoading: Boolean(action.payload),
      };
    case ActionType.SET_LOADING_APPOINTMENTS:
      return {
        ...state,
        isLoadingAppointments: Boolean(action.payload),
      };
    case ActionType.SET_LOADING_SPECIALTIES:
      return {
        ...state,
        isLoadingSpecialties: Boolean(action.payload),
      };
    case ActionType.SET_LOADING_DOCTORS:
      return {
        ...state,
        isLoadingDoctors: Boolean(action.payload),
      };
    case ActionType.SET_LOADING_DASHBOARD:
      return {
        ...state,
        isLoadingDashboard: Boolean(action.payload),
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: {
          message: typeof action.payload === "string" ? action.payload : "",
        },
      };
    case ActionType.SET_DATA:
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "user" in action.payload
      ) {
        return {
          ...state,
          data: action.payload as State["data"],
        };
      }
      return state;
    case ActionType.SET_APPOINTMENTS:
      if (
        Array.isArray(action.payload) &&
        action.payload.length > 0 &&
        "date" in action.payload[0]
      ) {
        return {
          ...state,
          data: {
            ...state.data,
            appointments: action.payload as State["data"]["appointments"],
          },
        };
      }
      return state;
    case ActionType.SET_SPECIALTIES:
      if (
        Array.isArray(action.payload) &&
        action.payload.length > 0 &&
        "name" in action.payload[0] &&
        !("date" in action.payload[0])
      ) {
        return {
          ...state,
          data: {
            ...state.data,
            specialties: action.payload as State["data"]["specialties"],
          },
        };
      }
      return state;
    case ActionType.SET_DOCTORS:
      if (
        Array.isArray(action.payload) &&
        action.payload.length > 0 &&
        "name" in action.payload[0]
      ) {
        return {
          ...state,
          data: {
            ...state.data,
            doctors: action.payload as State["data"]["doctors"],
          },
        };
      }
      return state;
    case ActionType.SET_DASHBOARD:
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "totalAppointments" in action.payload
      ) {
        return {
          ...state,
          data: {
            ...state.data,
            dashboard: action.payload as State["data"]["dashboard"],
          },
        };
      }
      return state;
    case ActionType.UPDATE_APPOINTMENT_STATUS:
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "appointmentId" in action.payload &&
        "status" in action.payload
      ) {
        return {
          ...state,
          data: {
            ...state.data,
            appointments: state.data.appointments.map((appointment) =>
              appointment.id ===
              (action.payload as { appointmentId: string; status: string })
                .appointmentId
                ? {
                    ...appointment,
                    status: (
                      action.payload as {
                        appointmentId: string;
                        status: string;
                      }
                    ).status,
                  }
                : appointment
            ),
          },
        };
      }
      return state;
    case ActionType.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
