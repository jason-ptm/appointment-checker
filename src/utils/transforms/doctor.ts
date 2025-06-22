import type { IStateUser } from "../../context/types";

// API Contract types for backend response
export interface DoctorApiContract {
  doctor: {
    id: string;
    name: string;
  };
  calendars: {
    startDate: string;
    endDate: string;
  }[];
}

// Transform function to convert API contract to our internal structure
export const transformDoctorResponse = (
  doctors: DoctorApiContract[]
): IStateUser["doctors"] => {
  return doctors.map((doctorData) => ({
    id: doctorData.doctor.id,
    name: doctorData.doctor.name,
    calendars: doctorData.calendars,
  }));
};
