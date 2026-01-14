import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HangingBulbProps {
  onToggle: () => void;
  isOn: boolean;
}

const HangingBulb = ({ onToggle, isOn }: HangingBulbProps) => {
  const [isLit, setIsLit] = useState(true);
  const [swingAngle, setSwingAngle] = useState(0);

  const handleClick = () => {
    setIsLit(!isLit);
  };

  // Simple isolated swing loop
  useEffect(() => {
    let counter = 0;
    let frameId: number;
    
    const animate = () => {
      counter += 0.02;
      const angle = Math.sin(counter) * 7; // Always between -7 and +7
      setSwingAngle(angle);
      frameId = requestAnimationFrame(animate);
    };
    
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="fixed top-0 right-4 md:right-8 z-50 select-none pointer-events-none scale-75 md:scale-75 lg:scale-90 origin-top-right">
      <div className="h-80 w-[120px] flex items-start justify-center pt-0">
        <div
          className="origin-top pointer-events-auto"
          style={{ 
            transform: `rotate(${swingAngle}deg)`,
            willChange: 'transform'
          }}
        >
          {/* String/Wire - Black with realistic styling */}
          <div className="relative w-1 h-32 md:h-40 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-black to-zinc-700"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-600/30 via-transparent to-transparent"></div>
          </div>
          
          {/* Socket cap - Gray with horizontal lines */}
          <div className="relative w-5 md:w-6 h-[16px] md:h-[20px] bg-gradient-to-b from-zinc-400 to-zinc-500 mx-auto pointer-events-none">
            <div className="absolute w-full h-[2px] bg-zinc-600" style={{ top: "4px" }}></div>
            <div className="absolute w-full h-[2px] bg-zinc-600" style={{ top: "8px" }}></div>
            <div className="absolute w-full h-[2px] bg-zinc-600" style={{ top: "12px" }}></div>
          </div>
          
          {/* Bulb Container */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Light bulb"
            className="cursor-pointer pointer-events-auto group"
            onClick={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
          >
            {/* Screw base - Dark gray with threads */}
            <div className="relative w-[24px] md:w-[28px] h-[16px] md:h-[18px] bg-gradient-to-b from-zinc-600 to-zinc-700 rounded-sm mx-auto pointer-events-none">
              <div className="absolute w-full h-[2px] bg-zinc-800" style={{ top: "3px" }}></div>
              <div className="absolute w-full h-[2px] bg-zinc-800" style={{ top: "7px" }}></div>
              <div className="absolute w-full h-[2px] bg-zinc-800" style={{ top: "11px" }}></div>
              <div className="absolute w-full h-[1px] md:h-[2px] bg-zinc-800" style={{ top: "14px" }}></div>
            </div>
            
            {/* Glass bulb - Round with glow */}
            <motion.div
              className="w-[48px] md:w-[56px] h-[48px] md:h-[56px] rounded-full mx-auto -mt-1 overflow-hidden relative"
              style={{
                background: isLit
                  ? "radial-gradient(circle at 40% 35%, #fffef0, #fff9d0, #f5e6a0, #e8d888)"
                  : "radial-gradient(circle at 40% 35%, #52525b, #3f3f46, #27272a)",
                boxShadow: isLit
                  ? "0 0 30px rgba(255, 250, 200, 0.6), 0 0 60px rgba(255, 240, 150, 0.4), inset 0 -10px 20px rgba(0, 0, 0, 0.1)"
                  : "0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.3)",
              }}
              animate={
                isLit
                  ? {
                      boxShadow: [
                        "0 0 30px rgba(255, 250, 200, 0.6), 0 0 60px rgba(255, 240, 150, 0.4), inset 0 -10px 20px rgba(0, 0, 0, 0.1)",
                        "0 0 40px rgba(255, 250, 200, 0.8), 0 0 80px rgba(255, 240, 150, 0.6), inset 0 -10px 20px rgba(0, 0, 0, 0.1)",
                        "0 0 30px rgba(255, 250, 200, 0.6), 0 0 60px rgba(255, 240, 150, 0.4), inset 0 -10px 20px rgba(0, 0, 0, 0.1)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: isLit ? Infinity : 0, ease: "easeInOut" }}
            >
              {/* Filament inside bulb */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 56 56">
                <motion.path
                  d="M 22 24 Q 28 18 34 24 Q 28 30 22 24"
                  stroke={isLit ? "#d4a574" : "#52525b"}
                  strokeWidth="2"
                  fill="none"
                  opacity={isLit ? 0.6 : 0.3}
                />
                <line x1="22" y1="24" x2="22" y2="40" stroke={isLit ? "#d4a574" : "#52525b"} strokeWidth="1.5" opacity={isLit ? 0.5 : 0.3} />
                <line x1="34" y1="24" x2="34" y2="40" stroke={isLit ? "#d4a574" : "#52525b"} strokeWidth="1.5" opacity={isLit ? 0.5 : 0.3} />
                <line x1="28" y1="18" x2="28" y2="40" stroke={isLit ? "#d4a574" : "#52525b"} strokeWidth="1" opacity={isLit ? 0.4 : 0.2} />
              </svg>
              
              {/* Glass highlight - only visible on hover */}
              <div
                className="absolute top-3 left-3 w-3 h-5 rounded-full pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,1), rgba(255,255,255,0.3) 50%, transparent)",
                  filter: "blur(2px)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ambient light glow on background */}
      {isLit && (
        <>
          {/* Main light cone */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "220px",
              left: "50%",
              translateX: "-50%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
          >
            <div
              className="w-[400px] h-[700px]"
              style={{
                background: "conic-gradient(from 180deg at 50% 0%, transparent 15deg, rgba(255, 250, 200, 0.6) 90deg, transparent 165deg)",
                clipPath: "polygon(50% 0%, 3% 100%, 97% 100%)",
                filter: "blur(30px)",
              }}
            />
          </motion.div>
          
          {/* Soft ambient glow around bulb */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "180px",
              left: "50%",
              translateX: "-50%",
            }}
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-[200px] h-[200px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255, 250, 200, 0.4), transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default HangingBulb;
