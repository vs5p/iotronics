import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";
import { useState, useEffect } from "react";

const achievements = [
  {
    title: "Smart India Hackathon 2024",
    position: "1st Place",
    description: "National-level hackathon win for our IoT-based healthcare monitoring solution",
    date: "December 2024",
    icon: <Trophy className="w-8 h-8" />,
    color: "text-accent",
    bgColor: "bg-accent/10 border-accent/30",
  },
  {
    title: "TechFest IoT Challenge",
    position: "2nd Place",
    description: "Runner-up for smart agriculture automation project at inter-college tech fest",
    date: "October 2024",
    icon: <Medal className="w-8 h-8" />,
    color: "text-secondary",
    bgColor: "bg-secondary/10 border-secondary/30",
  },
  {
    title: "IEEE Project Competition",
    position: "Best Innovation",
    description: "Recognized for innovative approach in our autonomous robot navigation system",
    date: "August 2024",
    icon: <Award className="w-8 h-8" />,
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/30",
  },
  {
    title: "National Robotics Championship",
    position: "3rd Place",
    description: "Bronze medal in national-level robotics competition for maze-solving robot",
    date: "June 2024",
    icon: <Medal className="w-8 h-8" />,
    color: "text-glow-green",
    bgColor: "bg-glow-green/10 border-glow-green/30",
  },
  {
    title: "Startup Weekend IoT",
    position: "Winner",
    description: "First place for smart home energy management startup concept",
    date: "April 2024",
    icon: <Trophy className="w-8 h-8" />,
    color: "text-accent",
    bgColor: "bg-accent/10 border-accent/30",
  },
  {
    title: "University Tech Award",
    position: "Best Club",
    description: "Recognized as the best technical club of the year for outstanding contributions",
    date: "March 2024",
    icon: <Star className="w-8 h-8" />,
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/30",
  },
  {
    title: "Embedded Systems Contest",
    position: "1st Place",
    description: "Won state-level embedded systems design competition with wearable health monitor",
    date: "January 2024",
    icon: <Trophy className="w-8 h-8" />,
    color: "text-accent",
    bgColor: "bg-accent/10 border-accent/30",
  },
  {
    title: "Hackathon XYZ 2023",
    position: "2nd Place",
    description: "Runner-up for environmental monitoring system at national hackathon",
    date: "November 2023",
    icon: <Medal className="w-8 h-8" />,
    color: "text-secondary",
    bgColor: "bg-secondary/10 border-secondary/30",
  },
];

const stats = [
  { value: "15+", label: "Awards Won" },
  { value: "8", label: "Hackathon Wins" },
  { value: "5", label: "National Recognitions" },
  { value: "3", label: "Best Club Awards" },
];

const Achievements = () => {
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Trophy className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm text-accent">ACHIEVEMENTS</span>
              </motion.div>

              <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
                Our <span className="text-accent">Achievements</span>
              </h1>

              <p className="font-rajdhani text-lg md:text-xl text-muted-foreground leading-relaxed">
                Celebrating the milestones, awards, and recognitions that showcase our 
                commitment to innovation and excellence in IoT.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-xl bg-card border border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, borderColor: "hsl(var(--primary))" }}
                >
                  <motion.div
                    className="font-orbitron text-4xl font-bold gradient-text mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="font-rajdhani text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Grid */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="card-circuit group relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border ${achievement.bgColor} ${achievement.color}`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      animate={{
                        boxShadow: [
                          "0 0 0px transparent",
                          "0 0 15px currentColor",
                          "0 0 0px transparent",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {achievement.icon}
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-mono uppercase border ${achievement.bgColor} ${achievement.color}`}>
                          {achievement.position}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                          <Calendar size={12} />
                          {achievement.date}
                        </span>
                      </div>
                      <h4 className="font-orbitron text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h4>
                      <p className="font-rajdhani text-muted-foreground text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <motion.div
                    className="absolute -right-20 -bottom-20 w-40 h-40 rounded-full opacity-5"
                    style={{
                      background: `radial-gradient(circle, currentColor, transparent 70%)`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default Achievements;
