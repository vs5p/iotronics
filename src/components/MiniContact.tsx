import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MiniContact = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary">GET IN TOUCH</span>
          </motion.div>

          <h3 className="font-orbitron text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="gradient-text">Connect</span>?
          </h3>
          
          <p className="font-rajdhani text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Have questions about joining the club, collaborating on projects, or just want to say hi? 
            We'd love to hear from you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <motion.button
                className="btn-glow flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            
            <span className="font-rajdhani text-muted-foreground">or email us at</span>
            
            <motion.a
              href="mailto:iotronics@college.edu"
              className="font-mono text-primary hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              iotronics@college.edu
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MiniContact;
