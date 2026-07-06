import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import PropertyCard from "../components/PropertyCard";
import PropertyImage from "../components/PropertyImage";
import CardGridSkeleton from "../components/CardGridSkeleton";
import PageTransition from "../components/PageTransition";
import { useProperties } from "../hooks/useApiData";
import { useSaved } from "../hooks/useSavedContext";
import aboutDiscretion1 from '../images/about-discretion-1.jpg';
import aboutDiscretion2 from '../images/about-discretion-2.jpg';

export default function Home() {
  const { data: properties, loading } = useProperties();
  const { toggleSave, isSaved } = useSaved();
  const featured = (properties || []).slice(0, 3);

  return (
    <PageTransition>
      <Hero />
      <Stats />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow text-gold">Curated Selection</span>
            <h2 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
              Featured Properties
            </h2>
          </motion.div>
          <Link
            to="/properties"
            className="flex items-center gap-2 text-sm text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors self-start sm:self-auto"
          >
            View all properties <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <CardGridSkeleton count={3} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <PropertyCard
                key={p.id}
                property={p}
                index={i}
                onSave={toggleSave}
                saved={isSaved(p.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* editorial split section */}
      <section className="bg-surface border-y border-hairline">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow text-gold">The Guardian Difference</span>
            <h2 className="font-display text-4xl sm:text-5xl text-parchment mt-3 leading-tight text-balance">
              Discretion is our most requested amenity.
            </h2>
            <p className="text-slate mt-6 leading-relaxed max-w-md">
              Every transaction at Guardian is handled by a dedicated concierge team —
              private showings, off-market access, and negotiation support from
              first inquiry to closing. We represent fewer clients so we can
              represent them completely.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors"
            >
              Learn about Guardian <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="aspect-3/4 border border-hairline overflow-hidden">
              <PropertyImage
                image= {aboutDiscretion1}
                art={{ variant: "dusk", seed: 11 }}
                className="w-full h-full"
              />
            </div>
            <div className="aspect-3/4 border border-hairline overflow-hidden mt-8">
              <PropertyImage
                image= {aboutDiscretion2}
                art={{ variant: "amber", seed: 12 }}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Testimonials />

      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <span className="eyebrow text-gold">Begin Your Search</span>
        <h2 className="font-display text-4xl sm:text-6xl text-parchment mt-4 text-balance">
          Your Address Awaits
        </h2>
        <p className="text-slate mt-5 max-w-lg mx-auto">
          Speak with a private concierge today and discover properties before they reach the open market.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 mt-9 bg-gold text-void px-9 py-4 text-sm uppercase tracking-wide hover:bg-gold-bright transition-colors focus-ring"
        >
          Schedule a Consultation <ArrowRight size={16} />
        </Link>
      </section>
    </PageTransition>
  );
}

