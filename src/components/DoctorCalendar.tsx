import { Alert, Box, Chip, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useContext } from "../context/useContenxt";

interface DoctorCalendarProps {
  value: string;
  onChange: (value: string) => void;
  doctorId: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const DoctorCalendar = ({
  value,
  onChange,
  doctorId,
  required = false,
  fullWidth = true,
  disabled = false,
  error = false,
  helperText,
}: DoctorCalendarProps) => {
  const { state } = useContext();
  const { doctors } = state.data;

  const [validationError, setValidationError] = useState<string>("");

  // Encontrar el doctor seleccionado
  const selectedDoctor = useMemo(() => {
    return doctors.find((doctor) => doctor.id === doctorId);
  }, [doctors, doctorId]);

  // Limpiar errores cuando cambia el doctor
  useEffect(() => {
    setValidationError("");
  }, [doctorId]);

  // Limpiar fecha cuando cambia el doctor
  useEffect(() => {
    if (doctorId && value) {
      // Si hay una fecha seleccionada, validarla con el nuevo doctor
      handleDateTimeChange(value);
    }
  }, [doctorId]);

  // Función para verificar si una fecha/hora está disponible
  const isDateTimeAvailable = (dateTimeString: string): boolean => {
    if (!selectedDoctor || !selectedDoctor.calendars) {
      return true; // Si no hay doctor seleccionado o no tiene calendarios, permitir
    }

    const selectedDateTime = new Date(dateTimeString);
    const now = new Date();

    // Verificar que la fecha no sea en el pasado
    if (selectedDateTime <= now) {
      return false;
    }

    // Verificar si la fecha seleccionada está en algún rango no disponible
    return !selectedDoctor.calendars.some((calendar) => {
      const startDate = new Date(calendar.startDate);
      const endDate = new Date(calendar.endDate);

      return selectedDateTime >= startDate && selectedDateTime <= endDate;
    });
  };

  // Función para obtener el siguiente horario disponible
  const getNextAvailableTime = (currentDateTime: string): string => {
    if (!selectedDoctor || !selectedDoctor.calendars) {
      // Si no hay calendarios, devolver la fecha actual + 1 hora
      const now = new Date();
      now.setHours(now.getHours() + 1);
      now.setMinutes(0);
      now.setSeconds(0);
      return now.toISOString().slice(0, 16);
    }

    let testDateTime = new Date(currentDateTime);
    const now = new Date();

    // Si la fecha seleccionada es en el pasado, empezar desde ahora + 1 hora
    if (testDateTime <= now) {
      testDateTime = new Date(now);
      testDateTime.setHours(testDateTime.getHours() + 1);
      testDateTime.setMinutes(0);
      testDateTime.setSeconds(0);
    }

    const maxAttempts = 48; // Máximo 48 horas hacia adelante
    let attempts = 0;

    while (attempts < maxAttempts) {
      if (isDateTimeAvailable(testDateTime.toISOString().slice(0, 16))) {
        return testDateTime.toISOString().slice(0, 16);
      }

      // Avanzar 30 minutos
      testDateTime.setMinutes(testDateTime.getMinutes() + 30);
      attempts++;
    }

    return testDateTime.toISOString().slice(0, 16);
  };

  // Función para manejar el cambio de fecha/hora
  const handleDateTimeChange = (dateTimeString: string) => {
    setValidationError("");

    if (!dateTimeString) {
      onChange(dateTimeString);
      return;
    }

    const selectedDateTime = new Date(dateTimeString);
    const now = new Date();

    // Verificar que la fecha no sea en el pasado
    if (selectedDateTime <= now) {
      const nextAvailable = getNextAvailableTime(dateTimeString);
      setValidationError(
        `No se pueden agendar citas en el pasado. Próximo horario disponible: ${new Date(
          nextAvailable
        ).toLocaleString("es-ES")}`
      );
      onChange(nextAvailable);
      return;
    }

    if (!isDateTimeAvailable(dateTimeString)) {
      const nextAvailable = getNextAvailableTime(dateTimeString);
      setValidationError(
        `El doctor no está disponible en este horario. Próximo horario disponible: ${new Date(
          nextAvailable
        ).toLocaleString("es-ES")}`
      );
      onChange(nextAvailable);
    } else {
      onChange(dateTimeString);
    }
  };

  // Función para obtener horarios no disponibles formateados
  const getUnavailableTimes = () => {
    if (!selectedDoctor || !selectedDoctor.calendars) {
      return [];
    }

    return selectedDoctor.calendars
      .map((calendar, index) => ({
        id: index,
        start: new Date(calendar.startDate),
        end: new Date(calendar.endDate),
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  // Función para obtener el próximo horario disponible
  const getNextAvailableSlot = () => {
    const now = new Date();
    const unavailableTimes = getUnavailableTimes();

    if (unavailableTimes.length === 0) {
      return now;
    }

    // Buscar el primer slot disponible después de ahora
    const testTime = new Date(now);
    testTime.setHours(testTime.getHours() + 1);
    testTime.setMinutes(0);
    testTime.setSeconds(0);

    for (let i = 0; i < 48; i++) {
      // Buscar en las próximas 48 horas
      const isAvailable = !unavailableTimes.some(
        (unavailable) =>
          testTime >= unavailable.start && testTime <= unavailable.end
      );

      if (isAvailable) {
        return testTime;
      }

      testTime.setMinutes(testTime.getMinutes() + 30);
    }

    return now;
  };

  const unavailableTimes = getUnavailableTimes();
  const nextAvailableSlot = getNextAvailableSlot();

  if (!doctorId) {
    return (
      <TextField
        label="Fecha y Hora de la Cita"
        type="datetime-local"
        value=""
        disabled={true}
        required={required}
        fullWidth={fullWidth}
        InputLabelProps={{
          shrink: true,
        }}
        helperText="Seleccione un doctor primero"
      />
    );
  }

  return (
    <Box>
      <TextField
        label="Fecha y Hora de la Cita"
        type="datetime-local"
        value={value}
        onChange={(e) => handleDateTimeChange(e.target.value)}
        required={required}
        fullWidth={fullWidth}
        disabled={disabled}
        error={error || !!validationError}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={helperText || validationError}
      />

      {selectedDoctor && unavailableTimes.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Horarios no disponibles del Dr. {selectedDoctor.name}:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
            {unavailableTimes.map((time) => (
              <Chip
                key={time.id}
                label={`${time.start.toLocaleString("es-ES", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${time.end.toLocaleString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
                size="small"
                color="error"
                variant="outlined"
              />
            ))}
          </Box>
          <Typography variant="caption" color="info.main">
            Próximo horario disponible:{" "}
            {nextAvailableSlot.toLocaleString("es-ES")}
          </Typography>
        </Box>
      )}

      {selectedDoctor && unavailableTimes.length === 0 && (
        <Alert severity="info" sx={{ mt: 1 }}>
          El Dr. {selectedDoctor.name} tiene disponibilidad completa en este
          momento.
        </Alert>
      )}
    </Box>
  );
};
