import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import CardGridSkeleton from "../components/CardGridSkeleton";
import PageTransition from "../components/PageTransition";
import { useProperties } from "../hooks/useApiData";
import { useSaved } from "../hooks/useSavedContext";

const filterTags = ["All", "Beachfront", "Penthouse", "Luxury", "Resort", "Estate"];
const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "sqft-desc", label: "Largest First" },
];

export default function Properties() {
  const { data: properties, loading } = useProperties();
  const [activeTag, setActiveTag] = useState("All");
  const [sort, setSort] = useState("default");
  const { toggleSave, isSaved } = useSaved();

  const filtered = useMemo(() => {
    let list = properties || [];
    if (activeTag !== "All") {
      list = list.filter((p) => p.features.includes(activeTag));
    }
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "sqft-desc") list.sort((a, b) => b.sqft - a.sqft);
    return list;
  }, [properties, activeTag, sort]);

  return (
    <PageTransition>
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="eyebrow text-gold">The Full Collection</span>
          <h1 className="font-display text-4xl sm:text-5xl text-parchment mt-3">
            Properties
          </h1>
          <p className="text-slate mt-3 max-w-lg">
            {loading
              ? "Loading the current portfolio…"
              : `${filtered.length} ${filtered.length === 1 ? "residence" : "residences"} currently available across our global portfolio.`}
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10 pb-6 border-b border-hairline">
          <div className="flex gap-2 flex-wrap">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`text-xs uppercase tracking-wide px-4 py-2 border transition-colors focus-ring ${
                  activeTag === tag
                    ? "bg-gold text-void border-gold"
                    : "border-hairline text-slate hover:border-gold hover:text-parchment"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate">
            <SlidersHorizontal size={14} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent border border-hairline px-3 py-2 text-parchment text-sm focus-ring outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-surface">
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <CardGridSkeleton count={6} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-slate">
            No properties match this filter yet. Try a different category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
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
      </div>
    </PageTransition>
  );
}
