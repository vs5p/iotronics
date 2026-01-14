import { motion } from "framer-motion";
import { Users, Linkedin, Github, Twitter, Code, Cpu, Megaphone, PenTool, Wrench } from "lucide-react";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";
import { useState, useEffect } from "react";

interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  avatar: string;
}

interface TeamGroup {
  name: string;
  icon: React.ReactNode;
  color: string;
  members: TeamMember[];
}

const leadership: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "President",
    specialization: "Embedded Systems & IoT Architecture",
    avatar: "AC",
  },
  {
    name: "Sarah Williams",
    role: "Vice President",
    specialization: "Software Development & Cloud",
    avatar: "SW",
  },
];

const teams: TeamGroup[] = [
  {
    name: "Coding Team",
    icon: <Code size={20} />,
    color: "primary",
    members: [
      { name: "David Kim", role: "Lead Developer", specialization: "Full Stack Development", avatar: "DK" },
      { name: "Priya Sharma", role: "Backend Developer", specialization: "APIs & Databases", avatar: "PS" },
      { name: "Jake Morrison", role: "Frontend Developer", specialization: "React & UI/UX", avatar: "JM" },
    ],
  },
  {
    name: "Tech Team",
    icon: <Cpu size={20} />,
    color: "secondary",
    members: [
      { name: "Raj Patel", role: "Technical Lead", specialization: "IoT Architecture", avatar: "RP" },
      { name: "Michael Lee", role: "Hardware Engineer", specialization: "Embedded Systems", avatar: "ML" },
      { name: "Emma Johnson", role: "Research Head", specialization: "Machine Learning", avatar: "EJ" },
    ],
  },
  {
    name: "PR Team",
    icon: <Megaphone size={20} />,
    color: "accent",
    members: [
      { name: "Lisa Wang", role: "PR Head", specialization: "Communications", avatar: "LW" },
      { name: "Tom Bradley", role: "Social Media Manager", specialization: "Content Strategy", avatar: "TB" },
    ],
  },
  {
    name: "Design Team",
    icon: <PenTool size={20} />,
    color: "glow-green",
    members: [
      { name: "Nina Rodriguez", role: "Design Lead", specialization: "UI/UX Design", avatar: "NR" },
      { name: "Chris Park", role: "Graphic Designer", specialization: "Visual Identity", avatar: "CP" },
    ],
  },
  {
    name: "Operations Team",
    icon: <Wrench size={20} />,
    color: "primary",
    members: [
      { name: "Amy Foster", role: "Events Coordinator", specialization: "Event Management", avatar: "AF" },
      { name: "Ryan Smith", role: "Logistics Head", specialization: "Resource Management", avatar: "RS" },
    ],
  },
];

