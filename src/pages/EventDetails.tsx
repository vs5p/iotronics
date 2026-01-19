import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowLeft, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import PageFooter from "@/components/PageFooter";
import { CircuitBackground } from "@/components/LiveElements";
import { getEventById } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getEventById(id)
                .then(setEvent)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    }

    if (!event) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Event not found</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/20">
            <Navigation />
            <CircuitBackground />

            <main className="container mx-auto px-4 py-32 relative z-10">
                <Link to="/events">
                    <Button variant="ghost" className="mb-8 hover:bg-primary/10 -ml-4 gap-2 text-muted-foreground hover:text-white">
                        <ArrowLeft className="w-4 h-4" /> Back to Events
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono border border-primary/20">
                            Event
                        </span>
                        <span className="text-muted-foreground font-mono text-sm">
                            Posted on {new Date(event.created_at).toLocaleDateString()}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {event.title}
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground font-rajdhani">Date</div>
                                <div className="font-semibold font-orbitron">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground font-rajdhani">Time</div>
                                <div className="font-semibold font-orbitron">{event.time || "TBA"}</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground font-rajdhani">Location</div>
                                <div className="font-semibold font-orbitron">{event.location || "TBA"}</div>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none mb-12 font-rajdhani">
                        <p className="whitespace-pre-wrap leading-relaxed text-gray-300">
                            {event.description}
                        </p>
                    </div>

                    {event.registration_link && (
                        <div className="flex justify-center">
                            <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg h-12 px-8 font-orbitron">
                                    Register Now <ExternalLink className="w-5 h-5" />
                                </Button>
                            </a>
                        </div>
                    )}
                </motion.div>
            </main>

            <PageFooter />
        </div>
    );
};

export default EventDetails;
