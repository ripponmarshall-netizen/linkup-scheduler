import { createFileRoute } from "@tanstack/react-router";
import { AppointmentsScreen } from "@/components/app/AppointmentsScreen";

export const Route = createFileRoute("/app/appointments")({
  component: AppointmentsScreen,
});
