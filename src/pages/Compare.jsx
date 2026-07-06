import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Plus } from "lucide-react";
import PropertyImage from "../components/PropertyImage";
import PageTransition from "../components/PageTransition";
import { formatPrice } from "../data/mockData";
import { useProperties } from "../hooks/useApiData";

const rows = [
  { key: "price", label: "Price", higherWins: false },
  { key: "beds", label: "Bedrooms", higherWins: true },
  { key: "baths", label: "Bathrooms", higherWins: true },
  { key: "sqft", label: "Square Feet", higherWins: true },
  { key: "year", label: "Year Built", higherWins: true },
];

export default function Compare() {
  const { data: properties, loading } = useProperties();
  const [slots, setSlots] = useState([null, null]);

  // Seed the two comparison slots once the property list has loaded.
  useEffect(() => {
    if (properties && properties.length >= 2 && slots[0] === null) {
      setSlots([properties[Math.min(2, properties.length - 1)].id, properties[Math.min(3, properties.length - 1)].id]);
    }
  }, [properties, slots]);

  const list = properties || [];

  const setSlot = (i, id) => {
    setSlots((prev) => {
      const next = [...prev];
      next[i] = id;
      return next;
    });
  };

  const items = slots.map((id) => list.find((p) => p.id === id)).filter(Boolean);

  const wins = { 0: 0, 1: 0 };
  if (items.length === 2) {
    rows.forEach((r) => {
      const a = items[0][r.key];
      const b = items[1][r.key];
      if (a === b) return;
      const aWins = r.higherWins ? a > b : a < b;
      wins[aWins ? 0 : 1]++;
    });
  }

  const winnerIndex = items.length === 2 ? (wins[0] === wins[1] ? null : wins[0] > wins[1] ? 0 : 1) : null;

  return (
    <PageTransition>
      <div className="pt-32 pb-24 max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="eyebrow text-gold">Side by Side</span>
          <h1 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
            Compare Properties
          </h1>
          <p className="text-slate mt-4 max-w-lg mx-auto">
            Choose two residences to see exactly how they stack up, category by category.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div key={i} className="border border-hairline bg-card h-[300px] animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[0, 1].map((i) => (
                <div key={i} className="border border-hairline bg-card">
                  {items[i] ? (
                    <div className="relative">
                      <div className="h-44 relative overflow-hidden">
                        <PropertyImage
                          image={items[i].image}
                          art={items[i].art}
                          className="w-full h-full"
                          label={items[i].name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        {winnerIndex === i && (
                          <motion.span
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="absolute top-3 right-3 bg-gold text-void rounded-full p-2"
                          >
                            <Trophy size={16} />
                          </motion.span>
                        )}
                      </div>
                      <div className="p-5">
                        <p className="font-display text-lg text-parchment">{items[i].name}</p>
                        <p className="text-xs text-slate mt-1">{items[i].location}</p>
                        <select
                          value={items[i].id}
                          onChange={(e) => setSlot(i, e.target.value)}
                          className="mt-4 w-full bg-surface border border-hairline px-3 py-2 text-sm text-parchment outline-none focus-ring"
                        >
                          {list.map((p) => (
                            <option key={p.id} value={p.id} className="bg-surface">
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSlot(i, list[0]?.id)}
                      className="w-full h-full min-h-[260px] flex flex-col items-center justify-center gap-3 text-slate hover:text-gold transition-colors"
                    >
                      <Plus size={28} />
                      <span className="text-sm">Add a property</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {items.length === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="border border-hairline overflow-hidden"
              >
                {rows.map((r, idx) => {
                  const a = items[0][r.key];
                  const b = items[1][r.key];
                  const aWins = a !== b && (r.higherWins ? a > b : a < b);
                  const bWins = a !== b && (r.higherWins ? b > a : b < a);
                  const display = (v) => (r.key === "price" ? formatPrice(v) : v.toLocaleString());
                  return (
                    <div
                      key={r.key}
                      className={`grid grid-cols-3 items-center px-5 py-4 text-sm ${
                        idx % 2 === 0 ? "bg-card" : "bg-surface"
                      }`}
                    >
                      <span className={`text-right pr-6 ${aWins ? "text-gold font-medium" : "text-parchment"}`}>
                        {display(a)}
                      </span>
                      <span className="text-center text-slate text-xs uppercase tracking-wide">{r.label}</span>
                      <span className={`text-left pl-6 ${bWins ? "text-gold font-medium" : "text-parchment"}`}>
                        {display(b)}
                      </span>
                    </div>
                  );
                })}
                <AnimatePresence>
                  {winnerIndex !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-gold/10 border-t border-gold/30 px-5 py-5 text-center"
                    >
                      <p className="font-display text-lg text-gold flex items-center justify-center gap-2">
                        <Trophy size={18} /> {items[winnerIndex].name} leads in {Math.max(wins[0], wins[1])} of {rows.length} categories
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
}
