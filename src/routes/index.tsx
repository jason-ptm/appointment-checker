import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { PrivateRoute } from "../components/PrivateRoute";
import { AppointmentList } from "../pages/appointment";
import { Dashboard } from "../pages/dashboard";
import { Notifications } from "../pages/notifications";
import { Login } from "../pages/login";
import { USER_TYPE } from "../utils/constants";
import { DoctorAppointmentsList } from "../components/DoctorAppointmentsList";

export const RouteWrapper = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute blackListTypes={[USER_TYPE.USER]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <AppointmentList />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-appointments"
          element={
            <PrivateRoute>
              <DoctorAppointmentsList />
            </PrivateRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
