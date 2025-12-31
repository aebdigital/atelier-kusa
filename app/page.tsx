import fs from "fs";
import path from "path";
import HeroSlider from "./components/HeroSlider";

// Function to get projects
function getProjects() {
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export default function Home() {
  const allProjects = getProjects();
  // Select high quality landscape images for the slider
  // Filtering for projects that have good thumbnails or first images
  const slides = allProjects.slice(0, 5).map((p: any) => ({
    title: p.title,
    slug: p.slug,
    image: p.thumbnail || p.images[0]
  }));

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      <HeroSlider slides={slides} />
    </div>
  );
}