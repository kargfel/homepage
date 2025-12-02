import { useState, useEffect } from "react";
import ProjectsSection from "../projectAnimations/ProjectsSection";

export const Home = () => {
  // 1. Initialize state
  const [theme, setTheme] = useState("light");

  // 2. Effect to check localStorage or system preference on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 3. Toggle Function
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="w-full px-4 md:w-[1000px] m-auto jetbrains-mono-300">
      <section className="mt-10 HeroSection">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4 justify-center mb-4">
          <div className="w-48 h-48 rounded-full object-cover md:h-auto md:w-auto overflow-hidden">
            <img src="/me.png" alt="Thats me" width={600} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-left">Felix Karg</h1>
            <p className="mt-2 text-lg text-primary">
              Informatics Student at DHBW Stuttgart
            </p>
            
            {/* Social Links + Theme Switcher Container */}
            <div className="mt-4 flex justify-center md:justify-start items-center gap-4">
              {/* GitHub */}
              <a href="https://www.github.com/kargfel" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github w-6 h-6"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/felix-karg-48b525290" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin w-6 h-6"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              {/* THEME TOGGLE SWITCH */}
              <button 
                onClick={toggleTheme} 
                className="hover:opacity-70 transition-opacity focus:outline-none cursor-pointer"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? (
                   /* If Dark, show the Lamp (to switch to Light) */
                   <svg 
                     width="24" 
                     height="24" 
                     viewBox="0 0 24 24" 
                     fill="none" 
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6"
                   >
                    <path d="M10 22H14M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9C19 11.3787 17.8135 13.4694 16 14.7344L15.4582 17.3004C15.3097 18.2778 14.4695 19 13.4809 19H10.5191C9.53052 19 8.69027 18.2778 8.54177 17.3004L8 14.7453C6.18652 13.4804 5 11.3787 5 9Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path d="M8 15H16" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                   </svg>
                ) : (
                   /* If Light, show the Moon/Face (to switch to Dark) */
                   <svg 
                     fill="currentColor" 
                     width="24" 
                     height="24" 
                     viewBox="0 0 52 52" 
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-6 h-6"
                    >
                      <path d="M24.12,2.69A16.11,16.11,0,0,0,9.69,17a15.9,15.9,0,0,0,5.85,13.65,4.92,4.92,0,0,1,1.87,3.82v.08a4,4,0,0,0,4.05,4h9a4,4,0,0,0,4.05-4v-.08a4.92,4.92,0,0,1,1.87-3.82,15.88,15.88,0,0,0,5.93-12.24C42.36,9.09,34,1.68,24.12,2.69ZM33,43.16H19a1.56,1.56,0,0,0-1.56,1.56,4.69,4.69,0,0,0,4.68,4.68h7.8a4.69,4.69,0,0,0,4.68-4.68A1.56,1.56,0,0,0,33,43.16Z"/>
                   </svg>
                )}
              </button>

            </div>
          </div>
        </div>
      </section>

      <section className="AboutSection">
        <div>
          <h2 className=" text-2xl mb-4">About Me</h2>
          <p>
            Hello! I&apos;m Felix Karg, an informatics student at DHBW Stuttgart. I&apos;m interested in various fields of computer science, especially cybersecurity.
          </p>
        </div>
      </section>

      <section className="mt-10 ProjectsSection">
        <h2 className="text-2xl mb-4 md:text-left">Projects</h2>
        <ProjectsSection />
      </section>
    </div>
  );
};