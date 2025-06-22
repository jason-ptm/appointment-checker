import { AppointmentListWithSidebar } from "./AppointmentListWithSidebar";
import { SidebarLayout } from "../../components/SidebarLayout";
import { CreateAppointmentModal } from "./CreateAppointmentModal";

export const AppointmentList = () => {
  return (
    <SidebarLayout title="Citas">
      <AppointmentListWithSidebar />
      <CreateAppointmentModal />
    </SidebarLayout>
  );
};
