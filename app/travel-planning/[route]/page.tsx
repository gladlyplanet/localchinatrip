import { notFound } from "next/navigation";
import { travelRoutes } from "@/lib/travel-planning-routes";
import { RouteDetailClient } from "./RouteDetailClient";

export function generateStaticParams() {
  return travelRoutes.map((route) => ({ route: route.id }));
}

export default async function TravelRoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route } = await params;
  if (!travelRoutes.some((item) => item.id === route)) notFound();
  return <RouteDetailClient routeId={route} />;
}
