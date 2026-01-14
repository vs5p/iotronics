import { motion } from "framer-motion";
import { Heart, Instagram, Linkedin, Github, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/logo.png";

const PageFooter = () => {
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Achievements", path: "/achievements" },
    { label: "Team", path: "/team" },
    { label: "Events", path: "/events" },
    { label: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <Instagram size={18} />, label: "Instagram", href: "#" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#" },
    { icon: <Github size={18} />, label: "GitHub", href: "#" },
    { icon: <Twitter size={18} />, label: "Twitter", href: "#" },
  ];

  return (
    <footer className="relative py-16 border-t border-border bg-card">
      {/* Circuit trace top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      {/* Animated nodes on top */}
      <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary -top-1"
            animate={{
              x: ["-10%", "110%"],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-background/50 flex items-center justify-center border border-primary/30">
                <img src={logoImage} alt="IoTRONICS" className="w-10 h-10 object-contain" />
              </div>
              <span className="font-orbitron text-xl font-bold tracking-wider">
                <motion.span
                  className="inline-block"
                  animate={{
                    backgroundImage: [
                      "linear-gradient(90deg, #FFD700, #FFA500, #FF6347, #FF1493, #FFD700)",
                      "linear-gradient(90deg, #FFA500, #FF6347, #FF1493, #FFD700, #FFA500)",
                      "linear-gradient(90deg, #FF6347, #FF1493, #FFD700, #FFA500, #FF6347)",
                      "linear-gradient(90deg, #FF1493, #FFD700, #FFA500, #FF6347, #FF1493)",
                      "linear-gradient(90deg, #FFD700, #FFA500, #FF6347, #FF1493, #FFD700)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% auto",
                  }}
                >
                  IoT
                </motion.span>
                <span className="text-foreground">RONICS</span>
              </span>
            </motion.div>
            <p className="font-rajdhani text-muted-foreground mb-6 leading-relaxed">
              The premier IoT club dedicated to exploring the intersection of electronics, 
              programming, and innovation.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="font-rajdhani text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary"
                      whileHover={{ scale: 1.5 }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orbitron text-lg font-semibold mb-6 text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="font-rajdhani">Engineering Block, Room 302<br />University Campus</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="font-rajdhani">iotronics@college.edu</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="font-rajdhani">+1 (234) 567-8900</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron text-lg font-semibold mb-6 text-foreground">Stay Updated</h4>
            <p className="font-rajdhani text-muted-foreground mb-4">
              Subscribe to get updates about events and projects.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-rajdhani text-sm"
              />
              <motion.button
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-rajdhani font-semibold text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 font-rajdhani text-sm text-muted-foreground">
            {["Privacy Policy", "Terms of Service", "Code of Conduct"].map((link) => (
              <motion.a
                key={link}
                href="#"
                className="hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.span>
            <span>by IoTRONICS © 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
