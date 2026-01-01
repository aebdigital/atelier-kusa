import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://atelierkusa.sk';

  // Static routes
  const routes = [
    '',
    '/projekty',
    '/kontakt',
    '/ochrana-osobnych-udajov',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic project routes
  let projectRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const filePath = path.join(process.cwd(), "public", "projects.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const projects = JSON.parse(jsonData);

    projectRoutes = projects.map((project: any) => ({
      url: `${baseUrl}/projekty/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error reading projects.json for sitemap:", error);
  }

  return [...routes, ...projectRoutes];
}
