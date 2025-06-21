import { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  CircularProgress,
  Box,
} from "@mui/material";
import { fetchDoctorsBySpecialty } from "../context/actions";
import { useContext } from "../context/useContenxt";

interface DoctorSelectProps {
  value: string;
  onChange: (value: string) => void;
  specialtyId: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const DoctorSelect = ({
  value,
  onChange,
  specialtyId,
  label = "Doctor",
  required = false,
  fullWidth = true,
  disabled = false,
  error = false,
}: DoctorSelectProps) => {
  const { state, dispatch } = useContext();
  const {
    data: { doctors },
    isLoadingDoctors,
  } = state;

  useEffect(() => {
    console.log("🚀 ~ doctors:", doctors);
    if (specialtyId && specialtyId.trim() !== "") {
      fetchDoctorsBySpecialty(dispatch, specialtyId);
    }
  }, [dispatch, specialtyId]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  if (!specialtyId || specialtyId.trim() === "") {
    return (
      <FormControl
        fullWidth={fullWidth}
        required={required}
        disabled={true}
        error={error}
      >
        <InputLabel>{label}</InputLabel>
        <Select value="" label={label} onChange={handleChange} variant="filled">
          <MenuItem value="">
            <em>Seleccione una especialidad primero</em>
          </MenuItem>
        </Select>
      </FormControl>
    );
  }

  if (isLoadingDoctors) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={56}
      >
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={error}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        variant="filled"
      >
        <MenuItem value="">
          <em>Seleccionar doctor</em>
        </MenuItem>
        {doctors.map((doctor) => (
          <MenuItem key={doctor.id} value={doctor.id}>
            {doctor.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
