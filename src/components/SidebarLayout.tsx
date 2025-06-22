import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../context/actions/auth";
import { useContext } from "../context/useContenxt";
import { USER_TYPE } from "../utils/constants";
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
  const { state, dispatch } = useContext();
  const { user } = state.data;

  const handleLogout = () => {
    logout(dispatch);
    navigate("/login");
  };

  const sidebarItems = [
    // Only show dashboard to users who are not of type "USER"
    ...(user.type !== USER_TYPE.USER
      ? [
          {
            text: "Dashboard",
            icon: <DashboardIcon />,
            onClick: () => navigate("/dashboard"),
            active: location.pathname === "/dashboard",
          },
        ]
      : []),
    // Only show appointments to users who are not of type "USER"
    ...(user.type === USER_TYPE.USER
      ? [
          {
            text: "Citas",
            icon: <CalendarTodayIcon />,
            onClick: () => navigate("/appointments"),
            active: location.pathname === "/appointments",
          },
        ]
      : []),
    ...(user.type === USER_TYPE.DOCTOR
      ? [
          {
            text: "Mis Citas",
            icon: <CalendarTodayIcon />,
            onClick: () => navigate("/my-appointments"),
            active: location.pathname === "/my-appointments",
          },
        ]
      : []),
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
