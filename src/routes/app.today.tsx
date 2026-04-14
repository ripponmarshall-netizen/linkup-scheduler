import { createFileRoute } from "@tanstack/react-router";
import { TodayDashboard } from "@/components/app/TodayDashboard";

export const Route = createFileRoute("/app/today")({
  head: () => ({
    meta: [
      { title: "Today — LinkupOrganiser" },
      { name: "description", content: "Your daily appointment schedule" },
    ],
  }),
  component: TodayDashboard,
});
