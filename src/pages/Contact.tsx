import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Instagram, Linkedin, Github } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

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
                    { icon: <MapPin size={24} />, label: "Location", value: "F Block, EEE Dept, NMIT" },
{ icon: <Phone size={24} />, label: "Contact", value: "Rounak: +91 80058 63350\nRohit: +91 63549 59448" },

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
<motion.div
  className="rounded-2xl overflow-hidden border border-border bg-card mb-12"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <iframe
    title="EEE Dept NMIT"
    src="https://www.google.com/maps?q=F%20Block%20EEE%20Dept%20NMIT&output=embed"
    className="w-full h-96 border-0"
    loading="lazy"
  />
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
                {/* Social links */}
<div className="mb-12">
  <h4 className="font-orbitron text-lg font-semibold mb-4">Follow Us</h4>
  <div className="flex gap-4">
    <motion.a
      href="https://www.instagram.com/iotronics.nmit/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
    >
      <Instagram size={20} />
    </motion.a>

    <motion.a
      href="https://linkedin.com/company/iotronics-nmit"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
    >
      <Linkedin size={20} />
    </motion.a>

    <motion.a
      href="https://github.com/iotronicsnmit"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
    >
      <Github size={20} />
    </motion.a>
  </div>
</div>
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
