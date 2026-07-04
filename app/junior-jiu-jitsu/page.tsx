import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { getLanding } from "@/lib/landing";

const data = getLanding("junior-jiu-jitsu")!;

export const metadata: Metadata = {
  title: data.meta.title,
  description: data.meta.description,
  keywords: data.meta.keywords,
  alternates: { canonical: `/${data.slug}` },
  openGraph: {
    title: data.meta.title,
    description: data.meta.description,
    url: `/${data.slug}`,
    type: "website",
    locale: "en_GB",
  },
};

export default function Page() {
  return <LandingPage data={data} />;
}
