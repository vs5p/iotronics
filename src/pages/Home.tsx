import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import HangingBulb from "@/components/HangingBulb";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import NewsCarousel from "@/components/NewsCarousel";
import MiniContact from "@/components/MiniContact";
import PageFooter from "@/components/PageFooter";
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";
import { Cpu, Code, Wifi, Lightbulb, Cog, Zap, Database, Cloud, Shield, Settings } from "lucide-react";
import { getNews, supabase } from "@/lib/supabase";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
  Wifi: <Wifi className="w-8 h-8" />,
  Lightbulb: <Lightbulb className="w-8 h-8" />,
  Cog: <Cog className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Cloud: <Cloud className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Settings: <Settings className="w-8 h-8" />,
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
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

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <HangingBulb isOn={true} onToggle={() => { }} />
        <Navigation />
        <FloatingParticles />
        <CircuitBackground />

        <main className="relative">
          <HeroSection onScrollDown={() => {
            document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth" });
          }} />

          {/* What We Do Section */}
          <section id="what-we-do" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Cpu className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm text-primary">WHAT WE DO</span>
                </motion.div>

                <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
                  Building the <span className="gradient-text">Future</span> of IoT
                </h2>

                <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto">
                  IoTRONICS is a student-driven club dedicated to exploring the limitless
                  possibilities of the Internet of Things. We combine creativity with
                  technology to solve real-world problems.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Cpu className="w-8 h-8" />,
                    title: "Hardware Development",
                    desc: "Design and build IoT devices using Arduino, ESP32, Raspberry Pi, and custom PCBs."
                  },
                  {
                    icon: <Code className="w-8 h-8" />,
                    title: "Software Integration",
                    desc: "Develop firmware, mobile apps, and cloud platforms to power smart devices."
                  },
                  {
                    icon: <Wifi className="w-8 h-8" />,
                    title: "Network & Connectivity",
                    desc: "Explore WiFi, Bluetooth, LoRa, and other protocols for seamless communication."
                  },
                  {
                    icon: <Lightbulb className="w-8 h-8" />,
                    title: "Innovation Labs",
                    desc: "Experiment with cutting-edge technologies in our state-of-the-art lab space."
                  },
                  {
                    icon: <Settings className="w-8 h-8" />,
                    title: "Workshops & Training",
                    desc: "Regular hands-on sessions to learn new skills and stay updated with trends."
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "Competitions",
                    desc: "Participate in hackathons, tech fests, and national-level competitions."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="card-circuit group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary group-hover:border-primary/50 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-orbitron text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-rajdhani text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <NewsCarousel />
          <MiniContact />
        </main>

        <PageFooter />
      </motion.div>
    </>
  );
};

export default Home;
