import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppBottomNav } from "@/components/app/AppBottomNav";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Outlet />
      <AppBottomNav />
    </div>
  );
}
