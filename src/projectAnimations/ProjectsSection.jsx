import ShitbingoPreview from "./ShitbingoPreview"; // Pfad anpassen
import PasserbyCountPreview from "./PasserbyCountPreview.jsx";

// Beispiel-Daten für andere Projekte
const projects = [
  {
    id: 1,
    title: "NetWatch",
    description:
      "Contributing to NetWatch, a security project for making the internet a safer place.",
    tags: ["Python", "Security", "MISP"],
    link: "https://netwatch.de",
    image: "/Netwatch_Logo.webp",
    theme: "bg-blue-900",
  },
  {
    id: 2,
    title: "SpondBot",
    description:
      "A WebApp that automatically RSVPs to Spond Events for you. On Time. Every Time.",
    tags: ["Python", "Reverse Engineering", "PostgreSQL", "Docker"],
    link: "https://github.com/kargfel/spond-bot",
    image: "/spondbotlogo.webp",
    theme: "bg-blue-600",
  },
  {
    id: 3,
    title: "Shitbingo",
    description:
      "A humorous, accessible web app for meetings where too much is said – and too little gets done.",
    tags: ["ReactJS", "MongoDB", "TailwindCSS", "Python"],
    link: "https://shitbingo.de", // Optional
    // Hier nutzen wir die Custom Component statt eines Bildes
    component: <ShitbingoPreview />,
    theme: "bg-white",
  },
  {
    id: 4,
    title: "Passersby Würzburg",
    description: "Exploratory Data Analysis: Pedestrian Footfall in Würzburg.",
    tags: ["R", "LaTeX"],
    link: "https://github.com/kargfel/datascience-passeraby",
    component: <PasserbyCountPreview />,
    theme: "bg-neutral-900",
  },
];

const ProjectsSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-base" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              {/* Preview Area (Bild oder Component) */}
              <div className="h-64 w-full relative overflow-hidden bg-neutral-100 border-b border-neutral-100">
                {project.component ? (
                  // Rendert die Animation, wenn vorhanden
                  <div className="w-full h-full">{project.component}</div>
                ) : (
                  // Fallback auf Standardbild mit leichtem Zoom-Effekt
                  <img
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-neutral-500 text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-neutral-900 hover:gap-2 transition-all"
                    aria-label={`View ${project.title} project`}
                  >
                    View Project
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
