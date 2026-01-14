import { motion } from "framer-motion";
import { Users, Linkedin, Github, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Chen",
    role: "President",
    specialization: "Embedded Systems",
    avatar: "AC",
  },
  {
    name: "Sarah Williams",
    role: "Vice President",
    specialization: "Software Development",
    avatar: "SW",
  },
  {
    name: "Raj Patel",
    role: "Technical Lead",
    specialization: "IoT Architecture",
    avatar: "RP",
  },
  {
    name: "Emma Johnson",
    role: "Project Manager",
    specialization: "Hardware Design",
    avatar: "EJ",
  },
  {
    name: "Michael Lee",
    role: "Research Head",
    specialization: "Machine Learning",
    avatar: "ML",
  },
  {
    name: "Priya Sharma",
    role: "Events Coordinator",
    specialization: "Community Building",
    avatar: "PS",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.1), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-4 h-4 text-accent" />
            <span className="font-mono text-sm text-accent">OUR TEAM</span>
          </motion.div>
          
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Meet the <span className="text-accent">Innovators</span>
          </h2>
          
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate group of students driving innovation and pushing the boundaries
            of what's possible with IoT technology.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card-circuit text-center">
                {/* Avatar */}
                <motion.div
                  className="relative w-24 h-24 mx-auto mb-6"
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
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      strokeDasharray="10 5"
                      fill="none"
                      className="opacity-50 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.svg>

                  {/* Avatar circle */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors">
                    <span className="font-orbitron text-2xl font-bold gradient-text">
                      {member.avatar}
                    </span>
                  </div>

                  {/* Connection nodes */}
                  {[0, 90, 180, 270].map((angle) => (
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
                <h3 className="font-orbitron text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="font-rajdhani text-primary font-medium mb-2">
                  {member.role}
                </p>
                <p className="font-mono text-xs text-muted-foreground mb-6">
                  {member.specialization}
                </p>

                {/* Social links */}
                <div className="flex justify-center gap-3">
                  {[Linkedin, Github, Twitter].map((Icon, i) => (
                    <motion.button
                      key={i}
                      className="w-8 h-8 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={14} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border">
            <h3 className="font-orbitron text-2xl font-bold mb-4">
              Want to be part of the team?
            </h3>
            <p className="font-rajdhani text-muted-foreground mb-6 max-w-md">
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
  );
};

export default TeamSection;
