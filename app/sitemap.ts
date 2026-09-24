import type { MetadataRoute } from "next";
import { getAllLessons, getModules, getQuizzes, lessonHref } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/learn", "/dashboard", "/challenges", "/achievements", "/resources", "/references", "/about"];
  const paths = [
    ...staticPaths,
    ...getModules().map((module) => `/learn/${module.id}`),
    ...getAllLessons().map(lessonHref),
    ...getQuizzes().map((quiz) => `/challenges/${quiz.id}`),
  ];
  return paths.map((path) => ({ url: `${SITE.url}${path}` }));
}
