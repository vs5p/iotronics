import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Zap, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { subscribeToNewsletter, getEvents } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Events = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showPreviousEvents, setShowPreviousEvents] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    getEvents().then(setEvents).catch(console.error);
  }, []);

  // Separate events into upcoming and previous based on date
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const previousEvents = events.filter(event => new Date(event.date) < new Date());

  const displayedEvents = showPreviousEvents ? previousEvents : upcomingEvents;
  const handleNotifyMe = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await subscribeToNewsletter(email);
      if (error) {
        if (error.code === '23505') {
          toast.error("This email is already subscribed!");
        } else {
          throw error;
        }
      } else {
        toast.success("You'll be notified of new events!");
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to subscribe");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const getAbsoluteUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

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

            {/* Dynamic Events List */}
            {(upcomingEvents.length > 0 || previousEvents.length > 0) ? (
              <div className="mb-12 text-left">
                <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-8 text-center">
                  {showPreviousEvents ? "Previous" : "Upcoming"} <span className="gradient-text">Events</span>
                </h1>

                {/* Toggle Button */}
                <div className="flex justify-center mb-8">
                  <button
                    onClick={() => setShowPreviousEvents(!showPreviousEvents)}
                    className="px-6 py-2 rounded-lg font-semibold transition-all duration-200 border border-primary/50 hover:border-primary bg-primary/10 hover:bg-primary/20 text-primary uppercase text-sm font-mono tracking-wider"
                  >
                    {showPreviousEvents ? "← View Upcoming Events" : "View Previous Events →"}
                  </button>
                </div>

                {displayedEvents.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground font-rajdhani text-lg">
                      {showPreviousEvents
                        ? "No previous events found"
                        : "Upcoming events coming soon"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => {
                          // If it's a past event with gallery images, go to gallery page
                          if (showPreviousEvents && event.gallery_images && event.gallery_images.length > 0) {
                            navigate(`/events/${event.id}/gallery`);
                          } else {
                            setSelectedEvent(event);
                          }
                        }}
                        className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group"
                        whileHover={{ y: -5 }}
                      >
                        {/* Thumbnail Banner */}
                        {event.banner && (
                          <div className="h-40 overflow-hidden relative">
                            <img
                              src={event.banner}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          </div>
                        )}

                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono">
                              <Calendar className="w-3 h-3" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            {event.time && (
                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-mono">
                                <Clock className="w-3 h-3" />
                                {event.time}
                              </div>
                            )}
                          </div>
                          <h3 className="font-orbitron font-bold text-xl mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                          <p className="text-muted-foreground font-rajdhani mb-4 line-clamp-3">
                            {event.description}
                          </p>
                          {event.location && (
                            <div className="text-sm font-mono text-muted-foreground mb-4">
                              📍 {event.location}
                            </div>
                          )}

                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs text-primary font-mono uppercase tracking-wider">View Details</span>
                            {(event.enable_internal_registration || event.registration_link) && (
                              <span className="text-xs text-muted-foreground font-mono">Registration Open</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani text-sm"
                />
                <motion.button
                  onClick={handleNotifyMe}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-rajdhani font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: submitting ? 1 : 1.05 }}
                  whileTap={{ scale: submitting ? 1 : 0.95 }}
                >
                  {submitting ? "..." : "Notify Me"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <div className="pb-16"></div>
      <PageFooter />

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-3xl bg-card border-primary/20 p-0 overflow-hidden">
          {selectedEvent && (
            <>
              {selectedEvent.banner && (
                <div className="w-full h-64 md:h-80 relative bg-black/50">
                  <img
                    src={selectedEvent.banner}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="p-6 md:p-8">
                <DialogHeader>
                  <div className="flex gap-3 mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono">
                      <Calendar className="w-3 h-3" />
                      {new Date(selectedEvent.date).toLocaleDateString()}
                    </span>
                    {selectedEvent.time && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-mono">
                        <Clock className="w-3 h-3" />
                        {selectedEvent.time}
                      </span>
                    )}
                  </div>
                  <DialogTitle className="font-orbitron text-3xl font-bold mb-2 break-normal">{selectedEvent.title}</DialogTitle>
                  {selectedEvent.location && (
                    <DialogDescription className="font-mono text-primary text-sm flex items-center gap-2">
                      📍 {selectedEvent.location}
                    </DialogDescription>
                  )}
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  <p className="font-rajdhani text-foreground/90 whitespace-pre-wrap leading-relaxed text-lg">
                    {selectedEvent.description}
                  </p>

                  {selectedEvent.registration_link && (
                    <div className="pt-4">
                      <a
                        href={getAbsoluteUrl(selectedEvent.registration_link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full md:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-orange-600 text-white font-rajdhani font-bold text-lg text-center hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                      >
                        Register Now
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
