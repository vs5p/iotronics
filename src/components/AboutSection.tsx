import { motion } from "framer-motion";
import { Cpu, Wifi, Lightbulb, Code, Cog, Zap } from "lucide-react";

const features = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Hardware Development",
    description: "Design and build IoT devices using Arduino, ESP32, Raspberry Pi, and custom PCBs.",
    color: "primary",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Software Integration",
    description: "Develop firmware, mobile apps, and cloud platforms to power smart devices.",
    color: "secondary",
  },
  {
    icon: <Wifi className="w-8 h-8" />,
    title: "Network & Connectivity",
    description: "Explore WiFi, Bluetooth, LoRa, and other protocols for seamless communication.",
    color: "accent",
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "Innovation Labs",
    description: "Experiment with cutting-edge technologies in our state-of-the-art lab space.",
    color: "primary",
  },
  {
    icon: <Cog className="w-8 h-8" />,
    title: "Workshops & Training",
    description: "Regular hands-on sessions to learn new skills and stay updated with trends.",
    color: "secondary",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Competitions",
    description: "Participate in hackathons, tech fests, and national-level competitions.",
    color: "accent",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, hsl(var(--secondary)) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Cpu className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary">ABOUT US</span>
          </motion.div>
          
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Building the <span className="gradient-text">Future</span> of IoT
          </h2>
          
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            IOTRONICS is a student-driven club dedicated to exploring the limitless
            possibilities of the Internet of Things. We combine creativity with
            technology to solve real-world problems.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="card-circuit group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-xl bg-${feature.color}/10 border border-${feature.color}/20 flex items-center justify-center mb-6 text-${feature.color} group-hover:border-${feature.color}/50 transition-colors`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <h3 className="font-orbitron text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="font-rajdhani text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative circuit corner */}
              <svg
                className="absolute bottom-4 right-4 w-12 h-12 text-border group-hover:text-primary/30 transition-colors"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M 48 32 L 32 32 L 32 48"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="32" cy="32" r="2" fill="currentColor" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2019", label: "Founded" },
              { value: "50+", label: "Active Members" },
              { value: "25+", label: "Projects Completed" },
              { value: "15+", label: "Awards Won" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="font-orbitron text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="font-rajdhani text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
