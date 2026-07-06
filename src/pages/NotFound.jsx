import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-7xl sm:text-9xl text-gold"
        >
          404
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-2xl text-parchment mt-4"
        >
          This address doesn't exist yet.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 bg-gold text-void px-7 py-3 text-sm uppercase tracking-wide hover:bg-gold-bright transition-colors focus-ring"
          >
            Return Home <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}
