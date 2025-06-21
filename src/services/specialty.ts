import type { Error } from "../model/error";
import { getAxiosWithToken } from "../utils/getAxios";
import { transformDoctorResponse } from "../utils/transforms/doctor";

// API Contract type for specialty response
export interface SpecialtyResponse {
  id: string;
  name: string;
}

// API Contract type for doctor response (frontend format)
export interface DoctorResponse {
  id: string;
  name: string;
  calendars: {
    startDate: string;
    endDate: string;
  }[];
}

export const getAllSpecialties = async (): Promise<
  { specialties: SpecialtyResponse[] } | Error
> => {
  try {
    const axios = getAxiosWithToken();

    const response = await axios.get("/speciality/all");

    return {
      specialties: response.data,
    };
  } catch (error: unknown) {
    console.log("🚀 ~ getAllSpecialties ~ error:", error);
    return {
      error: {
        message: "Error al obtener las especialidades",
      },
    };
  }
};

export const getDoctorsBySpecialty = async (
  specialty: string
): Promise<{ doctors: DoctorResponse[] } | Error> => {
  try {
    const axios = getAxiosWithToken();

    const response = await axios.get(
      `/users/doctor/speciality?speciality=${encodeURIComponent(specialty)}`
    );

    // Transform the backend response to match frontend format
    const transformedDoctors = transformDoctorResponse(response.data);

    return {
      doctors: transformedDoctors,
    };
  } catch (error: unknown) {
    console.log("🚀 ~ getDoctorsBySpecialty ~ error:", error);
    return {
      error: {
        message: "Error al obtener los doctores por especialidad",
      },
    };
  }
};
