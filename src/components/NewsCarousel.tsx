import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy, BookOpen, Calendar, Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import { getNews, supabase } from "@/lib/supabase";

// Icon mapping for news items
const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Calendar: <Calendar className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
};

const NewsCarousel = () => {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await getNews();
        setNewsItems(data);
      } catch (error) {
        console.error('Failed to load news:', error);
      }
    };

    loadNews();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('news_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'news' },
        () => {
          loadNews();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (newsItems.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [newsItems.length]);

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

  const currentItem = newsItems.length > 0 ? newsItems[currentIndex] : null;

  if (!currentItem || newsItems.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              What's <span className="gradient-text">Happening</span>
            </h3>
            <p className="font-rajdhani text-sm sm:text-base text-muted-foreground">
              No news items yet. Check back soon!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const typeColors = {
    hackathon: "text-accent border-accent/30 bg-accent/10",
    blog: "text-secondary border-secondary/30 bg-secondary/10",
    event: "text-primary border-primary/30 bg-primary/10",
    project: "text-glow-green border-glow-green/30 bg-glow-green/10",
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            What's <span className="gradient-text\">Happening</span>
          </h3>
          <p className="font-rajdhani text-sm sm:text-base text-muted-foreground">
            Latest news, achievements, and updates from IoTRONICS
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-12 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-card transition-colors shadow-lg"
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ opacity: 1 }}
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-12 z-20 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-card transition-colors shadow-lg"
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ opacity: 1 }}
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
          </motion.button>

          {/* Carousel card */}
          <div className="relative h-56 sm:h-64 md:h-56 overflow-hidden rounded-2xl bg-card border border-border">
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
                className="absolute inset-0 flex items-center p-3 sm:p-4 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 sm:gap-4 md:gap-6 w-full">
                  {/* Image */}
                  <motion.div
                    className="relative w-full md:w-40 sm:md:w-48 h-24 sm:h-32 md:h-36 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 border border-border"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <motion.div
                      className={`absolute top-1 sm:top-2 left-1 sm:left-2 w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center border ${typeColors[currentItem.type]}`}
                      animate={{
                        boxShadow: [
                          "0 0 0px transparent",
                          "0 0 15px currentColor",
                          "0 0 0px transparent",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {iconMap[currentItem.icon] || <span className="text-xl sm:text-2xl">{currentItem.icon}</span>}
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-mono uppercase border ${typeColors[currentItem.type]}`}>
                        {currentItem.type}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">{currentItem.date}</span>
                    </div>
                    <h4 className="font-orbitron text-sm sm:text-lg font-semibold mb-1 line-clamp-2">{currentItem.title}</h4>
                    <p className="font-rajdhani text-muted-foreground text-xs sm:text-sm md:text-base line-clamp-2 sm:line-clamp-none">{currentItem.description}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
              {newsItems.map((_, i) => (
                <motion.button
                  key={i}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
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
