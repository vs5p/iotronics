import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/supabase";
import { Calendar, Clock, MapPin, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const EventGallery = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
        }
    }, [isDarkMode]);

    useEffect(() => {
        const loadEvent = async () => {
            if (!eventId) {
                toast.error("Event not found");
                navigate("/events");
                return;
            }

            try {
                const eventData = await getEventById(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error("Failed to load event:", error);
                toast.error("Failed to load event details");
                navigate("/events");
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [eventId, navigate]);

    const nextImage = () => {
        if (event?.gallery_images && event.gallery_images.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === event.gallery_images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (event?.gallery_images && event.gallery_images.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? event.gallery_images.length - 1 : prev - 1
            );
        }
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl"
                >
                    Loading...
                </motion.div>
            </div>
        );
    }

    if (!event) {
        return null;
    }

    const hasGallery = event.gallery_images && event.gallery_images.length > 0;

    return (
        <div className="min-h-screen">
            <HangingBulb isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
            <Navigation />
            <FloatingParticles />
            <CircuitBackground />

            <main className="relative pt-20 pb-16 min-h-[80vh]">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-6xl mx-auto"
                    >
                        <Button
                            onClick={() => navigate("/events")}
                            variant="ghost"
                            className="mb-6 gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </Button>

                        {/* Event Header */}
                        <div className="mb-8">
                            <h1 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap gap-4 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="font-rajdhani">
                                        {new Date(event.date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                {event.time && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary" />
                                        <span className="font-rajdhani">{event.time}</span>
                                    </div>
                                )}
                                {event.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span className="font-rajdhani">{event.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Image Carousel */}
                        {hasGallery && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-12"
                            >
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/20 border border-border">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImageIndex}
                                            src={event.gallery_images[currentImageIndex]}
                                            alt={`${event.title} - Image ${currentImageIndex + 1}`}
                                            className="w-full h-full object-cover"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://placehold.co/1200x675?text=Image+Not+Available";
                                            }}
                                        />
                                    </AnimatePresence>

                                    {/* Navigation Arrows */}
                                    {event.gallery_images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all backdrop-blur-sm"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all backdrop-blur-sm"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}

                                    {/* Image Counter */}
                                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-mono">
                                        {currentImageIndex + 1} / {event.gallery_images.length}
                                    </div>
                                </div>

                                {/* Thumbnail Navigation */}
                                {event.gallery_images.length > 1 && (
                                    <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                        {event.gallery_images.map((image: string, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => goToImage(index)}
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex
                                                        ? "border-primary scale-105"
                                                        : "border-border hover:border-primary/50"
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://placehold.co/80x80?text=N/A";
                                                    }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Event Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="prose prose-invert max-w-none"
                        >
                            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                                <h2 className="font-orbitron text-2xl font-bold mb-4 text-primary">
                                    About This Event
                                </h2>
                                <div className="font-rajdhani text-lg text-foreground/90 leading-relaxed whitespace-pre-wrap">
                                    {event.detailed_description || event.description || "No description available."}
                                </div>
                            </div>
                        </motion.div>

                        {/* No Gallery Message */}
                        {!hasGallery && event.banner && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-12"
                            >
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/20 border border-border">
                                    <img
                                        src={event.banner}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </main>

            <PageFooter />
        </div>
    );
};

export default EventGallery;
