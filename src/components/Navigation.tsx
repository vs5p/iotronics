import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Lightbulb, Mail, Home, Trophy, Calendar, Info, Menu, X } from "lucide-react";
import logoImage from "@/assets/logo.png";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home size={18} />, path: "/" },
  { id: "about", label: "About", icon: <Info size={18} />, path: "/about" },
  { id: "projects", label: "Projects", icon: <Lightbulb size={18} />, path: "/projects" },
  { id: "achievements", label: "Achievements", icon: <Trophy size={18} />, path: "/achievements" },
  { id: "team", label: "Team", icon: <Users size={18} />, path: "/team" },
  { id: "events", label: "Events", icon: <Calendar size={18} />, path: "/events" },
  { id: "contact", label: "Contact Us", icon: <Mail size={18} />, path: "/contact" },
];

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll progress with custom calculation
  const scrollProgress = useMotionValue(0);
  const lineWidth = useTransform(scrollProgress, (value) => `${value}%`);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate actual scroll percentage
      const maxScroll = documentHeight - windowHeight;
      const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 100;
      
      // Clamp between 0 and 100
      const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
      
      scrollProgress.set(clampedPercentage);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollProgress]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
    >
      {/* Circuit board background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--circuit-trace))" strokeWidth="1" />
          
          {/* Multiple data flow animations */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r="2"
              fill="hsl(var(--primary))"
              animate={{
                cx: ["0%", "100%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1,
              }}
              cy="50%"
            />
          ))}
          
          {/* Pulsing nodes */}
          {[20, 40, 60, 80].map((x, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={`${x}%`}
              cy="50%"
              r="3"
              fill="hsl(var(--primary))"
              opacity={0.3}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                r: [3, 4, 3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="container mx-auto h-16 flex items-center justify-between px-4 lg:px-6 xl:px-8">
        {/* Logo */}
        <Link to="/">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full overflow-hidden bg-background/50 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 10px hsl(var(--primary) / 0.3)",
                  "0 0 20px hsl(var(--primary) / 0.5)",
                  "0 0 10px hsl(var(--primary) / 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img src={logoImage} alt="IoTRONICS" className="w-8 h-8 object-contain" />
            </motion.div>
            <span className="font-orbitron text-lg font-bold tracking-wider hidden sm:block whitespace-nowrap">
              <motion.span
                className="inline"
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
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation Items - Slightly right of center */}
        <div className="hidden lg:flex items-center justify-center flex-1 gap-2 px-8 ml-12">
          {navItems.map((item, index) => (
            <Link key={item.id} to={item.path}>
              <motion.div
                className="relative group px-4 py-2"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                {/* Connection node */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{
                    scale: isActive(item.path) || hoveredItem === item.id ? [1, 1.5, 1] : 1,
                    boxShadow:
                      isActive(item.path) || hoveredItem === item.id
                        ? "0 0 8px hsl(var(--primary)), 0 0 16px hsl(var(--primary) / 0.5)"
                        : "none",
                  }}
                  transition={{ duration: 0.5, repeat: isActive(item.path) ? Infinity : 0 }}
                />

                {/* Button content */}
                <motion.div
                  className={`flex items-center gap-2 font-rajdhani font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ${
                    isActive(item.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <motion.span
                    animate={{
                      color: isActive(item.path) ? "hsl(var(--primary))" : undefined,
                    }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="whitespace-nowrap">{item.label}</span>
                </motion.div>

                {/* Active indicator */}
                {isActive(item.path) && (
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
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Spacer to balance the layout */}
        <div className="hidden lg:block w-[120px]"></div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden w-10 h-10 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-foreground relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <Link key={item.id} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                  <motion.div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.icon}
                    <span className="font-rajdhani font-semibold">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom circuit trace - responsive to scroll */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        style={{ 
          width: lineWidth,
        }}
      />
    </motion.nav>
  );
};

export default Navigation;
