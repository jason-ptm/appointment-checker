import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  fetchDoctorAppointments,
  createCommunicationAction,
} from "../context/actions/appointment";
import { useContext } from "../context/useContenxt";
import { SidebarLayout } from "./SidebarLayout";

export const DoctorAppointmentsList = () => {
  const { state, dispatch } = useContext();
  const {
    user: { id: doctorId },
  } = state.data;
  const [appointmentsData, setAppointmentsData] = useState<{
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
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!doctorId) return;

      setLoading(true);
      setError(null);

      try {
        const result = await fetchDoctorAppointments(dispatch, doctorId);
        if (result) {
          setAppointmentsData(result);
        }
      } catch {
        setError("Error al cargar las citas del doctor");
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      loadAppointments();
    }
  }, [doctorId, dispatch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "success";
      case "PENDING":
        return "warning";
      case "CANCELLED":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleNotifyPatient = async (appointmentId: string) => {
    try {
      const success = await createCommunicationAction(dispatch, appointmentId);

      if (success) {
        setNotificationSent(true);
        if (doctorId) {
          const result = await fetchDoctorAppointments(dispatch, doctorId);
          if (result) {
            setAppointmentsData(result);
          }
        }
      }
    } catch (error) {
      console.error("Error al enviar notificación:", error);
      setError("Error al enviar la notificación");
    }
  };

  const handleCloseNotification = () => {
    setNotificationSent(false);
  };

  if (loading) {
    return <Typography>Cargando citas...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!appointmentsData) {
    return <Typography>No hay datos disponibles</Typography>;
  }

  return (
    <SidebarLayout title="Citas">
      <Box>
        <Typography variant="h5" gutterBottom>
          Citas del Dr. {appointmentsData.doctor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Total de citas: {appointmentsData.totalAppointments}
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Paciente</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="center">Comunicaciones</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentsData.appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{formatDate(appointment.date)}</TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.specialityName}</TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      color={
                        getStatusColor(appointment.status) as
                          | "success"
                          | "warning"
                          | "error"
                          | "default"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={appointment.communicationCount}
                      color="info"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {appointment.status === "PENDING" && (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<NotificationsIcon />}
                        onClick={() => handleNotifyPatient(appointment.id)}
                        color="primary"
                      >
                        Notificar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          open={notificationSent}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          message="Notificación enviada exitosamente"
        />
      </Box>
    </SidebarLayout>
  );
};
