import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { homeMetadata } from "@/lib/metadata";

export const metadata: Metadata = homeMetadata("fr");

export default function Home() {
  return <HomePage locale="fr" />;
}
