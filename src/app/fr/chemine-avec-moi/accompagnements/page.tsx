import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page temporairement masquée",
  description: "Cette page AWENE est temporairement masquée.",
};

export default function Accompagnements() {
  notFound();
}
