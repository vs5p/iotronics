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
    name: "Rounak Vyas",
    role: "President",
    specialization: "Embedded Systems & IoT Architecture",
    avatar: "/images/Heads/Rounak_Vyas.jpg",
  },
  {
    name: "Rohit Soni",
    role: "Vice President",
    specialization: "Software Development & Cloud",
    avatar: "/images/Heads/Rohit Soni.jpg",
  }
];

const facultyCoordinators: TeamMember[] = [
  {
    name: "Ms.Smitha B",
    role: "Assistant Professor, EEE Dept",
    specialization: "Project Guidance & Mentorship",
    avatar: "/images/coordinators/WhatsApp Image 2026-01-30 at 3.46.19 PM.jpeg",
  },
  {
    name: "Ms.Meghana A",
    role: "Assistant Professor, EEE Dept",
    specialization: "Technical Support & Innovation",
    avatar: "/images/coordinators/WhatsApp Image 2026-01-28 at 1.46.38 PM.jpeg",
  }
];

const teams: TeamGroup[] = [
  {
    name: "Coding Team",
    icon: <Code size={20} />,
    color: "primary",
    members: [
      { name: "Sankalp Vyas", role: "Lead Developer", specialization: "Full Stack Development", avatar: "/images/coding/Sankalp.jpg" },
      { name: "Disha Gupta", role: "Backend Developer", specialization: "APIs & Databases", avatar: "/images/coding/Disha.jpg.jpeg" },
      { name: "Karthik G", role: "Frontend Developer", specialization: "React & UI/UX", avatar: "/images/coding/Karthik G.jpg" },
      { name: "Jayakrishnan R", role: "Frontend Developer", specialization: "React & UI/UX", avatar: "/images/coding/Jayakrishnan R.jpg" },
      { name: "Sniti Jain", role: "Frontend Developer", specialization: "React & UI/UX", avatar: "/images/coding/Sniti Jain.jpg" },
      { name: "Manish Omprakash", role: "Frontend Developer", specialization: "React & UI/UX", avatar: "/images/coding/Manish.jpg" },
    ],
  },
  {
    name: "Tech Team",
    icon: <Cpu size={20} />,
    color: "secondary",
    members: [
      { name: "Tanushri vijay", role: "Technical Lead", specialization: "IoT Architecture", avatar: "/images/tech/Tanushri.jpg" },
      { name: "Aditya Suhas Satwik", role: "Hardware Engineer", specialization: "Embedded Systems", avatar: "/images/tech/Aditya Satwik.jpg" },
      { name: "Karan M Bhat", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/Karan.jpg" },
      { name: "Kavyesh Gujetiya", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/kavyesh gujetiya.jpeg" },
      { name: "Ajay C A", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/Ajay C A.jpg" },
      { name: "Shreya Fouzdar", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/Shreya Fouzdar.jpg" },
      { name: "Aditya Vijaykumar", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/AdityaVG.jpg" },
      { name: "Ananya Manjunath", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/Ananya Manjunath.jpg" },
      { name: "Amogh D Pinglay", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/Amogh Pinglay.jpg" },
      { name: "Keertana Kavitha", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/Keertana Kavitha.jpg" },
      { name: "Madhusudhan M R", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/Madhusudhan M R.jpg" },
      { name: "Meher Chaitanya", role: "Research Head", specialization: "Machine Learning", avatar: "/images/tech/Meher Chaitanya.jpg" },

    ],
  },
  {
    name: "Media And Content Team",
    icon: <Megaphone size={20} />,
    color: "accent",
    members: [
      { name: "Yashaswini", role: "PR Head", specialization: "Lead", avatar: "/images/media/Yashaswini.jpg" },
      { name: "Sameeksha Beram", role: "member-Design", specialization: "Content Strategy", avatar: "/images/media/sameeksha.jpg" },
      { name: "Diddekunta Bhavitha", role: "member-Dop /Video", specialization: "Content Strategy", avatar: "/images/media/WhatsApp Image 2026-02-04 at 7.54.25 PM.jpeg" },
      { name: "Srinidhi A U", role: "member-Design", specialization: "Content Strategy", avatar: "/images/media/20250701_092625~2.jpg" },
      { name: "Adit jain", role: "member-Dop/Video", specialization: "Content Strategy", avatar: "/images/media/adit_jain.jpg" },
      { name: "Hardik T", role: "member-Dop/Video", specialization: "Content Strategy", avatar: "/images/media/Hardik T.jpg" },
      { name: "Jyothsna D.M", role: "member-Design", specialization: "Content Strategy", avatar: "/images/media/Jyothsna_102091.jpg" },
      { name: "Harini Prabagaran", role: "member-Design", specialization: "Content Strategy", avatar: "/images/media/Harini.jpg" },
      { name: "Umang", role: "member-Dop/Video", specialization: "Content Strategy", avatar: "/images/media/Umang.jpg" },
    ],
  },
  {
    name: "Administration And Communication Team",
    icon: <PenTool size={20} />,
    color: "glow-green",
    members: [
      { name: "Ujwala.P", role: "Lead", specialization: "UI/UX Design", avatar: "/images/admin_comm/ujwalaP.jpeg" },
      { name: "Lakshmy S", role: "Co-Lead", specialization: "Visual Identity", avatar: "/images/admin_comm/Lakshmy S.jpg"},
      { name: "Sai Vikas", role: "member", specialization: "Visual Identity", avatar: "/images/admin_comm/saivikas.jpg" },
      { name: "Keerthi V", role: "member", specialization: "Visual Identity", avatar: "/images/admin_comm/keerthi V.jpeg" },
      { name: "Sneha K Binu", role: "member", specialization: "Visual Identity", avatar: "/images/admin_comm/sneha.jpeg" },
      { name: "Siri Patil", role: "member", specialization: "Visual Identity", avatar: "/images/admin_comm/siripatil.jpeg" },
      { name: "Amith Sham", role: "member", specialization: "Visual Identity", avatar: "/images/admin_comm/Amith Sham.jpg" },
      { name: "C.Nevesha Tanya", role: "member", specialization: "Visual Identity", avatar: "/images/admin_comm/cnevasha.jpeg" },
    ],
  }
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
        className="relative w-28 h-28 mx-auto mb-4"
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
        <div className={`absolute inset-2 rounded-full bg-gradient-to-br from-${color}/20 to-accent/20 border-2 border-${color}/30 flex items-center justify-center group-hover:border-${color} transition-colors overflow-hidden`}>
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover rounded-full"
            style={(() => {
              const name = member.name;
              // Zoom out and crop to upper side
              if (name === "Kavyesh Gujetiya" || name === "Amogh D Pinglay") {
                return { objectPosition: 'center top', transform: 'scale(0.9)' };
              }
              // Crop to upper side only
              if (name === "Shreya Fouzdar" || name === "Aditya Vijaykumar" || name === "Hardik T" || name === "Jyothsna D.M" || name === "Ajay C A") {
                return { objectPosition: 'center top', transform: 'scale(1.1)' };
              }
              // Zoom in a bit to center
              if (name === "C.Nevesha Tanya") {
                return { objectPosition: 'center center', transform: 'scale(1.3)' };
              }
              // Disha Gupta - keep existing
              if (name === "Disha Gupta") {
                return { objectPosition: 'center top', transform: 'scale(1.4)' };
              }
              // Default
              return { objectPosition: 'center center', transform: 'scale(1.1)' };
            })()}
          />
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
                  <div className="card-circuit text-center p-8 border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5 h-full flex flex-col items-center justify-center">
                    {/* Large Avatar */}
                    <motion.div
                      className="relative w-36 h-36 mx-auto mb-6"
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
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 border-2 border-accent/50 flex items-center justify-center group-hover:border-accent transition-colors overflow-hidden">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                          style={member.name === "Rounak Vyas" || member.name === "Rohit Soni" 
                            ? { objectPosition: 'center top', transform: 'scale(1.2)' }
                            : { objectPosition: 'center center' }
                          }
                        />
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

        {/* Faculty Coordinators Section */}
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-2">
                <span className="gradient-text">Faculty Coordinators</span>
              </h2>
              <p className="font-rajdhani text-muted-foreground">Supporting our mission with expertise and guidance</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {facultyCoordinators.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="card-circuit text-center p-8 border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 h-full flex flex-col items-center justify-center">
                    {/* Large Avatar */}
                    <motion.div
                      className="relative w-36 h-36 mx-auto mb-6"
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
                          stroke="hsl(var(--primary))"
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
                          stroke="hsl(var(--secondary))"
                          strokeWidth="1"
                          strokeDasharray="8 8"
                          fill="none"
                          className="opacity-50"
                        />
                      </motion.svg>

                      {/* Avatar circle */}
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary/50 flex items-center justify-center group-hover:border-primary transition-colors overflow-hidden">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                          style={{ objectPosition: 'center center', transform: 'scale(1.1)' }}
                        />
                      </div>

                      {/* Connection nodes */}
                      {[0, 60, 120, 180, 240, 300].map((angle) => (
                        <motion.div
                          key={angle}
                          className="absolute w-2 h-2 rounded-full bg-primary"
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
                    <h3 className="font-orbitron text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-rajdhani text-primary font-bold text-lg mb-2">
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
                          className="w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
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
