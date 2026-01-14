import { motion } from "framer-motion";
import { useState } from "react";
import { Cpu, Users, Lightbulb, Mail, Home } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home size={20} />, position: { x: 10, y: 50 } },
  { id: "about", label: "About", icon: <Cpu size={20} />, position: { x: 30, y: 50 } },
  { id: "projects", label: "Projects", icon: <Lightbulb size={20} />, position: { x: 50, y: 50 } },
  { id: "team", label: "Team", icon: <Users size={20} />, position: { x: 70, y: 50 } },
  { id: "contact", label: "Contact", icon: <Mail size={20} />, position: { x: 90, y: 50 } },
];

interface CircuitNavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const CircuitNavigation = ({ activeSection, onNavigate }: CircuitNavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 h-20 bg-background/80 backdrop-blur-xl border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
    >
      {/* Circuit board background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          {/* Horizontal traces */}
          <line x1="0" y1="40" x2="100%" y2="40" stroke="hsl(var(--circuit-trace))" strokeWidth="1" />
          <line x1="0" y1="60" x2="100%" y2="60" stroke="hsl(var(--circuit-trace))" strokeWidth="1" />
          
          {/* Data flow animation */}
          <motion.circle
            r="3"
            fill="hsl(var(--primary))"
            animate={{
              cx: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            cy="40"
          />
        </svg>
      </div>

      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate("home")}
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-primary" />
          </div>
          <span className="font-orbitron text-lg font-bold tracking-wider text-foreground">
            IOT<span className="text-primary">RONICS</span>
          </span>
        </motion.div>

        {/* Navigation Items */}
        <div className="flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              className="relative group px-4 py-2"
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + index * 0.1 }}
            >
              {/* Connection node */}
              <motion.div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: activeSection === item.id || hoveredItem === item.id ? [1, 1.5, 1] : 1,
                  boxShadow:
                    activeSection === item.id || hoveredItem === item.id
                      ? "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.5)"
                      : "none",
                }}
                transition={{ duration: 0.5, repeat: activeSection === item.id ? Infinity : 0 }}
              />

              {/* Button content */}
              <motion.div
                className={`flex items-center gap-2 font-rajdhani font-semibold text-sm uppercase tracking-wider transition-colors duration-300 ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <motion.span
                  animate={{
                    color: activeSection === item.id ? "hsl(var(--primary))" : undefined,
                  }}
                >
                  {item.icon}
                </motion.span>
                <span className="hidden md:inline">{item.label}</span>
              </motion.div>

              {/* Active indicator */}
              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/30"
                  layoutId="activeNav"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(circle at center, hsl(var(--primary) / 0.1), transparent 70%)",
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          className="btn-circuit hidden lg:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Us
        </motion.button>
      </div>

      {/* Bottom circuit trace */}
      <svg className="absolute bottom-0 left-0 right-0 h-1" preserveAspectRatio="none">
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="hsl(var(--primary))"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </svg>
    </motion.nav>
  );
};

export default CircuitNavigation;
