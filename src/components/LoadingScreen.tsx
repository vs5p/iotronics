import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logoImage from "@/assets/logo.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"logo" | "circuit" | "complete">("logo");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setPhase("complete"), 500);
          setTimeout(onComplete, 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    setTimeout(() => setPhase("circuit"), 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Circuit background pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path
                    d="M 0 50 L 30 50 L 40 30 L 60 30 L 70 50 L 100 50"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.5"
                  />
                  <circle cx="30" cy="50" r="3" fill="hsl(var(--primary))" />
                  <circle cx="70" cy="50" r="3" fill="hsl(var(--primary))" />
                  <path
                    d="M 50 0 L 50 20 L 30 40 L 30 60 L 50 80 L 50 100"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
          </div>

          {/* Main Logo Container */}
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-8 rounded-full"
              style={{
                background: "radial-gradient(circle, hsl(var(--primary) / 0.3), transparent 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Circuit ring animation */}
            <svg
              className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)]"
              viewBox="0 0 200 200"
            >
              <motion.circle
                cx="100"
                cy="100"
                r="90"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                strokeDasharray="565"
                initial={{ strokeDashoffset: 565 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Rotating nodes */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }}
              >
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.circle
                    key={i}
                    cx={100 + 90 * Math.cos((angle * Math.PI) / 180)}
                    cy={100 + 90 * Math.sin((angle * Math.PI) / 180)}
                    r="4"
                    fill="hsl(var(--primary))"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  />
                ))}
              </motion.g>
            </svg>

            {/* Logo */}
            <motion.div
              className="relative w-40 h-40 flex items-center justify-center"
              animate={{
                filter: [
                  "drop-shadow(0 0 10px hsl(var(--primary)))",
                  "drop-shadow(0 0 30px hsl(var(--primary)))",
                  "drop-shadow(0 0 10px hsl(var(--primary)))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={logoImage}
                alt="IoTRONICS Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Loading text with typing effect */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="font-orbitron text-2xl font-bold tracking-[0.3em] text-primary">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                IoTRONICS
              </motion.span>
            </div>
            <div className="font-mono text-sm text-muted-foreground tracking-wider">
              INITIALIZING SYSTEMS...
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress percentage */}
            <div className="font-mono text-xs text-primary">
              {progress}%
            </div>
          </motion.div>

          {/* Data stream effects */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-30">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                style={{
                  width: "100%",
                  top: `${20 + i * 20}%`,
                }}
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
