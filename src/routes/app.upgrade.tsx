import { createFileRoute } from "@tanstack/react-router";
import { UpgradeScreen } from "@/components/app/UpgradeScreen";

export const Route = createFileRoute("/app/upgrade")({
  component: UpgradeScreen,
});