const MemberCard = ({ member, index, color = "primary" }: { member: TeamMember; index: number; color?: string }) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="card-circuit text-center">
      {/* Avatar */}
      <motion.div
        className="relative w-20 h-20 mx-auto mb-4"
        whileHover={{ scale: 1.1 }}
      >
        {/* Rotating ring */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={`hsl(var(--${color}))`}
            strokeWidth="1"
            strokeDasharray="10 5"
            fill="none"
            className="opacity-50 group-hover:opacity-100 transition-opacity"
          />
        </motion.svg>

        {/* Avatar circle */}
        <div className={`absolute inset-2 rounded-full bg-gradient-to-br from-${color}/20 to-accent/20 border-2 border-${color}/30 flex items-center justify-center group-hover:border-${color} transition-colors`}>
          <span className="font-orbitron text-xl font-bold gradient-text">
            {member.avatar}
          </span>
        </div>

        {/* Connection nodes */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={angle}
            className={`absolute w-1.5 h-1.5 rounded-full bg-${color}`}
            style={{
              top: `${50 + 45 * Math.sin((angle * Math.PI) / 180)}%`,
              left: `${50 + 45 * Math.cos((angle * Math.PI) / 180)}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: angle / 360,
            }}
          />
        ))}
      </motion.div>

      {/* Info */}
      <h3 className="font-orbitron text-base font-semibold mb-1 group-hover:text-primary transition-colors">
        {member.name}
      </h3>
      <p className="font-rajdhani text-primary font-medium text-sm mb-1">
        {member.role}
      </p>
      <p className="font-mono text-xs text-muted-foreground mb-4">
        {member.specialization}
      </p>

      {/* Social links */}
      <div className="flex justify-center gap-2">
        {[Linkedin, Github, Twitter].map((Icon, i) => (
          <motion.button
            key={i}
            className="w-7 h-7 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={12} />
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

const Team = () => {
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
        <section className="py-16 relative overflow-hidden">
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
                <Users className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm text-accent">OUR TEAM</span>
              </motion.div>

              <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
                Meet the <span className="text-accent">Innovators</span>
              </h1>

              <p className="font-rajdhani text-lg md:text-xl text-muted-foreground leading-relaxed">
                A passionate group of students driving innovation and pushing the boundaries
                of what's possible with IoT technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-2">
                <span className="gradient-text">Leadership</span>
              </h2>
              <p className="font-rajdhani text-muted-foreground">Guiding IoTRONICS towards innovation</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {leadership.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="card-circuit text-center p-8 border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
                    {/* Large Avatar */}
                    <motion.div
                      className="relative w-28 h-28 mx-auto mb-6"
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Rotating ring */}
                      <motion.svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          stroke="hsl(var(--accent))"
                          strokeWidth="2"
                          strokeDasharray="15 5"
                          fill="none"
                          className="opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      </motion.svg>

                      {/* Second rotating ring */}
                      <motion.svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1"
                          strokeDasharray="8 8"
                          fill="none"
                          className="opacity-50"
                        />
                      </motion.svg>

                      {/* Avatar circle */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-accent/50 flex items-center justify-center group-hover:border-accent transition-colors">
                        <span className="font-orbitron text-3xl font-bold gradient-text">
                          {member.avatar}
                        </span>
                      </div>

                      {/* Connection nodes */}
                      {[0, 60, 120, 180, 240, 300].map((angle) => (
                        <motion.div
                          key={angle}
                          className="absolute w-2 h-2 rounded-full bg-accent"
                          style={{
                            top: `${50 + 45 * Math.sin((angle * Math.PI) / 180)}%`,
                            left: `${50 + 45 * Math.cos((angle * Math.PI) / 180)}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: angle / 360,
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Info */}
                    <h3 className="font-orbitron text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-rajdhani text-accent font-bold text-lg mb-2">
                      {member.role}
                    </p>
                    <p className="font-mono text-sm text-muted-foreground mb-6">
                      {member.specialization}
                    </p>

                    {/* Social links */}
                    <div className="flex justify-center gap-3">
                      {[Linkedin, Github, Twitter].map((Icon, i) => (
                        <motion.button
                          key={i}
                          className="w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon size={16} />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Teams Sections */}
        {teams.map((team, teamIndex) => (
          <section key={team.name} className={`py-12 ${teamIndex % 2 === 0 ? 'bg-muted/20' : ''} relative overflow-hidden`}>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`w-10 h-10 rounded-xl bg-${team.color}/20 border border-${team.color}/40 flex items-center justify-center text-${team.color}`}
                  animate={{
                    boxShadow: [
                      `0 0 0px transparent`,
                      `0 0 20px hsl(var(--${team.color}) / 0.3)`,
                      `0 0 0px transparent`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {team.icon}
                </motion.div>
                <h2 className="font-orbitron text-xl md:text-2xl font-bold">
                  {team.name}
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {team.members.map((member, index) => (
                  <MemberCard key={member.name} member={member} index={index} color={team.color} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Join CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border max-w-2xl">
                <h3 className="font-orbitron text-2xl font-bold mb-4">
                  Want to be part of the team?
                </h3>
                <p className="font-rajdhani text-muted-foreground mb-6">
                  We're always looking for passionate individuals who want to explore,
                  learn, and innovate in the world of IoT.
                </p>
                <motion.button
                  className="btn-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default Team;
