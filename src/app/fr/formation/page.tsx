import { notFound } from "next/navigation";
import {
  generateFrenchFormationMetadata,
  renderFrenchFormationPage,
} from "@/lib/routing/french-formation-page";

type FrenchFormationRouteProps = {
  searchParams: Promise<{ slug?: string }>;
};

export async function generateMetadata({
  searchParams,
}: FrenchFormationRouteProps) {
  const { slug } = await searchParams;

  if (!slug) {
    return {};
  }

  return generateFrenchFormationMetadata(slug);
}

export default async function FrenchFormationRoute({
  searchParams,
}: FrenchFormationRouteProps) {
  const { slug } = await searchParams;

  if (!slug) {
    notFound();
  }

  return renderFrenchFormationPage(slug);
}
