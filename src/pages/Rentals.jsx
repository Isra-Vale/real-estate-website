import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock } from "lucide-react";
import PropertyImage from "../components/PropertyImage";
import PageTransition from "../components/PageTransition";
import { useRentals } from "../hooks/useApiData";

function RentalSkeleton() {
  return (
    <div className="border border-hairline bg-card overflow-hidden flex flex-col sm:flex-row animate-pulse">
      <div className="h-56 sm:h-auto sm:w-56 shrink-0 bg-surface-2" />
      <div className="p-6 flex-1 space-y-3">
        <div className="h-5 w-2/3 bg-surface-2 rounded-sm" />
        <div className="h-3 w-1/2 bg-surface-2 rounded-sm" />
      </div>
    </div>
  );
}

export default function Rentals() {
  const { data: rentals, loading } = useRentals();

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="eyebrow text-gold">Seasonal & Long-Term</span>
          <h1 className="font-display text-4xl sm:text-5xl text-parchment mt-3">Rentals</h1>
          <p className="text-slate mt-3 max-w-lg">
            Fully staffed estates and city residences available by the week, month, or season.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {loading || !rentals
            ? Array.from({ length: 4 }).map((_, i) => <RentalSkeleton key={i} />)
            : rentals.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="border border-hairline bg-card overflow-hidden flex flex-col sm:flex-row"
                >
                  <div className="relative h-56 sm:h-auto sm:w-56 shrink-0 overflow-hidden">
                    <PropertyImage image={r.image} art={r.art} className="w-full h-full" label={r.name} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl text-parchment">{r.name}</h3>
                    <p className="text-sm text-slate mt-1">{r.location}</p>
                    <p className="flex items-center gap-2 text-xs text-slate-dim mt-3">
                      <CalendarClock size={14} /> Minimum stay: {r.minStay}
                    </p>
                    <div className="flex items-center justify-between 'mt-5' pt-5 border-t border-hairline mt-5">
                      <span className="font-display text-lg text-gold">
                        ${r.rate.toLocaleString()}
                        <span className="text-xs text-slate font-sans">/{r.period}</span>
                      </span>
                      <Link
                        to="/contact"
                        className="flex items-center gap-1.5 text-sm text-parchment hover:text-gold transition-colors"
                      >
                        Inquire <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </PageTransition>
  );
}
