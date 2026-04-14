import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsScreen } from "@/components/app/AnalyticsScreen";

export const Route = createFileRoute("/app/analytics")({
  component: AnalyticsScreen,
});
