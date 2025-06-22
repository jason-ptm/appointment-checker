import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import { SidebarLayout } from "../../components/SidebarLayout";
import { useContext } from "../../context/useContenxt";
import { fetchDashboardData } from "../../context/actions";

export const Dashboard = () => {
  const { state, dispatch } = useContext();
  const { dashboard } = state.data;
  const { user } = state.data;
  const { isLoadingDashboard, error } = state;

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData(dispatch, user.id);
    }
  }, [dispatch, user?.id]);

  const stats = [
    {
      title: "Citas Totales",
      value: dashboard?.totalAppointments?.toString() || "0",
      icon: <CalendarTodayIcon sx={{ fontSize: 40, color: "primary.main" }} />,
      color: "#1976d2",
    },
    {
      title: "Citas Pendientes",
      value: dashboard?.pendingAppointments?.toString() || "0",
      icon: <NotificationsIcon sx={{ fontSize: 40, color: "warning.main" }} />,
      color: "#ed6c02",
    },
    {
      title: "Citas Completadas",
      value: dashboard?.completedAppointments?.toString() || "0",
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: "success.main" }} />,
      color: "#2e7d32",
    },
    {
      title: "Citas Confirmadas",
      value: dashboard?.confirmedAppointments?.length?.toString() || "0",
      icon: <PersonIcon sx={{ fontSize: 40, color: "info.main" }} />,
      color: "#0288d1",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("es-ES"),
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  if (isLoadingDashboard) {
    return (
      <SidebarLayout title="Dashboard">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      </SidebarLayout>
    );
  }

  if (error.message) {
    return (
      <SidebarLayout title="Dashboard">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout title="Dashboard">
      <Box>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Estadísticas */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            mb: 4,
          }}
        >
          {stats.map((stat, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                borderLeft: `4px solid ${stat.color}`,
                minWidth: 200,
                flex: "1 1 200px",
              }}
            >
              <Box sx={{ mr: 2 }}>{stat.icon}</Box>
              <Box>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Citas Confirmadas */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Paper elevation={2} sx={{ flex: "2 1 600px" }}>
            <CardHeader
              title="Citas Confirmadas"
              subheader={`${
                dashboard?.confirmedAppointments?.length || 0
              } citas confirmadas`}
            />
            <CardContent>
              {dashboard?.confirmedAppointments &&
              dashboard.confirmedAppointments.length > 0 ? (
                dashboard.confirmedAppointments.map((appointment) => {
                  const { date, time } = formatDate(
                    appointment.appointmentDate
                  );
                  return (
                    <Box
                      key={appointment.id}
                      sx={{
                        p: 2,
                        mb: 2,
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" component="div">
                          {appointment.patient.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {appointment.speciality.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {date} - {time}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "success.main",
                            fontWeight: "bold",
                          }}
                        >
                          Confirmada
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  No hay citas confirmadas
                </Typography>
              )}
            </CardContent>
          </Paper>
        </Box>
      </Box>
    </SidebarLayout>
  );
};
