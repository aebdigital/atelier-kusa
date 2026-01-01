import Link from "next/link";
import fs from "fs";
import path from "path";

function getProjects() {
  const filePath = path.join(process.cwd(), "public", "projects.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
}

export default function Projects() {
  const projects = getProjects();

  return (
    <div className="p-4 md:p-12 lg:p-16">
      <h1 className="text-3xl font-light mb-12 uppercase tracking-widest">Projekty</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5px]">
        {projects.map((project: any) => (
          <Link href={`/projects/${project.slug}`} key={project.slug} className="group block">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
               {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
              )}
              {/* Title overlay with blur */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <div className="bg-white/30 backdrop-blur-md px-3 py-2">
                  <h2 className="text-sm font-medium uppercase tracking-widest text-white group-hover:text-gray-200 transition-colors">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
