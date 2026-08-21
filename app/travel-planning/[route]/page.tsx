import { notFound } from "next/navigation";
import { featuredPlanIds, getFeaturedPlan } from "@/lib/featured-travel-plans";
import { travelRoutes } from "@/lib/travel-planning-routes";
import { FeaturedPlanClient } from "./FeaturedPlanClient";
import { RouteDetailClient } from "./RouteDetailClient";

export function generateStaticParams() {
  return [...travelRoutes.map((route) => route.id), ...featuredPlanIds].map((route) => ({ route }));
}

export default async function TravelRoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route } = await params;
  const featuredPlan = getFeaturedPlan(route);
  if (featuredPlan) return <FeaturedPlanClient plan={featuredPlan} />;
  if (!travelRoutes.some((item) => item.id === route)) notFound();
  return <RouteDetailClient routeId={route} />;
}
