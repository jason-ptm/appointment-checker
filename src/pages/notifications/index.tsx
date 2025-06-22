import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Chip,
  Divider,
  IconButton,
} from "@mui/material";
import { SidebarLayout } from "../../components/SidebarLayout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

export const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Cita Confirmada",
      message: "Tu cita con Dr. García para el 15 de enero ha sido confirmada.",
      type: "success",
      date: "2024-01-10T10:30:00",
      read: false,
    },
    {
      id: 2,
      title: "Recordatorio de Cita",
      message: "Tienes una cita mañana a las 14:30 con Dra. López.",
      type: "warning",
      date: "2024-01-09T16:45:00",
      read: true,
    },
    {
      id: 3,
      title: "Cita Cancelada",
      message:
        "Tu cita del 20 de enero ha sido cancelada. Contacta para reagendar.",
      type: "error",
      date: "2024-01-08T09:15:00",
      read: false,
    },
    {
      id: 4,
      title: "Nuevo Mensaje",
      message: "El Dr. Martínez ha enviado un mensaje sobre tu tratamiento.",
      type: "info",
      date: "2024-01-07T11:20:00",
      read: true,
    },
    {
      id: 5,
      title: "Resultados Disponibles",
      message: "Los resultados de tus análisis de sangre están disponibles.",
      type: "success",
      date: "2024-01-06T14:00:00",
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon color="success" />;
      case "warning":
        return <WarningIcon color="warning" />;
      case "error":
        return <WarningIcon color="error" />;
      case "info":
        return <InfoIcon color="info" />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Hace unos minutos";
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
    } else {
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <SidebarLayout title="Notificaciones">
      <Box>
        <Typography variant="h4" gutterBottom>
          Notificaciones
        </Typography>

        <Paper elevation={2}>
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6">
              Todas las notificaciones ({notifications.length})
            </Typography>
          </Box>

          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    backgroundColor: notification.read
                      ? "transparent"
                      : "action.hover",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="subtitle1" component="span">
                          {notification.title}
                        </Typography>
                        <Chip
                          label={notification.type.toUpperCase()}
                          size="small"
                          color={getNotificationColor(notification.type) as any}
                        />
                        {!notification.read && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              backgroundColor: "primary.main",
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(notification.date)}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </SidebarLayout>
  );
};
