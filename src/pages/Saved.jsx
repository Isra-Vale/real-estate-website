import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeartCrack, ArrowRight } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import CardGridSkeleton from "../components/CardGridSkeleton";
import PageTransition from "../components/PageTransition";
import { useProperties } from "../hooks/useApiData";
import { useSaved } from "../hooks/useSavedContext";

export default function Saved() {
  const { data: properties, loading } = useProperties();
  const { savedIds, toggleSave, isSaved } = useSaved();
  const saved = (properties || []).filter((p) => savedIds.has(p.id));

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-10 min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="eyebrow text-gold">Your Shortlist</span>
          <h1 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
            Saved Properties
          </h1>
          <p className="text-slate mt-3">
            {loading
              ? "Loading your shortlist…"
              : `${saved.length} ${saved.length === 1 ? "property" : "properties"} saved for later.`}
          </p>
        </motion.div>

        {loading ? (
          <CardGridSkeleton count={3} />
        ) : (
          <AnimatePresence mode="wait">
            {saved.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-24 border border-hairline border-dashed"
              >
                <HeartCrack size={36} className="text-slate-dim mb-5" strokeWidth={1.3} />
                <p className="text-parchment font-display text-xl">Nothing saved yet</p>
                <p className="text-slate mt-2 max-w-sm">
                  Tap the heart icon on any property to add it to your shortlist and compare them later.
                </p>
                <Link
                  to="/properties"
                  className="mt-7 inline-flex items-center gap-2 bg-gold text-void px-7 py-3 text-sm uppercase tracking-wide hover:bg-gold-bright transition-colors focus-ring"
                >
                  Browse Properties <ArrowRight size={15} />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {saved.map((p, i) => (
                  <PropertyCard key={p.id} property={p} index={i} onSave={toggleSave} saved={isSaved(p.id)} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </PageTransition>
  );
}
