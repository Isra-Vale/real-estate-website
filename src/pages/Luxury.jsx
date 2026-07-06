import { motion } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import CardGridSkeleton from "../components/CardGridSkeleton";
import PageTransition from "../components/PageTransition";
import { useProperties } from "../hooks/useApiData";
import { useSaved } from "../hooks/useSavedContext";

export default function Luxury() {
  const { data: properties, loading } = useProperties();
  const { toggleSave, isSaved } = useSaved();
  const collection = (properties || []).filter((p) => p.price >= 4000000);

  return (
    <PageTransition>
      <div className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow text-gold">By Invitation</span>
            <h1 className="font-display text-4xl sm:text-6xl text-parchment mt-4 text-balance">
              The Luxury Collection
            </h1>
            <p className="text-slate mt-5 max-w-xl mx-auto leading-relaxed">
              A smaller, slower-moving inventory of the world's most distinguished
              addresses — each one personally vetted by an Aurum partner before it's shown to a client.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {loading ? (
            <CardGridSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collection.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} onSave={toggleSave} saved={isSaved(p.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
