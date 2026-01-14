import { motion } from "framer-motion";
import { Cpu, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border bg-card">
      {/* Circuit trace top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <span className="font-orbitron text-lg font-bold tracking-wider">
              IOT<span className="text-primary">RONICS</span>
            </span>
          </motion.div>

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
            <span>by IOTRONICS © 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
