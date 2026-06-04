import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Page temporarily hidden",
  description: "This AWENE page is temporarily hidden.",
};

export default function ProgramsPage() {
  notFound();
}
