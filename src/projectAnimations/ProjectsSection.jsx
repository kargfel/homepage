import ShitbingoPreview from './shitBingoPreview'; // Pfad anpassen

// Beispiel-Daten für andere Projekte
const projects = [
  {
    id: 1,
    title: "Shitbingo",
    description: "A humorous, accessible web app for meetings where too much is said – and too little gets done.",
    tags: ["ReactJS", "MongoDB", "TailwindCSS", "Python"],
    link: "https://shitbingo.de", // Optional
    // Hier nutzen wir die Custom Component statt eines Bildes
    component: <ShitbingoPreview />, 
    theme: "bg-white" 
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description: "Modernes Dashboard zur Verwaltung von Produkten und Bestellungen mit Echtzeit-Daten.",
    tags: ["Next.js", "Tailwind", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    theme: "bg-neutral-900"
  },
  {
    id: 3,
    title: "Weather App",
    description: "Minimalistische Wetter-Vorhersage basierend auf der aktuellen Geolocation.",
    tags: ["API Integration", "CSS Grid", "PWA"],
    image: "https://images.unsplash.com/photo-1592210454132-328629affb12?auto=format&fit=crop&q=80&w=800",
    theme: "bg-blue-900"
  },
  {
    id: 4,
    title: "Weather App",
    description: "Minimalistische Wetter-Vorhersage basierend auf der aktuellen Geolocation.",
    tags: ["API Integration", "CSS Grid", "PWA"],
    image: "https://images.unsplash.com/photo-1592210454132-328629affb12?auto=format&fit=crop&q=80&w=800",
    theme: "bg-blue-900"
  }
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
                  <div className="w-full h-full">
                    {project.component}
                  </div>
                ) : (
                  // Fallback auf Standardbild mit leichtem Zoom-Effekt
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full">
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
                 >
                   Projekt ansehen
                   <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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