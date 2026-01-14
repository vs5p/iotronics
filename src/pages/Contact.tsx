import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Instagram, Linkedin, Github, Twitter } from "lucide-react";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HangingBulb from "@/components/HangingBulb";
import PageFooter from "@/components/PageFooter";
import { FloatingParticles, CircuitBackground } from "@/components/LiveElements";

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen">
      <HangingBulb isOn={!isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
      <Navigation />
      <FloatingParticles />
      <CircuitBackground />

      <main className="relative pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
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
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm text-primary">CONTACT US</span>
              </motion.div>

              <h1 className="font-orbitron text-4xl md:text-6xl font-bold mb-6">
                Let's <span className="gradient-text">Connect</span>
              </h1>

              <p className="font-rajdhani text-lg md:text-xl text-muted-foreground leading-relaxed">
                Have a project idea, question, or want to collaborate? We'd love to hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-orbitron text-2xl font-bold mb-8">Contact Information</h3>

                <div className="space-y-6 mb-12">
                  {[
                    { icon: <MapPin size={24} />, label: "Location", value: "Engineering Block, Room 302\nUniversity Campus" },
                    { icon: <Mail size={24} />, label: "Email", value: "iotronics@college.edu" },
                    { icon: <Phone size={24} />, label: "Phone", value: "+1 (234) 567-8900" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-start gap-4 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-mono text-sm text-muted-foreground mb-1">{item.label}</p>
                        <p className="font-rajdhani text-lg font-medium whitespace-pre-line">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social links */}
                <div className="mb-12">
                  <h4 className="font-orbitron text-lg font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: <Instagram size={20} />, label: "Instagram" },
                      { icon: <Linkedin size={20} />, label: "LinkedIn" },
                      { icon: <Github size={20} />, label: "GitHub" },
                      { icon: <Twitter size={20} />, label: "Twitter" },
                    ].map((social, i) => (
                      <motion.button
                        key={social.label}
                        className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        {social.icon}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <motion.div
                  className="rounded-2xl overflow-hidden border border-border bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-64 bg-muted">
                    {/* Styled map placeholder with circuit theme */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-full h-full opacity-20" viewBox="0 0 400 200">
                        {/* Grid */}
                        {[...Array(20)].map((_, i) => (
                          <line
                            key={`v-${i}`}
                            x1={i * 20}
                            y1="0"
                            x2={i * 20}
                            y2="200"
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.5"
                          />
                        ))}
                        {[...Array(10)].map((_, i) => (
                          <line
                            key={`h-${i}`}
                            x1="0"
                            y1={i * 20}
                            x2="400"
                            y2={i * 20}
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.5"
                          />
                        ))}
                      </svg>
                    </div>
                    
                    {/* Location pin */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="relative">
                        <MapPin className="w-12 h-12 text-primary" fill="hsl(var(--primary))" />
                        <motion.div
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-primary/20"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.1, 0.3],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>

                    {/* Circuit traces */}
                    <svg className="absolute inset-0 w-full h-full">
                      {[0, 1, 2].map((i) => (
                        <motion.circle
                          key={i}
                          r="2"
                          fill="hsl(var(--primary))"
                          animate={{
                            cx: ["20%", "50%", "80%", "50%", "20%"],
                            cy: ["30%", "50%", "70%", "50%", "30%"],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            delay: i * 2,
                          }}
                        />
                      ))}
                    </svg>

                    {/* Label */}
                    <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                      <p className="font-orbitron text-sm font-semibold">IoTRONICS Lab</p>
                      <p className="font-rajdhani text-xs text-muted-foreground">Engineering Block, Room 302</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <form onSubmit={handleSubmit} className="card-circuit">
                  <h3 className="font-orbitron text-2xl font-bold mb-8">Send a Message</h3>

                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-sm text-muted-foreground mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-sm text-muted-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-sm text-muted-foreground mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-sm text-muted-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani resize-none"
                        placeholder="Your message..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full btn-glow flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={18} />
                      Send Message
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
};

export default Contact;
