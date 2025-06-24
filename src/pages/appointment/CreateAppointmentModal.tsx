import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { CreateAppointmentRequest } from "../../services/appointment";
import { createAppointmentAction } from "../../context/actions";
import { Context } from "../../context";
import {
  SpecialtySelect,
  DoctorSelect,
  DoctorCalendar,
} from "../../components";

export const CreateAppointmentModal = () => {
  const { state, dispatch } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateAppointmentRequest>({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    specialityId: "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset form
    setFormData({
      patientId: "",
      doctorId: "",
      appointmentDate: "",
      specialityId: "",
    });
    setValidationErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};

    if (!formData.specialityId) {
      errors.specialityId = "Debe seleccionar una especialidad";
    }

    if (!formData.doctorId) {
      errors.doctorId = "Debe seleccionar un doctor";
    }

    if (!formData.appointmentDate) {
      errors.appointmentDate = "Debe seleccionar una fecha y hora";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const appointmentDataWithPatientId = {
      ...formData,
      patientId: state.data.user.id || "",
    };

    if (!appointmentDataWithPatientId.patientId) {
      setValidationErrors({
        general: "Error: No se pudo identificar al usuario",
      });
      return;
    }

    const success = await createAppointmentAction(
      dispatch,
      appointmentDataWithPatientId
    );

    if (success) {
      handleClose();
      setShowSuccessSnackbar(true);
    }
  };

  const isFormValid = () => {
    return (
      formData.specialityId && formData.doctorId && formData.appointmentDate
    );
  };

  const handleSpecialtyChange = (value: string) => {
    setFormData({
      ...formData,
      specialityId: value,
      doctorId: "",
      appointmentDate: "",
    });
    setValidationErrors((prev) => ({
      ...prev,
      specialityId: "",
      doctorId: "",
      appointmentDate: "",
    }));
  };

  const handleDoctorChange = (value: string) => {
    setFormData({ ...formData, doctorId: value, appointmentDate: "" });
    setValidationErrors((prev) => ({
      ...prev,
      doctorId: "",
      appointmentDate: "",
    }));
  };

  const handleDateChange = (value: string) => {
    setFormData({ ...formData, appointmentDate: value });
    setValidationErrors((prev) => ({ ...prev, appointmentDate: "" }));
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        style={{ marginTop: "10px" }}
      >
        Agendar Nueva Cita
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Agendar Nueva Cita</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {validationErrors.general && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {validationErrors.general}
                </Alert>
              )}
              <SpecialtySelect
                value={formData.specialityId}
                onChange={handleSpecialtyChange}
                required
                error={!!validationErrors.specialityId}
                helperText={validationErrors.specialityId}
              />
              <DoctorSelect
                value={formData.doctorId}
                onChange={handleDoctorChange}
                specialtyId={formData.specialityId}
                required
                error={!!validationErrors.doctorId}
                helperText={validationErrors.doctorId}
              />
              <DoctorCalendar
                value={formData?.appointmentDate}
                onChange={handleDateChange}
                doctorId={formData?.doctorId}
                required
                error={!!validationErrors?.appointmentDate}
                helperText={validationErrors?.appointmentDate}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid()}
            >
              Agendar Cita
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSuccessSnackbar(false)}
      >
        <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">
          Cita agendada exitosamente!
        </Alert>
      </Snackbar>
    </>
  );
};
