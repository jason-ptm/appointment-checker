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
import { fetchSpecialties } from "../context/actions";
import { useContext } from "../context/useContenxt";

interface SpecialtySelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const SpecialtySelect = ({
  value,
  onChange,
  label = "Especialidad",
  required = false,
  fullWidth = true,
  disabled = false,
  error = false,
}: SpecialtySelectProps) => {
  const { state, dispatch } = useContext();
  const {
    data: { specialties },
    isLoadingSpecialties,
  } = state;

  useEffect(() => {
    // Fetch specialties if not already loaded
    if (specialties.length === 0 && !isLoadingSpecialties) {
      fetchSpecialties(dispatch);
    }
  }, [dispatch, specialties?.length, isLoadingSpecialties]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  if (isLoadingSpecialties) {
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
          <em>Seleccionar especialidad</em>
        </MenuItem>
        {specialties?.map((specialty) => (
          <MenuItem key={specialty.id} value={specialty.id}>
            {specialty.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
