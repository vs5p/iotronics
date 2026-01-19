import { motion } from "framer-motion";
import { ExternalLink, Github, Lightbulb, Cpu, Thermometer, Home, Car, Heart, Wifi, Database, Cloud, Shield, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { getProjects, supabase } from "@/lib/supabase";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-6 h-6" />,
  Thermometer: <Thermometer className="w-6 h-6" />,
  Car: <Car className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Wifi: <Wifi className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Settings: <Settings className="w-6 h-6" />,
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        // Limit to first 4 projects for homepage
        setProjects(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('projects_section_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          loadProjects();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-32 relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-gray-400 text-xl py-12">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-muted/30">
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-bg" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 50 L 40 50 L 50 40 L 60 50 L 100 50" stroke="currentColor" fill="none" strokeWidth="0.5" />
              <circle cx="40" cy="50" r="3" fill="currentColor" />
              <circle cx="60" cy="50" r="3" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-bg)" className="text-foreground" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Lightbulb className="w-4 h-4 text-secondary" />
            <span className="font-mono text-sm text-secondary">OUR PROJECTS</span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Innovation in <span className="text-secondary">Action</span>
          </h2>

          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to creation, our projects showcase the power of IoT technology
            in solving real-world challenges.
          </p>
        </motion.div>

        {/* Projects grid */}
        {projects.length === 0 ? (
          <div className="text-center text-gray-400 text-xl py-12">No projects yet. Check back soon!</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Project image/gradient header */}
                <div className="h-48 relative overflow-hidden">
                  {/* Background image */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {/* Gradient overlay - STATIC GRADIENT FIX */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-60"
                  />
                  {/* Overlay pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {[...Array(10)].map((_, i) => (
                        <motion.line
                          key={i}
                          x1={i * 10}
                          y1="0"
                          x2={i * 10}
                          y2="100"
                          stroke="white"
                          strokeWidth="0.5"
                          strokeDasharray="5 5"
                          animate={{
                            strokeDashoffset: [0, -10],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {project.icon}
                  </motion.div>

                  {/* Status badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-semibold ${project.status === "Completed"
                        ? "bg-glow-green/20 text-glow-green border border-glow-green/30"
                        : "bg-accent/20 text-accent border border-accent/30"
                      }`}
                  >
                    {project.status}
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto"
                  >
                    {project.website_url && (
                      <a
                        href={project.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform pointer-events-auto"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-xl bg-muted text-foreground flex items-center justify-center cursor-pointer hover:scale-110 transition-transform pointer-events-auto"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-rajdhani text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-mono bg-muted text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom circuit decoration */}
                <svg className="absolute bottom-0 left-0 right-0 h-1">
                  <motion.rect
                    width="100%"
                    height="100%"
                    fill="hsl(var(--primary))"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                    style={{ transformOrigin: "left" }}
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        )}

        {/* View all button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/projects"
            className="btn-circuit inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
