import { createFileRoute } from "@tanstack/react-router";
import { BookingPage } from "@/components/booking/BookingPage";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — LinkupOrganiser" },
      { name: "description", content: "Book your appointment online" },
    ],
  }),
  component: BookingPage,
});
