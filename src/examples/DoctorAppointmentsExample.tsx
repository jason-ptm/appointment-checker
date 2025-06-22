import React from "react";
import { DoctorAppointmentsList } from "../components/DoctorAppointmentsList";

/**
 * Example component showing how to use the new getDoctorAppointments service
 *
 * This component demonstrates:
 * 1. How to fetch all appointments for a specific doctor
 * 2. How the transform function extracts only the required fields:
 *    - id
 *    - date (formatted from appointmentDate)
 *    - status
 *    - patientName (extracted from patient.name)
 *    - specialityName (extracted from speciality.name)
 * 3. How to display the data in a clean table format
 */
export const DoctorAppointmentsExample: React.FC = () => {
  // Example usage - replace "1" with the actual doctor ID
  const doctorId = "1";

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ejemplo: Citas del Doctor</h1>
      <p>
        Este ejemplo muestra cómo usar el nuevo servicio{" "}
        <code>getDoctorAppointments</code>
        que obtiene todas las citas programadas para un doctor específico.
      </p>

      <h2>Características del servicio:</h2>
      <ul>
        <li>
          Endpoint: <code>GET /users/doctor/{doctorId}/all-appointments</code>
        </li>
        <li>Transforma la respuesta para extraer solo los campos requeridos</li>
        <li>Maneja errores y estados de carga</li>
        <li>Muestra los datos en una tabla organizada</li>
      </ul>

      <h2>Campos extraídos por el transform:</h2>
      <ul>
        <li>
          <strong>id:</strong> ID de la cita
        </li>
        <li>
          <strong>date:</strong> Fecha de la cita (formateada)
        </li>
        <li>
          <strong>status:</strong> Estado de la cita (CONFIRMED, PENDING,
          CANCELLED)
        </li>
        <li>
          <strong>patientName:</strong> Nombre del paciente
        </li>
        <li>
          <strong>specialityName:</strong> Nombre de la especialidad
        </li>
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <DoctorAppointmentsList doctorId={doctorId} />
    </div>
  );
};

export default DoctorAppointmentsExample;
