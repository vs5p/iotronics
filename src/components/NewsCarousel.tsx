import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy, BookOpen, Calendar, Cpu, ChevronLeft, ChevronRight } from "lucide-react";

interface NewsItem {
  id: number;
  type: "hackathon" | "blog" | "event" | "project";
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    type: "hackathon",
    title: "Won Smart India Hackathon 2024",
    description: "Our team secured first place with an IoT-based healthcare solution",
    date: "Dec 2024",
    icon: <Trophy className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    type: "blog",
    title: "New Blog: Getting Started with ESP32",
    description: "A comprehensive guide for beginners in embedded systems",
    date: "Nov 2024",
    icon: <BookOpen className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    type: "event",
    title: "Upcoming: IoT Workshop Series",
    description: "5-day hands-on workshop covering sensors to cloud integration",
    date: "Jan 2025",
    icon: <Calendar className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    type: "project",
    title: "Smart Campus v2.0 Launched",
    description: "Major update with AI-powered energy optimization",
    date: "Oct 2024",
    icon: <Cpu className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop",
  },
];

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % newsItems.length;
      }
      return prev === 0 ? newsItems.length - 1 : prev - 1;
    });
  };

  const currentItem = newsItems[currentIndex];

  const typeColors = {
    hackathon: "text-accent border-accent/30 bg-accent/10",
    blog: "text-secondary border-secondary/30 bg-secondary/10",
    event: "text-primary border-primary/30 bg-primary/10",
    project: "text-glow-green border-glow-green/30 bg-glow-green/10",
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-orbitron text-2xl md:text-3xl font-bold mb-2">
            What's <span className="gradient-text">Happening</span>
          </h3>
          <p className="font-rajdhani text-muted-foreground">
            Latest news, achievements, and updates from IoTRONICS
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-card transition-colors shadow-lg"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ opacity: 1 }}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-card transition-colors shadow-lg"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ opacity: 1 }}
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* Carousel card */}
          <div className="relative h-64 md:h-56 overflow-hidden rounded-2xl bg-card border border-border">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center p-4 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 w-full">
                  {/* Image */}
                  <motion.div
                    className="relative w-full md:w-48 h-32 md:h-36 rounded-xl overflow-hidden flex-shrink-0 border border-border"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img 
                      src={currentItem.image} 
                      alt={currentItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <motion.div
                      className={`absolute top-2 left-2 w-10 h-10 rounded-lg flex items-center justify-center border ${typeColors[currentItem.type]}`}
                      animate={{
                        boxShadow: [
                          "0 0 0px transparent",
                          "0 0 15px currentColor",
                          "0 0 0px transparent",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentItem.icon}
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-mono uppercase border ${typeColors[currentItem.type]}`}>
                        {currentItem.type}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{currentItem.date}</span>
                    </div>
                    <h4 className="font-orbitron text-lg font-semibold mb-1">{currentItem.title}</h4>
                    <p className="font-rajdhani text-muted-foreground text-sm md:text-base">{currentItem.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {newsItems.map((_, i) => (
                <motion.button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
