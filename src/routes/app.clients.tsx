import { createFileRoute } from "@tanstack/react-router";
import { ClientsScreen } from "@/components/app/ClientsScreen";

export const Route = createFileRoute("/app/clients")({
  component: ClientsScreen,
});
