import { motion, useMotionValue, useSpring, animate, useTransform } from "framer-motion";
import { ChevronDown, Zap, Wifi, Cpu, Radio } from "lucide-react";
import logoImage from "@/assets/logo.png";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onScrollDown: () => void;
}

const AnimatedCounter = ({ target, suffix = "", delay = 0 }: { target: number; suffix?: string; delay?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Wait for the delay before starting animation
    const timeout = setTimeout(() => {
      const controls = animate(count, target, {
        duration: 2.5,
        ease: "easeOut",
      });

      const unsubscribe = rounded.on("change", (latest) => {
        setDisplayValue(latest);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }, delay);

    return () => clearTimeout(timeout);
  }, [count, target, rounded, delay]);

  return <>{displayValue}{suffix}</>;
};

const HeroSection = ({ onScrollDown }: HeroSectionProps) => {
  // Floating particles for IoT effect
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden pt-20"
    >
      {/* Animated circuit background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--circuit-trace)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--circuit-trace)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Central glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Animated connection lines */}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${10 + i * 20}%`}
            y1="0%"
            x2={`${10 + i * 20}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              delay: 2 + i * 0.2,
              duration: 2,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Animated logo */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              {/* Rotating orbit ring */}
              <motion.div
                className="absolute -inset-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2">
                  <Wifi className="text-primary" size={12} />
                </div>
                <div className="absolute bottom-0 left-1/2 w-3 h-3 -translate-x-1/2 translate-y-1/2">
                  <Radio className="text-secondary" size={12} />
                </div>
              </motion.div>

              <motion.img
                src={logoImage}
                alt="IoTRONICS"
                className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-full"
                animate={{
                  filter: [
                    "drop-shadow(0 0 20px hsl(var(--primary) / 0.5))",
                    "drop-shadow(0 0 40px hsl(var(--primary) / 0.7))",
                    "drop-shadow(0 0 20px hsl(var(--primary) / 0.5))",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="font-orbitron text-5xl md:text-7xl font-bold mb-4 tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  backgroundImage: [
                    "linear-gradient(90deg, #FFD700, #FFA500, #FF6347, #FF1493, #FFD700)",
                    "linear-gradient(90deg, #FFA500, #FF6347, #FF1493, #FFD700, #FFA500)",
                    "linear-gradient(90deg, #FF6347, #FF1493, #FFD700, #FFA500, #FF6347)",
                    "linear-gradient(90deg, #FF1493, #FFD700, #FFA500, #FF6347, #FF1493)",
                    "linear-gradient(90deg, #FFD700, #FFA500, #FF6347, #FF1493, #FFD700)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                }}
              >
                IoT
              </motion.span>
              <span className="text-foreground">RONICS</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-rajdhani text-xl md:text-2xl text-muted-foreground mb-2 tracking-[0.2em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              — The IoT Club —
            </motion.p>

            {/* Description */}
            <motion.p
              className="font-rajdhani text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Connecting minds, building the future. We explore the intersection of
              electronics, programming, and innovation to create smart solutions for
              tomorrow's world.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {[
                { value: 50, suffix: "+", label: "Members", icon: <Users size={20} /> },
                { value: 25, suffix: "+", label: "Projects", icon: <Cpu size={20} /> },
                { value: 10, suffix: "+", label: "Events", icon: <Zap size={20} /> },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center px-6"
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <div className="text-primary mb-2">{stat.icon}</div>
                  <div className="font-orbitron text-3xl font-bold text-foreground">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={3500} />
                  </div>
                  <div className="font-rajdhani text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <motion.button
                className="btn-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Projects
              </motion.button>
              <motion.button
                className="btn-circuit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join the Club
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - always below CTAs, never overlapping */}
      <div className="relative z-10 pb-4 md:pb-8">
        <motion.button
          className="mx-auto flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          onClick={onScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="font-mono text-[10px] md:text-xs tracking-wider uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} className="md:w-6 md:h-6" />
          </motion.div>
        </motion.button>
      </div>

      {/* Side decorations */}
      <motion.div
        className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        {[Wifi, Cpu, Radio, Zap].map((Icon, i) => (
          <motion.div
            key={i}
            className="w-10 h-10 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
            whileHover={{ scale: 1.1, x: 5 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, delay: i * 0.2 },
            }}
          >
            <Icon size={18} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

// Add Users icon for stats
const Users = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default HeroSection;
