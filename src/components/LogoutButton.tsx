import React from "react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { logout } from "../context/actions/auth";
import { useContext } from "../context/useContenxt";

interface LogoutButtonProps {
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = "outlined",
  size = "medium",
  fullWidth = false,
  className,
}) => {
  const navigate = useNavigate();
  const { dispatch } = useContext();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      color="error"
    >
      Cerrar Sesión
    </Button>
  );
};
