import { motion } from "framer-motion";
import { Info, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";
import { useState, useEffect } from "react";
import logoImage from "@/assets/logo.png";

const timelineEvents = [
  {
    year: "2019",
    title: "Club Founded",
    description: "IoTRONICS was established by a group of passionate electronics enthusiasts with a vision to create a community for IoT innovation.",
  },
  {
    year: "2020",
    title: "First Major Project",
    description: "Launched our first large-scale project - Smart Attendance System using RFID and cloud integration.",
  },
  {
    year: "2021",
    title: "National Recognition",
    description: "Won first prize at the National IoT Challenge, bringing recognition to the club across universities.",
  },
  {
    year: "2022",
    title: "Lab Expansion",
    description: "Opened a dedicated IoT lab with advanced equipment including oscilloscopes, 3D printers, and soldering stations.",
  },
  {
    year: "2023",
    title: "Industry Partnerships",
    description: "Established partnerships with leading tech companies for internships and project collaborations.",
  },
  {
    year: "2024",
    title: "50+ Members Strong",
    description: "Grew to over 50 active members with multiple award-winning projects and a strong alumni network.",
  },
];

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen">
      <HangingBulb isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      <Navigation />
      <FloatingParticles />
      <CircuitBackground />

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Info className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-primary">ABOUT US</span>
              </motion.div>

              <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
                About <span className="gradient-text">IoTRONICS</span>
              </h1>

              <motion.div 
                className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden bg-background/50 flex items-center justify-center border-2 border-primary/30"
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(var(--primary) / 0.3)",
                    "0 0 40px hsl(var(--primary) / 0.5)",
                    "0 0 20px hsl(var(--primary) / 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img src={logoImage} alt="IoTRONICS Logo" className="w-24 h-24 object-contain" />
              </motion.div>

              <p className="font-rajdhani text-lg md:text-xl text-muted-foreground leading-relaxed">
                IoTRONICS is the premier Internet of Things club at our university, dedicated to fostering 
                innovation, collaboration, and hands-on learning in the exciting world of connected devices. 
                Founded in 2019, we've grown from a small group of enthusiasts to a thriving community of 
                makers, developers, and innovators.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                className="card-circuit"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-orbitron text-2xl font-bold mb-4 text-primary">Our Mission</h3>
                <p className="font-rajdhani text-muted-foreground leading-relaxed">
                  To create a collaborative environment where students can explore, learn, and innovate 
                  in the field of IoT. We aim to bridge the gap between theoretical knowledge and 
                  practical application through hands-on projects and industry exposure.
                </p>
              </motion.div>

              <motion.div
                className="card-circuit"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-orbitron text-2xl font-bold mb-4 text-secondary">Our Vision</h3>
                <p className="font-rajdhani text-muted-foreground leading-relaxed">
                  To become a leading student-run IoT organization that produces industry-ready 
                  professionals and contributes meaningful solutions to real-world problems through 
                  smart, connected technologies.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm text-accent">OUR JOURNEY</span>
              </motion.div>
              
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
                Club <span className="text-accent">Timeline</span>
              </h2>
            </motion.div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto relative">
              {/* Center line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Node */}
                  <motion.div
                    className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10"
                    animate={{
                      boxShadow: [
                        "0 0 0px hsl(var(--primary))",
                        "0 0 15px hsl(var(--primary))",
                        "0 0 0px hsl(var(--primary))",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                    <span className="font-orbitron text-2xl font-bold text-primary">{event.year}</span>
                    <h4 className="font-orbitron text-xl font-semibold mt-2 mb-2">{event.title}</h4>
                    <p className="font-rajdhani text-muted-foreground">{event.description}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border max-w-5xl mx-auto"
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
      </main>

      <PageFooter />
    </div>
  );
};

export default About;
