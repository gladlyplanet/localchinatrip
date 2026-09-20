import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { featuredPlanIds, getFeaturedPlan, getPlanText } from "@/lib/featured-travel-plans";
import { getCityName, travelRoutes, type TravelRoute } from "@/lib/travel-planning-routes";
import { breadcrumbSchema, createMetadata, serviceSchema } from "@/lib/seo";
import { FeaturedPlanClient } from "./FeaturedPlanClient";
import { RouteDetailClient } from "./RouteDetailClient";

function routePlaces(route: TravelRoute) {
  return route.stops.map((city) => getCityName(city, "en"));
}

function routeTitle(route: TravelRoute) {
  const places = routePlaces(route);
  const coreRoute = places.length <= 3
    ? places.length === 1 ? places[0] : `${places.slice(0, -1).join(", ")} & ${places.at(-1)}`
    : `${places[0]} to ${places.at(-1)}`;
  return `${route.duration}-Day ${coreRoute} Private China Tour | Local China Trip`;
}

export function generateStaticParams() {
  return [...travelRoutes.map((route) => route.id), ...featuredPlanIds].map((route) => ({ route }));
}

export async function generateMetadata({ params }: { params: Promise<{ route: string }> }): Promise<Metadata> {
  const { route: routeId } = await params;
  const featuredPlan = getFeaturedPlan(routeId);
  if (featuredPlan) {
    const featuredTitle = featuredPlan.id === "china-culture-7"
      ? "7-Day Beijing, Suzhou & Shanghai Private China Tour"
      : "14-Day Sanya Wellness Stay";
    const featuredDescription = featuredPlan.id === "sanya-wellness-14"
      ? "A slow private Sanya stay with one seaside base, professional assessment, individually selected wellness sessions and genuine rest."
      : getPlanText(featuredPlan.summary, "en");
    return createMetadata({
      title: `${featuredTitle} | Local China Trip`,
      description: featuredDescription,
      path: `/travel-planning/${featuredPlan.id}`,
      image: featuredPlan.heroImage,
    });
  }
  const route = travelRoutes.find((item) => item.id === routeId);
  if (!route) return {};
  const places = routePlaces(route);
  const routeDescription = places.length <= 4
    ? `Compare a ${route.duration}-day private China route through ${places.join(", ")}, with flexible pacing and room to adapt the itinerary around your interests.`
    : `Compare a ${route.duration}-day private China route from ${places[0]} to ${places.at(-1)}, with selected stops, flexible pacing and room to adapt it around your interests.`;
  return createMetadata({
    title: routeTitle(route),
    description: routeDescription,
    path: `/travel-planning/${route.id}`,
    image: route.image,
  });
}

export default async function TravelRoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route } = await params;
  const featuredPlan = getFeaturedPlan(route);
  if (featuredPlan) {
    const path = `/travel-planning/${featuredPlan.id}`;
    const name = getPlanText(featuredPlan.cardTitle, "en");
    const description = getPlanText(featuredPlan.summary, "en");
    return (
      <>
        <StructuredData data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Travel Planning", path: "/travel-planning" },
            { name, path },
          ]),
          serviceSchema({ name, description, path }),
        ]} />
        <FeaturedPlanClient plan={featuredPlan} />
      </>
    );
  }
  const routePlan = travelRoutes.find((item) => item.id === route);
  if (!routePlan) notFound();
  const path = `/travel-planning/${routePlan.id}`;
  const name = `${routePlan.duration}-day ${routePlaces(routePlan).join(" – ")} private China route`;
  return (
    <>
      <StructuredData data={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Travel Planning", path: "/travel-planning" },
          { name, path },
        ]),
        serviceSchema({ name, description: `A flexible private itinerary through ${routePlaces(routePlan).join(", ")}.`, path }),
      ]} />
      <RouteDetailClient routeId={route} />
    </>
  );
}
