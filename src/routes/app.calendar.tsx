import { createFileRoute } from "@tanstack/react-router";
import { CalendarScreen } from "@/components/app/CalendarScreen";

export const Route = createFileRoute("/app/calendar")({
  component: CalendarScreen,
});
