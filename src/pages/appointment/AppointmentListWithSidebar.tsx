import { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Context } from "../../context";
import {
  fetchUserAppointments,
  updateAppointmentStatusAction,
} from "../../context/actions/appointment";

interface Column {
  id: "date" | "specialty" | "doctor" | "status" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: string) => string;
}

// Componente para mostrar el estado con Chip
const StatusChip = ({ status }: { status: string }) => {
  const getStatusConfig = (status: string) => {
    const statusMap: Record<
      string,
      {
        label: string;
        color:
          | "default"
          | "primary"
          | "secondary"
          | "error"
          | "info"
          | "success"
          | "warning";
      }
    > = {
      PENDING: { label: "Pendiente", color: "warning" },
      CONFIRMED: { label: "Confirmada", color: "success" },
      CANCELLED: { label: "Cancelada", color: "error" },
      COMPLETED: { label: "Completada", color: "info" },
    };
    return statusMap[status] || { label: status, color: "default" };
  };

  const { label, color } = getStatusConfig(status);

  return <Chip label={label} color={color} size="small" variant="filled" />;
};

// Componente para las acciones de la cita
const AppointmentActions = ({
  appointmentId,
  currentStatus,
  onUpdateStatus,
}: {
  appointmentId: string;
  currentStatus: string;
  onUpdateStatus: (appointmentId: string, status: string) => Promise<void>;
}) => {
  const handleConfirm = () => onUpdateStatus(appointmentId, "CONFIRMED");
  const handleCancel = () => onUpdateStatus(appointmentId, "CANCELLED");

  // Solo mostrar botón de confirmar si la cita está pendiente
  const canConfirm = currentStatus === "PENDING";
  // Se puede cancelar excepto si ya está cancelada o completada
  const canCancel =
    currentStatus !== "CANCELLED" && currentStatus !== "COMPLETED";

  return (
    <ButtonGroup size="small" variant="outlined">
      {canConfirm && (
        <Button
          startIcon={<CheckCircleIcon />}
          onClick={handleConfirm}
          color="success"
          size="small"
        >
          Confirmar
        </Button>
      )}
      {canCancel && (
        <Button
          startIcon={<CancelIcon />}
          onClick={handleCancel}
          color="error"
          size="small"
        >
          Cancelar
        </Button>
      )}
      {!canConfirm && !canCancel && <span>-</span>}
    </ButtonGroup>
  );
};

const columns: readonly Column[] = [
  {
    id: "date",
    label: "Fecha",
    minWidth: 170,
    format: (value: string) =>
      new Date(value).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    id: "specialty",
    label: "Especialidad",
    minWidth: 150,
  },
  {
    id: "doctor",
    label: "Doctor",
    minWidth: 150,
  },
  {
    id: "status",
    label: "Estado",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Acciones",
    minWidth: 200,
    align: "center",
  },
];

export const AppointmentListWithSidebar = () => {
  const { state, dispatch } = useContext(Context);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ state.data.user.id:", state.data.user.id);
    if (state.data.user.id) {
      fetchUserAppointments(dispatch, state.data.user.id);
    }
  }, [state.data.user.id]);

  useEffect(() => {
    console.log(
      "🚀 ~ useEffect ~ state.data.appointments:",
      state.data.appointments
    );
  }, [state.data.appointments]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdateStatus = async (appointmentId: string, status: string) => {
    const success = await updateAppointmentStatusAction(
      dispatch,
      appointmentId,
      status
    );

    if (success) {
      console.log(`Estado de la cita ${appointmentId} actualizado a ${status}`);

      // Set appropriate message based on the status
      let message = "";
      if (status === "CONFIRMED") {
        message = "Cita confirmada exitosamente!";
      } else if (status === "CANCELLED") {
        message = "Cita cancelada exitosamente!";
      } else {
        message = `Estado de la cita actualizado a ${status}`;
      }

      setSnackbarMessage(message);
      setOpenSnackbar(true);
    } else {
      console.error("Error al actualizar el estado de la cita");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      {state.isLoadingAppointments ? (
        <div>Cargando citas...</div>
      ) : state.data.appointments.length === 0 ? (
        <div>No hay citas disponibles</div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {state.data.appointments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((appointment) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={appointment.id}
                      >
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "status" ? (
                                <StatusChip status={appointment.status} />
                              ) : column.id === "actions" ? (
                                <AppointmentActions
                                  appointmentId={appointment.id}
                                  currentStatus={appointment.status}
                                  onUpdateStatus={handleUpdateStatus}
                                />
                              ) : column.id === "doctor" ? (
                                appointment.doctor.name
                              ) : column.format ? (
                                column.format(
                                  appointment[
                                    column.id as keyof typeof appointment
                                  ] as string
                                )
                              ) : (
                                (appointment[
                                  column.id as keyof typeof appointment
                                ] as string)
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={state.data.appointments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
            }
          />
        </Paper>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
