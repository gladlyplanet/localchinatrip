import type { MetadataRoute } from "next";
import { experienceThemes } from "@/lib/experience-themes";
import { featuredPlanIds } from "@/lib/featured-travel-plans";
import { provinces } from "@/lib/provinces";
import { getProvinceRecommendations, recommendationSlug } from "@/lib/province-recommendations";
import { absoluteUrl } from "@/lib/seo";
import { travelRoutes } from "@/lib/travel-planning-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about",
    "/china-travel-services",
    "/contact",
    "/destinations",
    "/experiences",
    "/faq-for-foreign-travelers",
    "/guides/7-days-in-china",
    "/guides/china-with-older-parents",
    "/guides/do-you-need-a-tour-guide-in-china",
    "/guides/private-china-tour-cost",
    "/private-car",
    "/travel-planning",
  ];

  const destinationPaths = provinces.flatMap((province) => [
    `/destinations/${province.slug}`,
    ...getProvinceRecommendations(province.slug).map(
      (attraction) => `/destinations/${province.slug}/${recommendationSlug(attraction)}`,
    ),
  ]);
  const experiencePaths = experienceThemes.map((experience) => `/experiences/${experience.slug}`);
  const routePaths = [
    ...travelRoutes.map((route) => `/travel-planning/${route.id}`),
    ...featuredPlanIds.map((route) => `/travel-planning/${route}`),
  ];

  return [...new Set([...staticPaths, ...destinationPaths, ...experiencePaths, ...routePaths])].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 3 ? 0.8 : 0.7,
  }));
}
