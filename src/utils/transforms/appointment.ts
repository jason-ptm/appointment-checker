import type { IStateUser } from "../../context/types";

// API Contract types
export interface AppointmentApiContract {
  id: string;
  appointmentDate: string;
  status: string;
  speciality: {
    id: string;
    name: string;
  };
  doctor: {
    doctorId: string;
    userId: string;
    name: string;
    phoneNumber: string;
    region: string;
  };
}

// API Contract type for doctor appointments response
export interface DoctorAppointmentsApiContract {
  success: boolean;
  doctor: {
    id: string;
    name: string;
  };
  totalAppointments: number;
  appointments: {
    id: string;
    appointmentDate: string;
    status: string;
    communicationCount: number;
    patient: {
      name: string;
      phoneNumber: string;
      region: string;
    };
    speciality: {
      name: string;
    };
  }[];
}

// Transform function to convert API contract to our internal structure
export const transformAppointmentResponse = (
  appointments: AppointmentApiContract[]
): IStateUser["appointments"] => {
  return appointments.map((appointment) => ({
    id: appointment.id,
    date: appointment.appointmentDate,
    status: appointment.status,
    specialty: appointment.speciality.name,
    doctor: {
      doctorId: appointment.doctor.doctorId,
      name: appointment.doctor.name,
    },
  }));
};

// Transform function for doctor appointments - extracts only required fields
export const transformDoctorAppointmentsResponse = (
  response: DoctorAppointmentsApiContract
): {
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
} => {
  return {
    doctor: response.doctor,
    totalAppointments: response.totalAppointments,
    appointments: response.appointments.map((appointment) => ({
      id: appointment.id,
      date: appointment.appointmentDate,
      status: appointment.status,
      communicationCount: appointment.communicationCount,
      patientName: appointment.patient.name,
      specialityName: appointment.speciality.name,
    })),
  };
};
