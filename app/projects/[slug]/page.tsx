import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "../../components/ProjectGallery";

// Generate static params for all projects
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const projects = JSON.parse(jsonData);

  return projects.map((project: any) => ({
    slug: project.slug,
  }));
}

function getProject(slug: string) {
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const projects = JSON.parse(jsonData);
  return projects.find((p: any) => p.slug === slug);
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full">
      <div className="p-4 md:p-6">
        <Link href="/projects" className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-4 block">
          ← Späť na projekty
        </Link>
        <h1 className="text-3xl md:text-4xl font-light uppercase tracking-wide mb-6">{project.title}</h1>

        <div className="mb-8 text-sm text-gray-600 space-y-1">
          <p><span className="font-medium">Autor:</span></p>
          <p><span className="font-medium">Rok:</span></p>
          <p><span className="font-medium">....:</span></p>
        </div>

        <p className="text-gray-600 leading-relaxed mb-8 max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <ProjectGallery images={project.images} title={project.title} />
    </div>
  );
}
