import { notFound } from "next/navigation";
import {
  generateFrenchFormationMetadata,
  renderFrenchFormationPage,
} from "@/lib/routing/french-formation-page";

type EnglishFormationRouteProps = {
  searchParams: Promise<{ slug?: string }>;
};

export async function generateMetadata({
  searchParams,
}: EnglishFormationRouteProps) {
  const { slug } = await searchParams;

  if (!slug) {
    return {};
  }

  return generateFrenchFormationMetadata(slug);
}

export default async function EnglishFormationRoute({
  searchParams,
}: EnglishFormationRouteProps) {
  const { slug } = await searchParams;

  if (!slug) {
    notFound();
  }

  return renderFrenchFormationPage(slug);
}
