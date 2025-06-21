import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../context/actions/auth";
import { useContext } from "../context/useContenxt";
import { Sidebar } from "./Sidebar";

interface SidebarLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  title = "Appointment Checker",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext();

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  const sidebarItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => navigate("/dashboard"),
      active: location.pathname === "/dashboard",
    },
    {
      text: "Citas",
      icon: <CalendarTodayIcon />,
      onClick: () => navigate("/appointments"),
      active: location.pathname === "/appointments",
    },
    {
      text: "Notificaciones",
      icon: <NotificationsIcon />,
      onClick: () => navigate("/notifications"),
      active: location.pathname === "/notifications",
    },
    {
      text: "Cerrar Sesión",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  return (
    <Sidebar title={title} items={sidebarItems}>
      {children}
    </Sidebar>
  );
};
