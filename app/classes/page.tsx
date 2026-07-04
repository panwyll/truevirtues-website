import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Programs from "@/components/Programs";
import Timetable from "@/components/Timetable";

export const metadata: Metadata = {
  title: "BJJ Classes in Wimbledon | Gi, No-Gi, Women's & Kids",
  description:
    "All Brazilian Jiu Jitsu classes at True Virtues Wimbledon: adult Gi and No-Gi, women-only and juniors (8–15). Beginner-friendly, black belt coaching at YMCA Wimbledon, SW19.",
  alternates: { canonical: "/classes" },
};

export default function Page() {
  return (
    <PageShell
      title="Our Classes"
      intro="Four programmes for every level and goal — all beginner-friendly, all coached by a black belt at YMCA Wimbledon."
    >
      <Programs />
      <Timetable />
    </PageShell>
  );
}
