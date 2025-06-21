import React from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography, Box } from "@mui/material";
import { logout } from "../context/actions/auth";
import { useContext } from "../context/useContenxt";

interface SidebarExampleProps {
  children: React.ReactNode;
}

export const SidebarExample: React.FC<SidebarExampleProps> = ({ children }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  const sidebarItems = [
    {
      text: "Citas",
      icon: <CalendarTodayIcon />,
      onClick: () => navigate("/appointments"),
    },
    {
      text: "Perfil",
      icon: <PersonIcon />,
      onClick: () => navigate("/profile"),
    },
    {
      text: "Configuración",
      icon: <SettingsIcon />,
      onClick: () => navigate("/settings"),
    },
    {
      text: "Cerrar Sesión",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  return (
    <Sidebar title="Appointment Checker" items={sidebarItems}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido
        </Typography>
        <Typography variant="body1" paragraph>
          Este es el contenido principal de tu aplicación. Aquí puedes mostrar
          cualquier componente o página que necesites.
        </Typography>
        {children}
      </Box>
    </Sidebar>
  );
};
