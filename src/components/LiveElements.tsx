import { motion } from "framer-motion";

// Floating particles with more variety
export const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    type: Math.random() > 0.7 ? 'ring' : 'dot',
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {particle.type === 'ring' ? (
            <div
              className="rounded-full border border-primary/30"
              style={{ width: particle.size * 3, height: particle.size * 3 }}
            />
          ) : (
            <div
              className="rounded-full bg-primary/40"
              style={{ width: particle.size, height: particle.size }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Circuit traces background
export const CircuitBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      <svg className="absolute w-full h-full">
        {/* Vertical traces */}
        {[10, 25, 40, 55, 70, 85].map((x, i) => (
          <motion.line
            key={`v-${x}`}
            x1={`${x}%`}
            y1="0"
            x2={`${x}%`}
            y2="100%"
            stroke="hsl(var(--circuit-trace))"
            strokeWidth="1"
            strokeDasharray="5 20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: i * 0.2 }}
          />
        ))}
        
        {/* Horizontal traces */}
        {[15, 35, 55, 75, 95].map((y, i) => (
          <motion.line
            key={`h-${y}`}
            x1="0"
            y1={`${y}%`}
            x2="100%"
            y2={`${y}%`}
            stroke="hsl(var(--circuit-trace))"
            strokeWidth="1"
            strokeDasharray="10 30"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: i * 0.3 }}
          />
        ))}
        
        {/* Animated data pulses */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={`pulse-${i}`}
            r="3"
            fill="hsl(var(--primary))"
            animate={{
              cx: ["0%", "100%"],
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
            cy={`${15 + i * 20}%`}
          />
        ))}
        
        {/* Glowing nodes at intersections */}
        {[10, 40, 70].map((x) =>
          [35, 55, 75].map((y) => (
            <motion.circle
              key={`node-${x}-${y}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill="hsl(var(--primary))"
              opacity={0.3}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                r: [4, 6, 4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: (x + y) / 100,
              }}
            />
          ))
        )}
      </svg>
    </div>
  );
};

// Electricity arc effect
export const ElectricityArc = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{
            width: "100%",
            top: `${30 + i * 20}%`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
