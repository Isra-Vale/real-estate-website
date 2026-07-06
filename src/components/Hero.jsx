import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import PropertyImage from "./PropertyImage";
import { formatPrice } from "../data/mockData";
import { useProperties } from "../hooks/useApiData";

export default function Hero() {
  const { data: properties, loading } = useProperties();
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => (properties || []).slice(0, 4), [properties]);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  const active = slides[index];

  return (
    <section className="relative h-[100vh] min-h-[700px] overflow-hidden bg-void">
      <AnimatePresence mode="popLayout">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <PropertyImage
              image={active.image}
              art={active.art}
              className="w-full h-full"
              label={active.name}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/40 to-void" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-void/30" />
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="h-px w-10 bg-gold/60" />
          <span className="eyebrow text-gold/90">Luxury Living Redefined</span>
          <span className="h-px w-10 bg-gold/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-parchment leading-[0.95] text-balance max-w-5xl"
        >
          Where Dreams<br />Become Addresses
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 text-slate max-w-xl text-base sm:text-lg"
        >
          A private collection of the world's most extraordinary residences, curated for those who refuse the ordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/properties"
            className="bg-gold text-void px-8 py-3.5 text-sm tracking-wide uppercase flex items-center gap-2 hover:bg-gold-bright transition-colors focus-ring"
          >
            View Properties <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="border border-parchment/30 text-parchment px-8 py-3.5 text-sm tracking-wide uppercase hover:border-gold hover:text-gold transition-colors focus-ring"
          >
            Speak to an Agent
          </Link>
        </motion.div>
      </div>

      {/* stat rail */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="hidden md:flex absolute left-8 lg:left-12 bottom-32 flex-col gap-3 z-10"
      >
        {["Properties for Sale", "Rentals Available", "Luxury Apartments"].map((t) => (
          <span key={t} className="flex items-center gap-2 text-sm text-parchment/80">
            <Star size={12} className="text-gold fill-gold" /> {t}
          </span>
        ))}
      </motion.div>

      {/* floating featured card */}
      {!loading && active && (
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-0">
          <div className="max-w-3xl mx-auto -mb-px">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card/95 backdrop-blur border border-hairline border-b-0"
              >
                <div className="flex flex-col sm:flex-row items-stretch">
                  <div className="relative w-full sm:w-56 h-32 sm:h-auto overflow-hidden">
                    <PropertyImage
                      image={active.image}
                      art={active.art ? { ...active.art, seed: active.art.seed + 0.5 } : null}
                      className="w-full h-full"
                      label={active.name}
                    />
                  </div>
                  <div className="flex-1 p-5 flex items-center justify-between gap-4">
                    <div>
                      <span className="eyebrow text-gold">{active.tag}</span>
                      <h3 className="font-display text-lg sm:text-xl text-parchment mt-1">
                        {active.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate">
                        {active.location} &middot; {formatPrice(active.price)} &middot; {active.beds} Beds &middot; {active.baths} Baths
                      </p>
                    </div>
                    <Link
                      to={`/properties/${active.id}`}
                      className="hidden sm:flex shrink-0 bg-gold text-void px-5 py-2.5 text-xs uppercase tracking-wide items-center gap-1.5 hover:bg-gold-bright transition-colors focus-ring"
                    >
                      Explore <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 right-6 z-20 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.name}`}
              className="relative h-1 w-8 bg-parchment/20 overflow-hidden focus-ring"
            >
              {i === index && (
                <motion.span
                  layoutId="hero-progress"
                  className="absolute inset-0 bg-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 5.5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
