import { motion } from "framer-motion";
import { Calendar, Clock, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";
import { useState, useEffect } from "react";

const Events = () => {
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

      <main className="relative pt-20 min-h-[80vh] flex items-center">
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
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-primary">EVENTS</span>
            </motion.div>

            <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
              Events <span className="gradient-text">Coming Soon</span>
            </h1>

            {/* Animated Icon */}
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 20px hsl(var(--primary) / 0.2)",
                  "0 0 60px hsl(var(--primary) / 0.4)",
                  "0 0 20px hsl(var(--primary) / 0.2)",
                ],
                borderColor: [
                  "hsl(var(--primary) / 0.3)",
                  "hsl(var(--primary) / 0.8)",
                  "hsl(var(--primary) / 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="w-16 h-16 text-primary" />
              </motion.div>
            </motion.div>

            <p className="font-rajdhani text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              We're working on exciting new events and workshops. Stay tuned for upcoming 
              hackathons, tech talks, hands-on workshops, and more!
            </p>

            {/* Animated decoration */}
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Notification signup */}
            <motion.div
              className="max-w-md mx-auto p-6 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4 justify-center">
                <Zap className="w-5 h-5 text-accent" />
                <span className="font-orbitron font-semibold">Get Notified</span>
              </div>
              <p className="font-rajdhani text-sm text-muted-foreground mb-4">
                Be the first to know when we announce new events
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani text-sm"
                />
                <motion.button
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-rajdhani font-semibold text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Notify Me
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <div className="pb-16"></div>
      <PageFooter />
    </div>
  );
};

export default Events;
